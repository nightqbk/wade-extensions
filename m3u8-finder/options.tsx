import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import BasicOptions from './components/BasicOptions'

import './css/style.css'

function OptionsIndex() {
  return (
    <>
      <div className="container mx-auto">
        <BasicOptions />
      </div>
      <ToastContainer />
    </>
  )
}

export default OptionsIndex
