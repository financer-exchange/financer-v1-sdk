import { AptosResourceType } from './aptos'

export type AirdropResource = {
  map: {
    data: [{
      key: AptosResourceType
      value: AptosResourceType
    }]
  }
  treasury: {
    value: AptosResourceType
  }
}

export type AutoFinUserInfo = {
  shares: AptosResourceType
  last_deposited_time: AptosResourceType
  last_user_action_FIN: AptosResourceType
  last_user_action_time: AptosResourceType
}

export type AutoFinData = {
  total_shares: AptosResourceType
  performance_fee: AptosResourceType
  call_fee: AptosResourceType
  withdraw_fee: AptosResourceType
  withdraw_fee_period: AptosResourceType
  last_harvested_time: AptosResourceType
}
