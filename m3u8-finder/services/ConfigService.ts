import { v4 as uuidv4 } from 'uuid'

import { Storage } from '@plasmohq/storage'

import type { BasicOptions, Rule } from '~models/model.types'

const keys = {
  rules: 'ConfigService__Rules',
  m3u8Rules: 'ConfigService__m3u8',
  basicOptions: 'ConfigService__basic'
}

const storage = new Storage({
  area: 'local'
})

export const getRules = async (): Promise<Rule[]> => {
  const rules = (await storage.get<Rule[]>(keys.rules)) || []
  if (rules.length === 0) {
    rules.push({
      id: uuidv4(),
      domain: 'https://jable.tv/',
      xpath:
        '//*[@id="site-content"]/div/div/div[1]/section[2]/div[1]/div[1]/h4'
    })

    await storage.set(keys.rules, rules)
  }

  return rules
}

export const addRule = async (rule: Rule) => {
  let rules = await storage.get<Rule[]>(keys.rules)
  rules = rules || []
  rule.id = uuidv4()
  rules.push(rule)
  await storage.set(keys.rules, rules)
  return rule
}

export const updateRule = async (rule: Rule) => {
  let rules = await storage.get<Rule[]>(keys.rules)
  rules = rules || []
  const existed = rules.find((c) => c.id === rule.id)
  if (existed) {
    existed.xpath = rule.xpath
  }

  await storage.set(keys.rules, rules)
  return rule
}

export const removeRule = async (id: string) => {
  let rules = await storage.get<Rule[]>(keys.rules)
  rules = rules || []
  const newRules = rules.filter((c) => c.id !== id)
  await storage.set(keys.rules, newRules)
}

export const getBasicOptions = async () => {
  return await storage.get<BasicOptions>(keys.basicOptions)
}

export const updateBasicOptions = async (options: BasicOptions) => {
  await storage.set(keys.basicOptions, options)
}

export const getMatchedXpath = async (url: string) => {
  const titleRules = await getRules()
  for (const rule of titleRules) {
    const configUrl = new URL(rule.domain)
    if (configUrl.hostname === new URL(url).hostname) {
      return rule.xpath
    }
  }

  return undefined
}
