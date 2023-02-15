import type { PlasmoMessaging } from '@plasmohq/messaging'

import {
  getLastVideoByTabId,
  updateVideo
} from '~services/TempVideoStorageService'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const tabId = req.sender.tab.id
  const tabTitle = req.body.title || req.sender.tab.title
  const pageUrl = req.sender.tab.url
  let video = await getLastVideoByTabId(tabId)
  if (video && video.pageUrl === undefined) {
    video.title = tabTitle
    video.pageUrl = pageUrl
    await updateVideo(video.id, tabTitle, pageUrl)
  } else {
    // video 不存在 或者已经在storage 里面了
    console.log('background worker can not find video match the tabId')
  }

  res.send(video)
}

export default handler
