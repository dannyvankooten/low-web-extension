export default [
  {
    filters: {
      urls: ['*://i.ytimg.com/vi/*', '*://img.youtube.com/vi/*'],
      types: ['image']
    },
    files: [
      {
        from: ['maxresdefault', 'hq720', 'sddefault', 'hqdefault'],
        to: 'mqdefault'
      },
      {
        from: ['maxresdefault_live', 'hq720_live', 'sddefault_live', 'hqdefault_live'],
        to: 'mqdefault_live'
      }
    ]
  }
]
