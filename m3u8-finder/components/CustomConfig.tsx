import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { Rule } from '~models/model.types'
import { getRules, removeRule } from '~services/ConfigService'
import { getM3u8Rules, updateM3u8Rules } from '~services/ConfigService'

import ConfigItem from './ConfigItem'

const CustomConfig = () => {
  const [rules, setRules] = useState<Array<Rule>>([])

  useEffect(() => {
    getRules().then((res) => {
      setRules(res)
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

  return (
    <>
      <div className="m3u8 my-2">
        <p className="text-2xl font-bold mb-1">M3U8 Rules</p>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-base text-blue-600/75">
            The m3u8 rule is split by <kbd className="kbd">;</kbd>
          </p>
          <button className="btn btn-primary">保存</button>
        </div>
      </div>
      <div className="divider">AND</div>
      <div className="pt-2">
        <p className="text-2xl font-bold mb-1">标题匹配</p>
        {rules.map((c) => (
          <ConfigItem key={c.id} {...c} onDeleteRule={handleDelete} />
        ))}
        <button className="btn btn-accent" onClick={handleNew}>
          New
        </button>
      </div>
    </>
  )
}
export default CustomConfig
