import SDK, { NetworkType } from '../main'
const coinType = '0x5835dabd0cdfae7fe3d19715a05793727cbd523b3d9976c2a52f44b929ebb106::LPCoinV1::LPCoin<0x1::aptos_coin::AptosCoin,0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin::FIN>'
const userAddress = '0x2c5ebdd44fd5eac6382e53319a8fae35b87c3b25903c8b44ed35f9db63746538'

describe('Masterchef Module', () => {
  const sdk = new SDK('https://fullnode.mainnet.aptoslabs.com', NetworkType.Mainnet)

  test('getLPInfoResources', async () => {
    const output = await sdk.MasterChef.getLPInfoResources()
    console.log(output)
    expect(output.length).toBeGreaterThan(0)
  })

  test('getPoolInfoByCoinType', async () => {
    const output = await sdk.MasterChef.getPoolInfoByCoinType(sdk.networkOptions.modules.FinAddress)
    console.log(output)
    expect(Number(output.alloc_point)).toBeGreaterThan(0)
  })

  test('getAllPoolInfo', async () => {
    const output = await sdk.MasterChef.getAllPoolInfo()
    console.log(output)
    expect(output.length).toBeGreaterThan(0)
  })

  test('getMasterChefData', async () => {
    const output = await sdk.MasterChef.getMasterChefData()
    console.log(output)
    expect(1).toBe(1)
  })

  test('getUserInfoByCoinType', async () => {
    const output = await sdk.MasterChef.getUserInfoByCoinType(userAddress, sdk.networkOptions.modules.FinAddress)
    console.log(output)
    expect(1).toBe(1)
  })

  test('getUserInfoAll', async () => {
    const output = await sdk.MasterChef.getUserInfoAll(userAddress)
    console.log(output)
    expect(1).toBe(1)
  })

  test('getFirstTwoPairStakedLPInfo', async () => {
    const output = await sdk.MasterChef.getFirstTwoPairStakedLPInfo()
    console.log(output)
    expect(1).toBe(1)
  })

  test('checkRegisteredFIN true', async () => {
    const output = await sdk.MasterChef.checkRegisteredFIN(sdk.networkOptions.modules.MasterChefDeployerAddress)
    expect(output).toBe(true)
  })

  test('checkRegisteredFIN false', async () => {
    const output = await sdk.MasterChef.checkRegisteredFIN(sdk.networkOptions.modules.ResourceAccountAddress)
    expect(output).toBe(false)
  })

  test('registerFINPayload', async () => {
    const output = sdk.MasterChef.registerFINPayload()
    console.log(output)
    expect(1).toBe(1)
  })

  test('stakeLPCoinPayload', async () => {
    const output = sdk.MasterChef.stakeLPCoinPayload({
      amount: '100000000',
      coinType,
      method: 'deposit',
    })
    console.log(output)
    expect(1).toBe(1)
  })

  test('stakeFINPayload', async () => {
    const output = sdk.MasterChef.stakeFINPayload({
      amount: '100000000',
      method: 'enter_staking',
    })
    console.log(output)
    expect(1).toBe(1)
  })
})
