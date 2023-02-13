import { v4 as uuidv4 } from 'uuid'

import { Storage } from '@plasmohq/storage'

import type { Video } from '~models/model.types'

const keys = {
  videos: 'export-videos'
}

const storage = new Storage({
  area: 'local'
})

export const getVideos = async () => {
  const videos = await storage.get(keys.videos)
  return videos
}

export const addVideo = async (req: Video) => {
  let videos = await storage.get<Video[]>(keys.videos)
  if (videos === undefined) {
    videos = []
  }

  const existed = videos && videos.find((c) => c.url === req.url)
  if (!existed) {
    videos.push(req)
  }

  videos.push(req)
  await storage.set(keys.videos, videos)
}
