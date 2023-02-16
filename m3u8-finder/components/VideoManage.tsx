import { useEffect, useState } from 'react'
import { CSVDownload, CSVLink } from 'react-csv'

import type { Video, Video2 } from '~models/model.types'
import { getVideos, removeVideo } from '~services/VideoStorageService'

import VideoItem from './VideoItem'

const csvHeaders = [
  { label: 'title', key: 'title' },
  { label: 'url', key: 'url' },
  { label: 'pageUrl', key: 'pageUrl' }
]

const VideoManage = () => {
  const [videos, setVideos] = useState<Array<Video2>>([])
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)

  useEffect(() => {
    getVideos().then((res) => {
      const videos2: Video2[] = res.map((c) => {
        return {
          ...c,
          isChecked: false
        }
      })
      setVideos(videos2)
    })
  }, [])

  const handleCheckAll = () => {
    const newVideos = videos.map((c) => {
      c.isChecked = !isCheckAll
      return c
    })

    setIsCheckAll(!isCheckAll)
    setVideos(newVideos)
  }

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

  const handleRemoveSelected = async () => {
    const toRemoveVideos = videos.filter((c) => c.isChecked)
    toRemoveVideos.forEach(async (video) => {
      await removeVideo(video.id)
    })

    const newVideos = videos.filter((c) => c.isChecked === false)
    setVideos(newVideos)
  }

  return (
    <>
      <div className="flex mt-4 justify-between">
        <div>
          <CSVLink
            filename={'videos.csv'}
            // header={csvHeaders}
            data={videos.map((c) => {
              return {
                title: c.title,
                url: c.url,
                pageUrl: c.pageUrl,
                created: c.timestamp
              }
            })}>
            <button className="btn gap-2">
              导出所有
              <div className="badge badge-secondary">{videos.length}</div>
            </button>
          </CSVLink>
        </div>
        <div className="btn-group float-right pb-2">
          <button
            className="btn btn-outline btn-error"
            onClick={handleRemoveSelected}>
            删除选中
          </button>
          <CSVLink
            className="btn btn-accent"
            filename={'videos.csv'}
            header={csvHeaders}
            data={videos
              .filter((c) => c.isChecked)
              .map((c) => {
                return {
                  title: c.title,
                  url: c.url,
                  pageUrl: c.pageUrl,
                  created: c.timestamp
                }
              })}>
            导出选中
          </CSVLink>
        </div>
      </div>
      <div className="mt-4">
        <div className="overflow-x-auto w-full">
          <table className="table table-fixed w-full">
            <thead>
              <tr>
                <th className="w-1/12">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={isCheckAll}
                      onClick={handleCheckAll}
                    />
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
    </>
  )
}

export default VideoManage
