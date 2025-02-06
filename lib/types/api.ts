export interface TransactionResponse {
  id: number
  amount: number
  type: string
  status: string
  created_date: string
  source_user_id: number
  destination_user_id: number
}

export interface PaginatedResponse<T> {
  total_records: number
  page_number: number
  page_size: number
  data: T[]
}

export interface WalletResponse {
  id: number
  balance: number
  last_updated: string
  is_active: boolean
  user_id: number
}

export interface UserResponse {
  id: number
  username: string
  email: string
  role_name: string
  created_date: string
  user_detail: UserDetailResponse
  user_setting: UserSettingResponse
  wallet: WalletResponse
}

export interface UserDetailResponse {
  first_name: string
  last_name: string
  middle_name?: string
  address: string
  mobile_number: string
  birth_date?: string
  is_active: boolean
}

export interface UserSettingResponse {
  last_login_ip?: string
  last_login_date_time?: string
}
