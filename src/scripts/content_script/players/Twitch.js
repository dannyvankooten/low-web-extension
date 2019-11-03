import TwitchPlayer from './TwitchPlayer'

(function(){

  var tag = document.createElement('script');
  tag.src = "https://embed.twitch.tv/embed/v1.js";
  tag.onload = function(){
    console.log('ONLOAD TWITCH')
    let iframes = document.querySelectorAll('iframe')
    iframes.forEach((iframe)=>{
      if( iframe.src.indexOf('player.twitch.tv') != -1 ){
        new TwitchPlayer( iframe )
      }
    })
  }
  document.body.appendChild(tag)

}())