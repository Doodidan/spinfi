import {FC} from "react";
import {useWalletConnection} from "./useWalletConnection";
import {useAccountBalance} from "./useAccountBalance";

type MainInfoProps = {};

export const MainInfo: FC<MainInfoProps> = () => {
  const walletConnection = useWalletConnection();
  const accountBalance = useAccountBalance();

  return (
    <div>
      <a href='/'>Logout</a>
      <p>{walletConnection?.getAccountId()}</p>
      <p>{accountBalance?.total}</p>
      <p>{accountBalance?.available}</p>
    </div>
  );
};

