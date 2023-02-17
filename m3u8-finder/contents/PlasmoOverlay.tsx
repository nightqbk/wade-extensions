// import cssText from 'data-text:~/contents/plasmo-overlay.css'
import cssText from 'data-text:~/css/style.css'
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from 'plasmo'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { sendToBackground } from '@plasmohq/messaging'

import { useInterval } from '~hooks/useInterval'
import type { Video } from '~models/model.types'
import { getMatchedXpath } from '~services/ConfigService'
import { queryByXPath } from '~utils/xpath.util'

export const config: PlasmoCSConfig = {
  matches: ['https://*/*', 'http://*/*'],
  css: ['font.css']
}

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [currentVideo, setCurrentVideo] = useState<Video>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [copiedText, setCopiedText] = useState('')
  const [isOpenMore, setIsOpenMore] = useState(false)
  const [tryTimes, setTryTimes] = useState(0)

  useInterval(
    () => {
      syncUrl()
    },
    videoUrl === '' && tryTimes < 5 ? 1000 : null
  )

  useEffect(() => {
    getTitle().then((c) => {
      setVideoTitle(c)
    })
  }, [])

  useEffect(() => {
    const text = `title: ${videoTitle} \r\n videoUrl:${videoUrl}`
    setCopiedText(text)
  }, [videoTitle, videoUrl])

  const getTitle = async () => {
    const xpathStr = await getMatchedXpath(document.location.href)

    let nodes
    if (xpathStr) {
      nodes = queryByXPath(xpathStr)
    }

    let title = ''
    if (nodes && nodes.length > 0) {
      title = nodes[0].innerText
    }
    return title
  }

  const cleanVideos = async () => {
    const resp = await sendToBackground<any, Video>({
      name: 'clean-videos',
      body: '123'
    })
    if (resp) {
      alert('clean success')
    }
  }

  const syncUrl = async () => {
    const resp = await sendToBackground<any, Video>({
      name: 'sync-video-info',
      body: {
        title: videoTitle
      }
    })

    if (resp && resp.url) {
      setVideoUrl(resp.url)
      setVideoTitle(resp.title)
      setCurrentVideo(resp)
    }

    setTryTimes(tryTimes + 1)
  }

  const addVideo = async () => {
    if (currentVideo === null) {
      alert('Video is not set, can not add to exported List')
    }

    const resp = await sendToBackground<Video, Video>({
      name: 'add-video',
      body: currentVideo
    })
  }

  const handleShowPanel = () => {
    setIsOpenMore(!isOpenMore)
  }

  return (
    <div className="fixed top-50 right-2">
      <div className="buttonContainer flex mt-2 mb-3 justify-end">
        {videoUrl != '' && (
          <button
            className="bg-purple-600 text-white btn mr-1 hover:bg-purple-800"
            onClick={addVideo}>
            添加
          </button>
        )}
        <button
          onClick={handleShowPanel}
          className="bg-purple-600 text-white btn hover:bg-purple-800">
          {isOpenMore ? '关闭' : 'More'}
        </button>
      </div>
      {isOpenMore && (
        <div className="bg-sky-600 rounded border-2 border-slate-100 border-dotted text-base text-white p-2 tracking-normal whitespace-normal">
          <p className="truncate">{videoUrl}</p>
          <p className="truncate">{videoTitle}</p>
          <div className="flex flex-row justify-end mt-2">
            <CopyToClipboard text={copiedText}>
              <button className="btn mr-2 bg-purple-600 hover:bg-purple-800">
                Copy
              </button>
            </CopyToClipboard>

            <CopyToClipboard text={videoUrl}>
              <button className="btn mr-2 bg-purple-600 hover:bg-purple-800">
                Copy Url
              </button>
            </CopyToClipboard>

            <button
              className="btn bg-rose-600 hover:bg-rose-800"
              onClick={cleanVideos}>
              Clean Temp Videos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlasmoOverlay
