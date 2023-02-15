import { Storage } from '@plasmohq/storage'

import type { Video } from '~models/model.types'

const keys = {
  videos: 'temp-videos'
}

const storage = new Storage({
  area: 'local'
})

export const cleanVideos = async () => {
  await storage.set(keys.videos, [])
}

export const getVideos = async () => {
  const videos = await storage.get<Array<Video>>(keys.videos)
  return videos || []
}

export const getVideoById = async (id: string) => {
  const videos = await getVideos()
  return videos.find((c) => c.id === id)
}

export const getLastVideo = async () => {
  const videos = await storage.get<Video[]>(keys.videos)
  if (videos) {
    return videos.sort((c) => c.timestamp)[0]
  }

  return null
}

export const getLastVideoByTabId = async (tabId: number) => {
  const videos = await storage.get<Video[]>(keys.videos)
  if (videos) {
    const tabVideos = videos
      .filter((c) => {
        return c.tabId === tabId
      })
      .sort((c) => c.timestamp)

    return tabVideos[0]
  }

  return null
}

export const addVideo = async (video: Video) => {
  let videos = await storage.get<Video[]>(keys.videos)
  if (videos === undefined) {
    videos = []
  }

  const videoIndex = videos.findIndex(
    (c) => c.url === video.url || c.title === video.title || c.id === video.id
  )

  if (videoIndex === -1) {
    videos.push(video)

    await storage.set(keys.videos, videos)
  }
}

export const updateVideo = async (
  id: string,
  title: string,
  pageUrl: string
) => {
  const videos = await getVideos()
  const video = await getVideoById(id)
  if (video === undefined || video === null) {
    throw new Error('Can not find video!!!')
  }

  const updatedVideos = videos.map((c) => {
    if (c.id === id) {
      c.title = title
      c.pageUrl = pageUrl
    }

    return c
  })

  console.log('videos', updatedVideos)
  await storage.set(keys.videos, updatedVideos)
}
