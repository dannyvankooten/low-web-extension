import TabManager from '../controllers/TabManager.js'
import Logger from '../controllers/Logger.js'
import Blocker from '../controllers/Blocker.js'
import Messager from '../controllers/Messager.js'

import csp from './header/csp.js'

import { blockFiles } from './block/block-files.js'
import { blockSocial } from './block/block-social.js'
import { blockFonts } from './block/block-fonts.js'
import { blockWebsiteSpecific } from './block/block-website-specific.js'

import youtube from './sites/youtube.js'
import redirectKnownAssets from './redirect-known-assets.js'
import hideUselessContent from './hide-useless-content.js'
// import { blockAds } from './block/block-ads';
import { blockImages } from './block/block-images.js'
import { saveDataHeader } from './header/save-data.js'
import { cssOptimization } from './css-optimization.js'
import { clickToLoad } from './block/click-to-load.js'

const assets = {}
const assetsManifest = [
  {
    name: 'avatarTXT',
    url: 'lists/avatar.txt'
  },
  {
    name: 'socialTXT',
    url: 'lists/social.txt'
  },
  {
    name: 'fontsTXT',
    url: 'lists/fonts.txt'
  },
  {
    name: 'website_specificTXT',
    url: 'lists/website-specific.txt'
  }
]

browser.runtime.onStartup.addListener((details) => {
  load(details)
})
browser.runtime.onInstalled.addListener(async (details) => {
  load(details)
})

/**
 * Load assets (txt files for ABPFiltering), then start extension
 * @param  {[type]} details [description]
 * @return {[type]}         [description]
 */
function load (details) {
  Promise.all(
    assetsManifest.map((asset) =>
      fetch(asset.url)
        .then(checkStatus)
        .then(parseTXT)
        .then((data) => setAsset(data, asset))
        .catch((error) => console.log('There was a problem!', error))
    )
  )
    .then((details) => installedPage(details))
    .then((data) => {
      start(data)
    })
}

/**
 * Start extension, init background functions and listeners
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function start (data) {
  // TODO: check why setTimeout is used
  setTimeout(() => {
    Logger.init()
    TabManager.init()
    Blocker.init()
    Messager.init()

    // update CSP if necessary
    csp()

    // add Save-Data: on header
    saveDataHeader()

    // insert css (with various optimisations) into all pages
    cssOptimization()

    // filter and block webRequest
    blockFiles()
    blockImages(assets.avatarTXT.data)
    blockSocial(assets.socialTXT.data)
    blockFonts(assets.fontsTXT.data)
    clickToLoad()

    // filters, blocks or redirects from specific websites (Youtube for now)
    youtube()
    blockWebsiteSpecific(assets.website_specificTXT.data)
    redirectKnownAssets()
    hideUselessContent()
  })
}

/**
 * Displayed welcome page if reason: install and not temporary install (local dev)
 * @param  {string}   options.reason    Runtime event type
 * @param  {boolean}  options.temporary Runtime temporary mode (local)
 * @return
 */
function installedPage ({ reason, temporary }) {
  if (!temporary && reason === 'install') {
    // TODO create welcome page
    // const url = browser.runtime.getURL('views/installed.html');
    // await browser.tabs.create({ url });
  }
}
function checkStatus (response) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
function setAsset (data, asset) {
  asset.data = data
  assets[asset.name] = asset

  return data
}
function parseTXT (response) {
  return response.text()
}
