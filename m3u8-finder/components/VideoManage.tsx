import { useEffect, useState } from 'react'

import type { Video, Video2 } from '~models/model.types'
import { getVideos, removeVideo } from '~services/VideoStorageService'

import VideoItem from './VideoItem'

const VideoManage = () => {
  const [videos, setVideos] = useState<Array<Video2>>([])

  useEffect(() => {
    getVideos().then((res) => {
      const videos2: Video2[] = res.map((c) => {
        return {
          ...c,
          isChecked: true
        }
      })
      setVideos(videos2)
    })
  }, [])

  const handleCheck = (id: string) => {
    const newVideos = videos.map((c) => {
      if (c.id === id) {
        c.isChecked = !c.isChecked
      }
      return c
    })

    setVideos(newVideos)
  }

  const handleRemove = (id: string) => {
    removeVideo(id).then(() => {
      const newVideos = videos.filter((c) => c.id !== id)
      setVideos(newVideos)
    })
  }

  return (
    <div className="mt-8">
      <div className="overflow-x-auto w-full">
        <table className="table table-fixed w-full">
          <thead>
            <tr>
              <th className="w-1/12">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="w-4/12">标题</th>
              <th className="w-5/12">M3u8 Url</th>
              <th className="w-2/12">操作</th>
            </tr>
          </thead>
          <tbody>
            {videos &&
              videos.map((c) => (
                <VideoItem
                  key={c.id}
                  video={c}
                  onCheck={handleCheck}
                  onRemove={handleRemove}
                />
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>标题</th>
              <th>M3u8 Url</th>
              <th>操作</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default VideoManage
