export interface Url {
  id: number
  original_url: string
  short_code: string
  created_at: string
  expires_at?: string | null // Optional
  expires_in?: number | null // Optional
  named_url?: string | null // Optional
  visits: number
  max_visits?: number | null // Optional
}
