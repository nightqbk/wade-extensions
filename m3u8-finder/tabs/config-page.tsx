import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import VideoManage from '~components/VideoManage'

import '../css/style.css'

const DeltaFlyerPage = () => {
  return (
    <div className="container mx-auto">
      <VideoManage />
      <ToastContainer />
    </div>
  )
}

export default DeltaFlyerPage
