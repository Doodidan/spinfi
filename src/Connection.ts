import {ConnectionConfig, KeyStore} from "./types";
import {connect, keyStores, WalletConnection} from "near-api-js";
import {Near} from "near-api-js/lib/near";

class Connection {
  private keyStore: KeyStore = new keyStores.BrowserLocalStorageKeyStore();

  private connectionConfig: ConnectionConfig = {
    networkId: "testnet",
    keyStore: this.keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  private nearConnection: Near | undefined;
  public walletConnection: WalletConnection | undefined;

  constructor() {
    this.init();
  }

  readyPromiseResolve: Function | undefined;
  public readyPromise: Promise<void> = new Promise<void>((resolve) => {
    this.readyPromiseResolve = resolve;
  })

  private async init() {
    this.nearConnection = await connect(this.connectionConfig);
    if (this.readyPromiseResolve) this.readyPromiseResolve()
    this.walletConnection = new WalletConnection(this.nearConnection, 'spinfi');
  }
}

const connectionInstance = new Connection();

export {connectionInstance as Connection};

