import random from 'random'
import { v4 as uuidv4 } from 'uuid'

import type { Video } from '~models/model.types'
import { getM3u8Rules } from '~services/ConfigService'

import { addVideo } from '../services/TempVideoStorageService'

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'menu.videos',
    title: 'Videos',
    contexts: [
      'browser_action',
      'page',
      'frame',
      'image',
      'link',
      'video',
      'audio',
      'selection'
    ]
  })
})

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

const addMeu8Video = async (matched) => {
  const video: Video = {
    id: uuidv4(),
    url: matched.request.url,
    tabId: matched.request.tabId,
    timestamp: Date.parse(new Date().toString())
  }
  await addVideo(video)
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async (matched) => {
  if (matched.request.url.indexOf('.m3u8') > -1) {
    // 最早添加video url的地方
    await addMeu8Video(matched)
  } else {
    const ruleStr = await getM3u8Rules()
    if (ruleStr) {
      const rules = ruleStr.split(';')
      for (const m3u8Rule of rules) {
        if (matched.request.url.indexOf(m3u8Rule) > -1) {
          await addMeu8Video(matched)
          return
        }
      }
    }
  }
})
