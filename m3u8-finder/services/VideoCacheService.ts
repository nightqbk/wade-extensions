import { Storage } from '@plasmohq/storage'

import type { Video } from '~models/model.types'

const storage = new Storage({
  area: 'session'
})

const generateVideoKey = (tabId: number) => {
  return `temp-videos-${tabId}`
}

export const getVideoByTabId = async (tabId: number) => {
  const key = generateVideoKey(tabId)
  const existed = await storage.get<Video>(key)
  return existed
}

export const addVideo = async (video: Video) => {
  const key = generateVideoKey(video.tabId)
  let existed = await storage.get<Video>(key)
  if (existed == undefined) {
    await storage.set(key, video)
  }
}
