import { localOption } from '../../utils/get-local-options';
import srcsetUtil from 'srcset';

/**
 * Only works for lazy-loaded images, if lazyload is not already pass.
 * Browsers queues images, before we can access them (DOMContentLoaded), we can't stop images loading.
 * Lazyloaded images aren't loading yet.
 * Srcset chages may cause a new image loading.
 */
let imageSrcset;
export default function () {
  localOption('image_srcset').then((value) => {
    imageSrcset = value;
    if (value > 0) {
      // TODO clean picture sources
      filterImages('srcset');
      filterImages('lazy-srcset');
    }
  });
}

function filterImages(name) {
  const imgs = document.querySelectorAll('img[data-' + name + ']');
  let cleanedSrcset;
  imgs.forEach((img, index) => {
    let srcset;
    let width = 9999;
    if (img.dataset[name]) {
      if (img.dataset.width) {
        width = img.dataset.width;
      } else if (img.width) {
        width = img.width;
      }

      srcset = img.dataset[name];
      cleanedSrcset = cleanSrcset(srcset, width);
      if (cleanedSrcset) img.dataset[name] = cleanedSrcset;
    }
    // check srcset
    // if (img.srcset !== null) {
    //   srcset = img.srcset
    //   cleanedSrcset = cleanSrcset(srcset, width)
    //   if (cleanedSrcset) img.srcset = cleanedSrcset
    // }
  });
}
function noRetina(srcset) {
  for (let i = srcset.length - 1; i >= 0; i -= 1) {
    if (srcset[i].density && srcset[i].density > 1) {
      srcset.splice(i, 1);
    }
  }
  return srcset;
}
function smart(srcset, width) {
  srcset = noRetina(srcset);
  srcset = sortSrcset(srcset);
  let newSrcset;
  // TEMP
  if (srcset.length > 1) {
    const lg = Math.round(srcset.length / 2);
    newSrcset = srcset.slice(0, lg);
  } else {
    newSrcset = srcset;
  }
  // TODO parse sizes or getBoundingClientRect to determine  size of the image
  return newSrcset;
}
function compare(a, b) {
  if (a.width < b.width) {
    return -1;
  }
  if (a.width > b.width) {
    return 1;
  }
  return 0;
}
function sortSrcset(srcset) {
  return srcset.sort(compare);
}
function smallest(srcset, width) {
  let mini;
  let miniWidth = width;
  srcset = noRetina(srcset);
  srcset.forEach((o) => {
    if (mini) {
      const w = o.width;
      if (w && w < miniWidth) {
        mini = o;
      }
    } else {
      mini = o;
      if (o.width) {
        miniWidth = o.width;
      }
    }
  });
  if (mini && mini.url && mini.url !== '') {
    return [mini];
  } else {
    return false;
  }
}
// remove all images except the smallest
function cleanSrcset(srcset, width) {
  const parsed = srcsetUtil.parse(srcset);
  let cleanedSrcset;
  switch (imageSrcset) {
    case 1:
      cleanedSrcset = noRetina(parsed);
      break;
    case 2:
      cleanedSrcset = smallest(parsed, width);
      break;
    case 3:
      cleanedSrcset = smart(parsed, width);
      break;
  }
  if (cleanedSrcset) {
    return srcsetUtil.stringify(cleanedSrcset);
  } else {
    return false;
  }
}
