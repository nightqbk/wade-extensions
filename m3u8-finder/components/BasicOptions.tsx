import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import type { BasicOptions, Rule } from '~models/model.types'
import { getRules, removeRule } from '~services/ConfigService'
import { getBasicOptions, updateBasicOptions } from '~services/ConfigService'

import OptionItem from './OptionItem'

const BasicOptions = () => {
  const [rules, setRules] = useState<Array<Rule>>([])
  const [options, setOptions] = useState<BasicOptions>({
    m3u8Match: '.m3u8',
    apiPrefix: ''
  })

  useEffect(() => {
    getRules().then((res) => {
      setRules(res)
    })

    getBasicOptions().then((res) => {
      if (res) {
        setOptions(res)
      }
    })
  }, [])

  const handleNew = () => {
    setRules([...rules, { id: uuidv4(), domain: '', xpath: '', isNew: true }])
  }

  const handleDelete = async (ruleId) => {
    await removeRule(ruleId)
    const newRules = rules.filter((c) => c.id !== ruleId)
    setRules(newRules)
  }

  const handleM3u8Change = (e) => {
    setOptions({ ...options, ...{ m3u8Match: e.target.value } })
  }

  const handleApiPrefixChange = (e) => {
    setOptions({ ...options, ...{ apiPrefix: e.target.value } })
  }

  const handleUpdateOptions = async () => {
    await updateBasicOptions(options)
    toast.success('Update options success')
  }

  return (
    <>
      <div className="m3u8 my-2">
        <p className="text-2xl font-bold mb-1">Options</p>
        <div className="mb-2">
          <div className="form-control">
            <label className="input-group input-group-md">
              <span>M3U8Match</span>
              <input
                type="text"
                placeholder="M3U8 match rules"
                className="input input-bordered w-full"
                value={options.m3u8Match}
                onChange={handleM3u8Change}
              />
            </label>
          </div>
          <p className="text-base text-blue-600/75">
            The m3u8 rule is split by <kbd className="kbd">;</kbd>
          </p>
          <div className="form-control mt-2">
            <label className="input-group input-group-md">
              <span>ApiPrefix</span>
              <input
                type="text"
                placeholder="Api prefix"
                className="input input-bordered w-full"
                value={options.apiPrefix}
                onChange={handleApiPrefixChange}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <button className="btn btn-primary" onClick={handleUpdateOptions}>
            保存
          </button>
        </div>
      </div>
      <div className="divider">AND</div>
      <div className="pt-2">
        <p className="text-2xl font-bold mb-1">Domain Title Rules</p>
        {rules.map((c) => (
          <OptionItem key={c.id} {...c} onDeleteRule={handleDelete} />
        ))}
        <button className="btn btn-accent" onClick={handleNew}>
          New
        </button>
      </div>
    </>
  )
}
export default BasicOptions
