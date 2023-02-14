import { ChangeEventHandler, useState } from 'react'

import 'tw-elements'

import VideoManage from '~components/VideoManage'

import CustomerConfig from '../components/CustomConfig'

import '../css/style.css'

enum Tabs {
  Config,
  Videos
}

const ConfigPage = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Config)
  const handleSwitchTab = (e) => {
    const tab = e.target.dataset.tab as Tabs
    console.log('tab', tab)
    setCurrentTab(tab)
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-start">
        <ul
          className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4"
          id="tabs-tabVertical"
          role="tablist">
          <li className="nav-item flex-grow text-center" role="presentation">
            <a
              href="#tabs-homeVertical"
              className="
              nav-link
              block
              font-medium
              text-xs
              leading-tight
              uppercase
              border-x-0 border-t-0 border-b-2 border-transparent
              px-6
              py-3
              my-2
              hover:border-transparent hover:bg-gray-100
              focus:border-transparent
              active
            "
              id="tabs-home-tabVertical"
              data-bs-toggle="pill"
              data-bs-target="#tabs-homeVertical"
              role="tab"
              aria-controls="tabs-homeVertical"
              aria-selected="true">
              配置
            </a>
          </li>
          <li className="nav-item flex-grow text-center" role="presentation">
            <a
              href="#tabs-profileVertical"
              className="
              nav-link
              block
              font-medium
              text-xs
              leading-tight
              uppercase
              border-x-0 border-t-0 border-b-2 border-transparent
              px-6
              py-3
              my-2
              hover:border-transparent hover:bg-gray-100
              focus:border-transparent
            "
              id="tabs-profile-tabVertical"
              data-bs-toggle="pill"
              data-bs-target="#tabs-profileVertical"
              role="tab"
              aria-controls="tabs-profileVertical"
              aria-selected="false">
              视频
            </a>
          </li>
        </ul>
        <div className="tab-content" id="tabs-tabContentVertical">
          <div
            className="tab-pane fade show active"
            id="tabs-homeVertical"
            role="tabpanel"
            aria-labelledby="tabs-home-tabVertical">
            <CustomerConfig />
          </div>
          <div
            className="tab-pane fade"
            id="tabs-profileVertical"
            role="tabpanel"
            aria-labelledby="tabs-profile-tabVertical">
            <VideoManage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigPage
