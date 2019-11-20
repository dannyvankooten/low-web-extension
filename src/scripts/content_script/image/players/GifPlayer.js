// TODO detect animated gif
// animated-gif-detector doesn't seem to work
// import isAnimated from 'animated-gif-detector'
import '../../../utils/animated-gif-detect'

export default class GifPlayer{
  constructor( gif ){

    this.gif = gif
    this.playing = false

    this.gif.classList.add('lowweb--hidden')


    // console.log('complete', this.gif.complete)
    if( ! this.gif.complete ){
      this.gif.onload = ()=>{
        this.build()
      }
    }else{
      this.build()
    }

  }

  build(){

    if( this.isAnimated() && ! this.isSmall() ){

      this.canvas = document.createElement('canvas')
      this.canvas.classList.add('lowweb__gif-player--preview')
      this.context = this.canvas.getContext('2d')

      this.gif.classList.remove('lowweb--hidden')

      if( this.gif.width ){
        this.canvas.width = this.gif.width
        this.canvas.height = this.gif.height
      }


      let container = document.createElement('div')
      container.classList.add('lowweb__gif-player')
      if( this.isSmall() ) container.classList.add('lowweb__gif-player--small')

      // console.log(this.canvas)

      // TODO better computed styles
      this.computedStyles = window.getComputedStyle(this.gif)
      if( this.computedStyles.getPropertyValue('position') != 'static' ){
        container.style.position = this.computedStyles.getPropertyValue('position') 
      }

      container.innerHTML = '<svg class="lowweb__gif-player__play" width="20" height="20" enable-background="new 0 0 20 20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 20 10-20 10" fill="#fff"/></svg>'
      
      this.gif.parentNode.insertBefore(container, this.gif)

      container.appendChild(this.canvas)
      container.appendChild(this.gif)
      // gif.parentNode.insertBefore(this.canvas, gif.nextSibling);

      this.gif.classList.add('lowweb__gif-player--anim')
      this.container = container

      // console.log(container)

      container.addEventListener('mouseenter', ()=>this.play())
      container.addEventListener('mouseleave', ()=>this.stop())

      this.draw()

    }

  }
  // toggle(){
  //   if( this.playing ) this.stop()
  //   else this.play()
  // }
  play(){
    if( !this.playing ){
      this.playing = true
      this.container.classList.add('lowweb__gif-player--playing')
      // this.gif.classList.remove('lowweb__gif-player--hided')
      // this.canvas.classList.add('lowweb__gif-player--hided')
    }
  }
  stop(){
    if( this.playing ){
      this.playing = false
      this.container.classList.remove('lowweb__gif-player--playing')
      // this.gif.classList.add('lowweb__gif-player--hided')
      // this.canvas.classList.remove('lowweb__gif-player--hided')
    }
  }
  draw(){
    this.context.drawImage( this.gif, 0, 0, this.canvas.width, this.canvas.height )
  }

  isAnimated(){
    // TODO detect animated gif

    // need blob
    // window.animatedGifDetect.process(this.gif, ()=>{
    //   console.log('is animated')
    // }, ()=>{
    //   console.log('is not animated')
    // })

    return true
  }
  isSmall(){
    //
    if( this.gif.width < 32 || this.gif.height < 32 ){
      return true
    }else if( this.gif.naturalWidth 
      && (this.gif.naturalWidth < 32 || this.gif.naturalHeight < 32) ){
      return true
    }else{
      return false
    }
  }
}