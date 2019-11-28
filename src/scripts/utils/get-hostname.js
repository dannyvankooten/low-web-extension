// import psl from 'psl'
export default function extractHostname(url) {
  // console.log(url)
  if (url) {
    // console.log('yo')
    var hostname;
    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    // return psl.get(hostname);
    // psl.get(hostname);
    return hostname;
  } else {
    return false;
  }
}
