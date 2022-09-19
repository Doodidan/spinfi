import {FC, MouseEvent, useCallback} from "react";
import {Connection} from "./Connection";
import {FALLBACK_URL} from "./Login";

type FailureProps = {};

export const Failure: FC<FailureProps> = () => {
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

  return <p>Login failed. Please, <a href={FALLBACK_URL} onClick={login}>try again</a>.</p>
};
