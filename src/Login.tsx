import {FC, useCallback, MouseEvent} from "react";
import {Connection} from "./Connection";

const FALLBACK_URL =
  'https://wallet.testnet.near.org/login/?success_url=http%3A%2F%2Flocalhost%3A3000%2Fsuccess&failure_url=http%3A%2F%2Flocalhost%3A3000%2Ffailure&contract_id=example-contract.testnet'

type LoginProps = {};

export const Login: FC<LoginProps> = () => {
  const login = useCallback((event: MouseEvent) => {
    event.preventDefault();

    Connection.walletConnection?.requestSignIn({
        contractId:
          "example-contract.testnet", // contract requesting access,
        successUrl:
          "http://localhost:3000/success", // optional redirect URL on success
        failureUrl:
          "http://localhost:3000/failure" // optional redirect URL on failure
      }
    );
  }, []);

  return <a href={FALLBACK_URL} onClick={login}>Login</a>;
}
