import React from 'react'

import type { Video, Video2 } from '~models/model.types'

const VideoItem = ({ video, onCheck, onRemove }: { video: Video2 }) => {
  const handleClick = () => {
    onCheck(video.id)
  }

  const handleRemove = () => {
    onRemove(video.id)
  }
  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={video.isChecked}
            onClick={handleClick}
          />
        </label>
      </th>
      <td>
        <div className="space-x-3 whitespace-normal ">
          <a
            href={video.pageUrl}
            className=" "
            target="_blank"
            rel="noopener noreferrer">
            {video.title}
          </a>
        </div>
      </td>
      <td>
        <div className="whitespace-normal truncate">{video.url}</div>
      </td>
      <td>
        <div className="whitespace-normal truncate badge badge-lg">
          {video.created.toLocaleString('zh-CN')}
        </div>
      </td>
      <td>
        <div className="flex justify-end">
          <button className="btn btn-primary mr-2">复制</button>
          <button className="btn btn-secondary" onClick={handleRemove}>
            删除
          </button>
        </div>
      </td>
    </tr>
  )
}

export default VideoItem
