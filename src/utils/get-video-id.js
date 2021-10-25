import queryString from 'query-string'

function matchRegexID (str, regex) {
  const result = str.match(regex)
  if (result && result.length > 1) {
    return result[1]
  } else {
    return null
  }
}
export function getYoutubeId (url) {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i
  return matchRegexID(url, regex)
}
export function getVimeoId (url) {
  const regex = /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i
  return matchRegexID(url, regex)
}
export function getDailymotionId (url) {
  const regex = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/i
  return matchRegexID(url, regex)
}
// export function getTwitchId (url) {
//   const u = new URL(url)
//   const params = queryString.parse(u.search)

//   if (params.video) {
//     return params.video.substr(1)
//   } else {
//     return null
//   }
// }
// export function getFacebookId (url) {
//   const u = new URL(decodeURIComponent(url))
//   const params = queryString.parse(u.search)
//   const regex = params.href.match(/(videos|story_fbid)(\/|=)(\d+)(\/|&)?/)
//   const id = regex[3]
//   if (id) {
//     return id
//   } else {
//     return null
//   }
// }
