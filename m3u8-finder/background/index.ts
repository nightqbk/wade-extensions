import random from 'random'

import { addVideo, getVideos } from '../services/TempVideoStorageService'

chrome.declarativeNetRequest.updateDynamicRules(
  {
    addRules: [
      {
        id: random.int(11, 99999999),
        action: {
          type: 'modifyHeaders',
          requestHeaders: [
            {
              header: 'X-DeclarativeNetRequest-Sample',
              operation: 'set',
              value: 'request'
            }
          ]
        },
        condition: {
          // urlFilter: 'm3u8',
          requestMethods: ['get']
        }
      }
    ]
  },
  (param) => {
    console.log('updateDynamicRules callback', param)
  }
)

chrome.declarativeNetRequest.getDynamicRules((e) => {
  // console.log('getDynamicRules', e)
})

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((matched) => {
  if (matched.request.url.indexOf('.m3u8') > -1) {
    addVideo(matched.request.url, matched.request.tabId).then(() => {
      // console.log('save url', matched.request.url, matched.request, matched)
      // getVideos().then((c) => {
      //   console.log(c)
      // })
    })
  }
})
