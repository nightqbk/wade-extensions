import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { Rule } from '~models/model.types'
import { addRule, updateRule } from '~services/ConfigService'

const ConfigItem = (props) => {
  const [domain, setDomain] = useState(props.domain)
  const [xpath, setXPath] = useState(props.xpath)

  const handleDomainChange = (e) => {
    setDomain(e.target.value)
  }

  const handleXPathChange = (e) => {
    setXPath(e.target.value)
  }

  const handleDelete = () => {
    props.onDeleteRule(props.id)
  }

  const handleSave = async () => {
    const newRule: Rule = {
      id: props.id,
      domain,
      xpath
    }

    if (props.isNew) {
      const res = await addRule(newRule)
      if (res) {
        alert('add new success')
      }
    } else {
      const res = await updateRule(newRule)
      if (res) {
        alert('update success')
      }
    }
  }
  return (
    <div className="flex flex-row py-1 space-y-1">
      <div className="basis-3/12">
        <div className="form-control">
          <label className="input-group">
            <span>Domain</span>
            <input
              type="text"
              className="input input-bordered"
              value={domain}
              onChange={handleDomainChange}
            />
          </label>
        </div>
      </div>
      <div className="basis-7/12">
        <div className="form-control">
          <label className="input-group">
            <span>Title xpath</span>
            <input
              type="text"
              className="input input-bordered w-10/12"
              value={xpath}
              onChange={handleXPathChange}
            />
          </label>
        </div>
      </div>
      <div className="basis-2/12 flex flex-row justify-around">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-error" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ConfigItem
