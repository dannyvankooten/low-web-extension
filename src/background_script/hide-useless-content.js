// import { watch } from '../store/watch';
import store from '../store';
import cssToInsert from '../datas/css-to-insert';
import TabManager from '../controllers/TabManager';

/**
 * Insert css to hide useless contents and dark-patterns
 * @return
 */
export default function () {
  // TODO format cssToInsert for better parsing
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

function onTabUpdate(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading' && tab.url) {
    if (TabManager.isTabActive(tabId) && store.getters.getOption('website_specific', tabId) > 1) {
      const totalInserted = cssToInsert.length;
      for (let i = 0; i < totalInserted; i++) {
        const toInsert = cssToInsert[i];
        const urls = toInsert.urls;
        for (let j = 0, lgj = urls.length; j < lgj; j++) {
          if (tab.url.indexOf(urls[j]) !== -1) {
            browser.tabs.insertCSS(tabId, {
              code: toInsert.code,
              runAt: toInsert.runAt || 'document_start',
            });
          }
        }
      }
    }
  }
}
