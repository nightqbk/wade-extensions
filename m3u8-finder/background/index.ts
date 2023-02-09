import { getVideos, updateVideo } from '../services/StorageService'

chrome.declarativeNetRequest.updateDynamicRules(
  {
    addRules: [
      {
        id: 10,
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

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((detail) => {
  updateVideo(detail.request.url, detail.request.url).then(() => {
    console.log('save url', detail.request.url)
  })
})
