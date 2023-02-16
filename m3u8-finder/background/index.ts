import { match } from 'assert'
import random from 'random'
import { v4 as uuidv4 } from 'uuid'

import type { Video } from '~models/model.types'

import { addVideo } from '../services/TempVideoStorageService'

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

const addMeu8Video = (matched) => {
  const video: Video = {
    id: uuidv4(),
    url: matched.request.url,
    tabId: matched.request.tabId,
    timestamp: Date.parse(new Date().toString())
  }
  addVideo(video).then((c) => {
    // console.log('add successful', video)
  })
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((matched) => {
  if (matched.request.url.indexOf('.m3u8') > -1) {
    // 最早添加video url的地方
    addMeu8Video(matched)
  } else {
  }
})
