import { v4 as uuidv4 } from 'uuid'

import { Storage } from '@plasmohq/storage'

const keys = {
  videos: 'videos'
}

const storage = new Storage()

type VideoType = {
  title: string
  url: string
  id: string
  timestamp: number
}

export const getVideos = async () => {
  const videos = await storage.get(keys.videos)
  return videos
}

export const getLastVideo = async () => {
  const videos = await storage.get<VideoType[]>(keys.videos)
  if (videos) {
    return videos.sort((c) => c.timestamp)[0]
  }

  return null
}

export const updateVideo = async (url: string, title: string = null) => {
  let videos = await storage.get<VideoType[]>(keys.videos)
  if (videos === undefined) {
    videos = []
  }

  const existed = videos && videos.find((c) => c.url === url)
  if (existed) {
    existed.timestamp = Date.parse(new Date().toString())
    existed.title = title
  } else {
    const newVideo: VideoType = {
      url: url,
      title: title,
      timestamp: Date.parse(new Date().toString()),
      id: uuidv4()
    }

    videos.push(newVideo)
  }
  await storage.set(keys.videos, videos)
}
