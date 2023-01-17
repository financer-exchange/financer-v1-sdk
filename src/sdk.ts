import { AptosClient } from 'aptos'
import { MiscModule } from './modules/MiscModule'
import { SwapModule } from './modules/SwapModule'
import { RouteModule } from './modules/RouteModule'
import { RouteV2Module } from './modules/RouteV2Module'
import { MasterChefModule } from './modules/MasterChefModule'
import { ResourcesModule } from './modules/ResourcesModule'
import { AptosResourceType } from './types/aptos'

export type SdkOptions = {
  nodeUrl: string
  networkOptions: {
    nativeCoin: AptosResourceType
    modules: {
      CoinInfo: AptosResourceType
      CoinStore: AptosResourceType
      Scripts: AptosResourceType
      ResourceAccountAddress: AptosResourceType
      DeployerAddress: AptosResourceType
      FinAddress: AptosResourceType
      MasterChefScripts: AptosResourceType
      MasterChefDeployerAddress: AptosResourceType
      MasterChefResourceAccountAddress: AptosResourceType
    } & Record<string, AptosResourceType>
    misc: {
      AirdropDeployer: AptosResourceType
      AutoFinScripts: AptosResourceType
      AutoFinDeployerAddress: AptosResourceType
      AutoFinResourceAccountAddress: AptosResourceType
    } & Record<string, AptosResourceType>
    coins: {
      zUSDC: AptosResourceType
    } & Record<string, AptosResourceType>
  }
}

export enum NetworkType {
  Mainnet,
  Devnet,
  Testnet,
}

export class SDK {
  protected _client: AptosClient
  protected _swap: SwapModule
  protected _route: RouteModule
  protected _routeV2: RouteV2Module
  protected _masterchef: MasterChefModule
  protected _misc: MiscModule
  protected _resources: ResourcesModule
  protected _networkOptions: SdkOptions['networkOptions']

  get swap() {
    return this._swap
  }

  get route() {
    return this._route
  }

  get routeV2() {
    return this._routeV2
  }

  get MasterChef() {
    return this._masterchef
  }

  get Misc() {
    return this._misc
  }

  get resources() {
    return this._resources
  }

  get client() {
    return this._client
  }

  get networkOptions() {
    return this._networkOptions
  }

  /**
   * SDK constructor
   * @param nodeUrl string
   * @param networkType? NetworkType
   */
  constructor(nodeUrl: string, networkType?: NetworkType) {
    const mainnetOptions = {
      nativeCoin: '0x1::aptos_coin::AptosCoin',
      modules: {
        Scripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerProtocolPoolV1',
        CoinInfo: '0x1::coin::CoinInfo',
        CoinStore: '0x1::coin::CoinStore',
        DeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        ResourceAccountAddress: '0x5835dabd0cdfae7fe3d19715a05793727cbd523b3d9976c2a52f44b929ebb106',
        FinAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin::FIN',
        MasterChefScripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin',
        MasterChefDeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        MasterChefResourceAccountAddress: '0x1074ce8ac446c97b943d58b3a93ba4ba6bc68781815dcea6e6ceee767941c2c3',
      },
      misc: {
        AirdropDeployer: '0xf713bbb607b171ef26dd141050b854a8a7270b5a555a0a202abd98e3e5ded9da',
        AutoFinScripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::AutoFin',
        AutoFinDeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        AutoFinResourceAccountAddress: '0x453989b1e41bb442c833314f6ffc8572e3670c1a40a6c8a6e52ea7c588c72fd7',
      },
      coins: {
        zUSDC: '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC',
      },
    }
    const devnetOptions = {
      nativeCoin: '0x1::aptos_coin::AptosCoin',
      modules: {
        Scripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerProtocolPoolV1',
        CoinInfo: '0x1::coin::CoinInfo',
        CoinStore: '0x1::coin::CoinStore',
        DeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        ResourceAccountAddress: '0x5835dabd0cdfae7fe3d19715a05793727cbd523b3d9976c2a52f44b929ebb106',
        FinAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin::FIN',
        MasterChefScripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin',
        MasterChefDeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        MasterChefResourceAccountAddress: '0x5835dabd0cdfae7fe3d19715a05793727cbd523b3d9976c2a52f44b929ebb106',
      },
      misc: {
        AirdropDeployer: '0xf713bbb607b171ef26dd141050b854a8a7270b5a555a0a202abd98e3e5ded9da',
        AutoFinScripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::AutoFinT1',
        AutoFinDeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        AutoFinResourceAccountAddress: '0x453989b1e41bb442c833314f6ffc8572e3670c1a40a6c8a6e52ea7c588c72fd7',
      },
      coins: {
        zUSDC: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin::FIN',
      },
    }
    const testnetOptions = {
      nativeCoin: '0x1::aptos_coin::AptosCoin',
      modules: {
        Scripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerProtocolPoolV1',
        CoinInfo: '0x1::coin::CoinInfo',
        CoinStore: '0x1::coin::CoinStore',
        DeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        ResourceAccountAddress: '0x5835dabd0cdfae7fe3d19715a05793727cbd523b3d9976c2a52f44b929ebb106',
        FinAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin::FIN',
        MasterChefScripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin',
        MasterChefDeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        MasterChefResourceAccountAddress: '0x1074ce8ac446c97b943d58b3a93ba4ba6bc68781815dcea6e6ceee767941c2c3',
      },
      misc: {
        AirdropDeployer: '0xf713bbb607b171ef26dd141050b854a8a7270b5a555a0a202abd98e3e5ded9da',
        AutoFinScripts: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::AutoFinf2',
        AutoFinDeployerAddress: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6',
        AutoFinResourceAccountAddress: '0xdfee246b309af2e34e11c4f10119ac177185a6737ba05ad4377245d8164e669d',
      },
      coins: {
        zUSDC: '0x8f3fd4fa708e5b3bff4019b801d2d3d0ae16cf430440fff32ede61c09e001ec6::FinancerCoin::FIN',  // dummy
      },
    }
    let networkOptions = mainnetOptions  // default network
    if (networkType == NetworkType.Mainnet) networkOptions = mainnetOptions
    if (networkType == NetworkType.Devnet) networkOptions = devnetOptions
    if (networkType == NetworkType.Testnet) networkOptions = testnetOptions
    const options = {
      nodeUrl,
      networkOptions: networkOptions,
    }
    this._networkOptions = options.networkOptions
    this._client = new AptosClient(options.nodeUrl)
    this._swap = new SwapModule(this)
    this._route = new RouteModule(this)
    this._routeV2 = new RouteV2Module(this)
    this._masterchef = new MasterChefModule(this)
    this._misc = new MiscModule(this)
    this._resources = new ResourcesModule(this)
  }
}
