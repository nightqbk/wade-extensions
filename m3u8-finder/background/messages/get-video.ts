import type { PlasmoMessaging } from '@plasmohq/messaging'

import { getVideoByTabId, updateVideo } from '~services/StorageService'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const tabId = req.sender.tab.id
  const tabTitle = req.sender.tab.title
  const pageUrl = req.sender.tab.url
  const video = await getVideoByTabId(tabId)
  if (video) {
    await updateVideo(video.url, tabId, tabTitle, pageUrl)
  }

  res.send(video)
}

export default handler
