import { composeType, extractAddressFromType } from './contract'

const LPCoinModule = 'LPCoinV1'
const LPCoinType = 'LPCoin'
const FinancerLiquidityPool = 'LiquidityPool'
const FinancerAdminData = 'AdminData'
const FinancerPairInfo = 'PairInfo'
const FinancerEvent = 'Events'
const FinancerMasterChefLPInfo = 'LPInfo'
const FinancerMasterChefPoolInfo = 'PoolInfo'
const FinancerMasterChefUserInfo = 'UserInfo'
const FinancerMasterChefData = 'MasterChefData'
const FINModuleName = 'FinancerCoin'
const FINRegister = 'register_FIN'
const AutoFinUserInfo = 'UserInfo'
const AutoFinData = 'AutoFINData'

export function composeLPCoin(address: string, coin_x: string, coin_y: string) {
  return composeType(address, LPCoinModule, LPCoinType, [coin_x, coin_y])
}

export function composeLP(swapScript: string, coin_x: string, coin_y: string) {
  return composeType(swapScript, FinancerLiquidityPool, [coin_x, coin_y])
}

export function composeLPCoinType(address: string) {
  return composeType(address, LPCoinModule, LPCoinType)
}

export function composeSwapPoolData(swapScript: string) {
  return composeType(swapScript, FinancerAdminData)
}

export function composePairInfo(swapScript: string) {
  return composeType(swapScript, FinancerPairInfo)
}

export function composeCoinStore(coinStore: string, coinType: string) {
  return `${coinStore}<${coinType}>`
}

export function composeLiquidityPool(swapScript: string) {
  return composeType(swapScript, FinancerLiquidityPool)
}

export function composeSwapEvent(swapScript: string, coin_x: string, coin_y: string) {
  return composeType(swapScript, FinancerEvent, [coin_x, coin_y])
}

export function composeMasterChefLPList(mcScript: string) {
  return composeType(mcScript, FinancerMasterChefLPInfo)
}

export function composeMasterChefPoolInfo(mcScript: string, coinType: string) {
  return composeType(mcScript, `${FinancerMasterChefPoolInfo}<${coinType}>`)
}
  
export function composeMasterChefPoolInfoPrefix(mcScript: string) {
  return composeType(mcScript, FinancerMasterChefPoolInfo)
}

export function composeMasterChefData(mcScript: string) {
  return composeType(mcScript, FinancerMasterChefData)
}

export function composeMasterChefUserInfo(mcScript: string, coinType: string) {
  return composeType(mcScript, `${FinancerMasterChefUserInfo}<${coinType}>`)
}

export function composeMasterChefUserInfoPrefix(mcScript: string) {
  return composeType(mcScript, FinancerMasterChefUserInfo)
}

export function composeFINRegister(addressFIN: string) {
  return composeType(extractAddressFromType(addressFIN), FINModuleName, FINRegister)
}

export function composeAutoFinUserInfo(aaScript: string) {
  return composeType(aaScript, AutoFinUserInfo)
}

export function composeAutoFinData(aaScript: string) {
  return composeType(aaScript, AutoFinData)
}

