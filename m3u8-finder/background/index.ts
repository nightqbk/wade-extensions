import { getVideos, updateVideo } from '../services/StorageService'

chrome.declarativeNetRequest.updateDynamicRules(
  {
    addRules: [
      {
        id: 11,
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
    updateVideo(matched.request.url, matched.request.tabId).then(() => {
      // console.log('save url', matched.request.url, matched.request)
      // getVideos().then((c) => {
      //   console.log(c)
      // })
    })
  }

  // console.log(
  //   'requestDetail',
  //   matched.request.url,
  //   matched.request.url.indexOf('.m3u8')
  // )
})
