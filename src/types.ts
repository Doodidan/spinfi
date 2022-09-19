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
