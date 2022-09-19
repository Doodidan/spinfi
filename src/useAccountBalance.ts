import {useEffect, useState} from "react";
import {useWalletConnection} from "./useWalletConnection";
import {AccountBalance} from "near-api-js/lib/account";

export const useAccountBalance = () => {
  const [accountBalance, setAccountBalance] =useState<AccountBalance|undefined>(undefined);
  const walletConnection = useWalletConnection();
  useEffect(()=>{
    walletConnection?.account().getAccountBalance().then(res => {
      setAccountBalance(res);
    });
  } , [walletConnection]);
  return accountBalance;
};
