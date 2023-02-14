// import cssText from 'data-text:~/contents/plasmo-overlay.css'
import cssText from 'data-text:~/css/style.css'
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from 'plasmo'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { sendToBackground } from '@plasmohq/messaging'

import { useInterval } from '~hooks/useInterval'
import type { Video } from '~models/model.types'

export const config: PlasmoCSConfig = {
  matches: ['https://*/*', 'http://*/*'],
  css: ['font.css']
}

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

const $x = (xpath) => {
  const xResult = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  )
  const xNodes = []
  let xres
  while ((xres = xResult.iterateNext())) {
    xNodes.push(xres)
  }

  return xNodes
}

const PlasmoOverlay = () => {
  const [currentVideo, setCurrentVideo] = useState<Video>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [copiedText, setCopiedText] = useState('')

  useInterval(
    () => {
      syncUrl()
    },
    videoUrl === '' ? 1000 : null
  )

  useEffect(() => {
    const title = getTitle()
    setVideoTitle(title)
  }, [])

  useEffect(() => {
    const text = `title: ${videoTitle} \r\n videoUrl:${videoUrl}`
    setCopiedText(text)
  }, [videoTitle, videoUrl])

  const getTitle = (): string => {
    const nodes = $x(
      '//*[@id="site-content"]/div/div/div[1]/section[2]/div[1]/div[1]/h4'
    )
    const title = nodes[0].innerText
    return title
  }

  const syncUrl = async () => {
    const resp = await sendToBackground<any, Video>({
      name: 'sync-video-info',
      body: {
        title: getTitle()
      }
    })

    if (resp && resp.url) {
      setVideoUrl(resp.url)
      setVideoTitle(resp.title)
      setCurrentVideo(resp)
    }
  }

  const addVideo = async () => {
    if (currentVideo === null) {
      alert('Video is not setted, can not add to exported List')
    }

    const resp = await sendToBackground<Video, Video>({
      name: 'add-video',
      body: currentVideo
    })
  }

  return (
    <div className="bg-lime-600 fixed top-50 right-0 opacity-80 w-1/4">
      <div className="flex flex-col">
        <div className="basis-5/12">{videoUrl}</div>
        <div className="basis-5/12">{videoTitle}</div>
        <div className="basis-2/12">
          <button className="btn" onClick={syncUrl}>
            Get Url
          </button>
          {/* <button
            className="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
            onClick={syncUrl}>
            Get Url
          </button> */}

          <button className="btn btn-primary" onClick={addVideo}>
            Add to export list
          </button>

          {/* <button
            className="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
            onClick={addVideo}>
            Add to export list
          </button> */}

          <CopyToClipboard text={copiedText}>
            <button className="btn btn-accent" onClick={addVideo}>
              Copy to clipboard
            </button>
            {/* <button
              className="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
              onClick={addVideo}>
              Copy to clipboard
            </button> */}
          </CopyToClipboard>
        </div>
      </div>
    </div>
  )
}

export default PlasmoOverlay
