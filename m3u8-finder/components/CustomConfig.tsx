import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import type { Rule } from '~models/model.types'
import { getRules, removeRule } from '~services/ConfigService'
import { getM3u8Rules, updateM3u8Rules } from '~services/ConfigService'

import ConfigItem from './ConfigItem'

const CustomConfig = () => {
  const [rules, setRules] = useState<Array<Rule>>([])
  const [m3u8, setM3u8] = useState<string>('')

  useEffect(() => {
    getRules().then((res) => {
      setRules(res)
    })

    getM3u8Rules().then((res) => {
      setM3u8(res)
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
    setM3u8(e.target.value)
  }

  const handleSaveM3u8 = () => {
    updateM3u8Rules(m3u8).then(() => {
      toast('保存成功')
    })
  }

  return (
    <>
      <div className="m3u8 my-2">
        <p className="text-2xl font-bold mb-1">M3U8 Rules</p>
        <div className="mb-2">
          <input
            type="text"
            placeholder="M3U8 match rules"
            className="input input-bordered w-full"
            value={m3u8}
            onChange={handleM3u8Change}
          />
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-base text-blue-600/75">
            The m3u8 rule is split by <kbd className="kbd">;</kbd>
          </p>
          <button className="btn btn-primary" onClick={handleSaveM3u8}>
            保存
          </button>
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
