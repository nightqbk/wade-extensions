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

export type BasicOptions = {
  m3u8Match: string
  // http:localhost:5000/api
  apiPrefix: string
}
