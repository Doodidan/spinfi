import {BrowserLocalStorageKeyStore} from "near-api-js/lib/key_stores/browser_local_storage_key_store";

export type KeyStore = BrowserLocalStorageKeyStore;

export type ConnectionConfig = {
  networkId: string,
  keyStore: KeyStore,
  nodeUrl: string,
  walletUrl: string,
  helperUrl: string,
  explorerUrl: string,
};

export type Market = {
  id: number,
  base: {
    ticker: string,
    decimal: number,
    address: string,
  },
  quote: {
    ticker: string,
    decimal: number,
    address: string,
  },
  fee: number
}

export type Markets = Array<Market>;

export type MarketInfo = {
  ask_orders:
    {
      price: number,
      quantity: number,
    }[],
  bid_orders:
    {
      price: number,
      quantity: number,
    }[]
}
