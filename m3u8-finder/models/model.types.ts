export interface Video {
  title?: string
  url: string
  pageUrl?: string
  tabId?: number
  id: string
  timestamp: number
}

export interface Video2 extends Video {
  isChecked: boolean
  created: Date
}

export type Rule = {
  id: string
  domain: string
  xpath: string
  isNew?: boolean
}
