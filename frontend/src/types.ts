// types.ts
export interface Url {
  id: number
  original_url: string
  short_code: string
  created_at: string // You might want to use Date if you are handling dates
  expires_at?: string | null // Optional
  named_url?: string | null // Optional
  visits: number
  max_visits?: number | null // Optional
}
