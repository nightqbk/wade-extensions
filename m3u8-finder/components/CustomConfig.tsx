import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { Rule } from '~models/model.types'
import { getRules, removeRule } from '~services/ConfigService'

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
    <div className="pt-2">
      {rules.map((c) => (
        <ConfigItem key={c.id} {...c} onDeleteRule={handleDelete} />
      ))}
      <button className="btn btn-accent" onClick={handleNew}>
        New
      </button>
    </div>
  )
}
export default CustomConfig
