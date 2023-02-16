import { Storage } from '@plasmohq/storage'

import type { Video } from '~models/model.types'

const keys = {
  videos: 'export-videos'
}

const storage = new Storage({
  area: 'local'
})

export const getVideos = async () => {
  const videos = await storage.get<Video[]>(keys.videos)
  return videos.sort((a, b) => {
    return b.timestamp - a.timestamp
  })
}

export const cleanVideos = async () => {
  await storage.set(keys.videos, [])
}

export const addVideo = async (req: Video) => {
  let videos = await storage.get<Video[]>(keys.videos)
  if (videos === undefined) {
    videos = []
  }

  const existed = videos && videos.find((c) => c.id === req.id)
  if (!existed) {
    videos.push(req)
  }

  await storage.set(keys.videos, videos)
}

export const removeVideo = async (id: string) => {
  let videos = await storage.get<Video[]>(keys.videos)
  if (videos === undefined) {
    videos = []
  }

  const existed = videos && videos.filter((c) => c.id !== id)
  await storage.set(keys.videos, existed)
}
