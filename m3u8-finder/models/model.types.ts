export type Video = {
  title?: string
  url: string
  pageUrl?: string
  tabId?: number
  id: string
  timestamp: number
}

export type Rule = {
  id: string
  domain: string
  xpath: string
  isNew?: boolean
}
