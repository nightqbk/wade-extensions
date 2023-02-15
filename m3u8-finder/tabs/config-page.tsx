import { ChangeEventHandler, useState } from 'react'

import VideoManage from '~components/VideoManage'

import CustomerConfig from '../components/CustomConfig'

import '../css/style.css'

enum Tabs {
  Config,
  Videos
}

const DeltaFlyerPage = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Videos)
  const handleSwitchTab = (e) => {
    const tab = e.target.dataset.tab as Tabs
    setCurrentTab(tab)
  }

  return (
    <div className="container mx-auto">
      <div className="tabs tabs-boxed justify-center">
        <a
          data-tab={Tabs.Config}
          className={`tab ${Tabs.Config == currentTab ? 'tab-active' : ''}`}
          onClick={handleSwitchTab}>
          Config
        </a>
        <a
          data-tab={Tabs.Videos}
          className={`tab ${Tabs.Videos == currentTab ? 'tab-active' : ''}`}
          onClick={handleSwitchTab}>
          Videos
        </a>
      </div>
      {Tabs.Config == currentTab && <CustomerConfig />}
      {Tabs.Videos == currentTab && <VideoManage />}
    </div>
  )
}

export default DeltaFlyerPage
