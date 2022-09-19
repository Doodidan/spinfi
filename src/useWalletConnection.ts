import {useEffect, useState} from "react";
import {Connection} from "./Connection";
import {WalletConnection} from "near-api-js";

export const useWalletConnection = () => {
  const [walletConnection, setWalletConnection] = useState<WalletConnection | undefined>(undefined);

  useEffect(() => {
    Connection.readyPromise.then(() => {
      setWalletConnection(Connection.walletConnection)
    })
  }, [])

  return walletConnection;
};
