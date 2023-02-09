import cssText from 'data-text:~/contents/plasmo-overlay.css'
import type { PlasmoCSConfig } from 'plasmo'
import { useEffect, useState } from 'react'

import { sendToBackground } from '@plasmohq/messaging'

import type { Video } from '~services/StorageService'
import { getLastVideo, getVideos } from '~services/StorageService'

import '~css/base.css'
import '~css/style.css'

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
  const [currentTab, setCurrentTab] = useState('999')

  useEffect(() => {
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   const { id } = tabs[0]
    //   setCurrentTab(id)
    //   console.log(tabs)
    // })
    setCurrentTab('222')
  }, [])

  return (
    <div className="fixed z-100">
      <span
        className="hw-top"
        style={{
          padding: 12
        }}>
        HELLO WORLD TOP 2 PlasmoOverlay: tabId: {currentTab}
      </span>
      <button
        onClick={async () => {
          const resp = await sendToBackground<string, Video>({
            name: 'get-video'
          })
          setCurrentTab(resp.url)
        }}>
        iframe mounting 12
      </button>
    </div>
  )
}

export default PlasmoOverlay
