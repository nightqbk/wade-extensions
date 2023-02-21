import { useState } from 'react'

import CustomConfig from './components/CustomConfig'

import './css/style.css'

function OptionsIndex() {
  const [data, setData] = useState('')

  return (
    <div className="container mx-auto">
      <CustomConfig />
    </div>
  )
}

export default OptionsIndex
