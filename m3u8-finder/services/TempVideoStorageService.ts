import { v4 as uuidv4 } from 'uuid'

import { Storage } from '@plasmohq/storage'

import type { Video } from '~models/model.types'

const keys = {
  videos: 'temp-videos'
}

const storage = new Storage({
  area: 'local'
})

export const getVideos = async () => {
  const videos = await storage.get(keys.videos)
  return videos
}

export const getLastVideo = async () => {
  const videos = await storage.get<Video[]>(keys.videos)
  if (videos) {
    return videos.sort((c) => c.timestamp)[0]
  }

  return null
}

export const getVideoByTabId = async (tabId: number) => {
  const videos = await storage.get<Video[]>(keys.videos)
  if (videos) {
    return videos.find((c) => c.tabId === tabId)
  }

  return null
}

export const addVideo = async (url: string, tabId: number) => {
  let videos = await storage.get<Video[]>(keys.videos)
  if (videos === undefined) {
    videos = []
  }

  const newVideo: Video = {
    url: url,
    tabId: tabId,
    timestamp: Date.parse(new Date().toString()),
    id: uuidv4()
  }

  videos.push(newVideo)

  await storage.set(keys.videos, videos)
}

export const updateVideo = async (
  url: string,
  tabId: number,
  title: string = null,
  pageUrl: string = null
) => {
  let videos = await storage.get<Video[]>(keys.videos)
  if (videos === undefined) {
    videos = []
  }

  const existed = videos && videos.find((c) => c.url === url)
  if (existed) {
    existed.title = title
    existed.pageUrl = pageUrl
    existed.timestamp = Date.parse(new Date().toString())
  } else {
    const newVideo: Video = {
      url: url,
      title: title,
      tabId: tabId,
      timestamp: Date.parse(new Date().toString()),
      pageUrl: pageUrl,
      id: uuidv4()
    }

    videos.push(newVideo)
  }
  await storage.set(keys.videos, videos)
}
