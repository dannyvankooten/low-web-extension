import isWebpage from '../../utils/is-webpage';
import store from '../../store';
import RequestManager from '../../controllers/RequestManager';
import Blocker from '../../controllers/Blocker';

/**
 * blocks social media embeds
 * @param  {string} socialTxt List of social media third party
 * @return
 */
export function blockSocial(socialTxt) {
  if (socialTxt) Blocker.addListToBlock(socialTxt, 'block_social');
  addListener();
}

function addListener() {
  if (!browser.tabs.onUpdated.hasListener(onTabUpdate)) {
    browser.tabs.onUpdated.addListener(onTabUpdate);
  }
}
// function removeListener() {
//   if (browser.tabs.onUpdated.hasListener(onTabUpdate)) {
//     browser.tabs.onUpdated.removeListener(onTabUpdate);
//   }
// }

// TODO insert styles only when needed
function onTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading') {
    if (tab.url && isWebpage(tab.url) && RequestManager.isTabActive(tabId)) {
      if (store.getters.getOption('block_social', tabId) === 1) {
        browser.tabs
          .insertCSS(tabId, {
            file: 'styles/social.css',
            runAt: 'document_start',
          })
          .catch((error) => {
            console.log('error inserting social css', error);
          });
      }
    }
  }
}
