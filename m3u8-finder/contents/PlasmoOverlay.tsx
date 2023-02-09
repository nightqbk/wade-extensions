import cssText from 'data-text:~/contents/plasmo-overlay.css'
import type { PlasmoCSConfig } from 'plasmo'
import { useEffect, useState } from 'react'

import { getLastVideo, getVideos } from '~services/StorageService'

export const config: PlasmoCSConfig = {
  matches: ['https://www.plasmo.com/*', 'https://*/*', 'http://*/*'],
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
    console.log('chrome.tabs', chrome.tabs)
  }, [])

  return (
    <div>
      <span
        className="hw-top"
        style={{
          padding: 12
        }}>
        HELLO WORLD TOP 2 PlasmoOverlay: tabId: {currentTab}
      </span>
      <button
        onClick={() => {
          getLastVideo().then((e) => {
            console.log(e)
          })
        }}>
        iframe mounting
      </button>
    </div>
  )
}

export default PlasmoOverlay
