import {ChangeEvent, FC, useCallback, useEffect, useMemo, useState} from "react";
import {useWalletConnection} from "./useWalletConnection";
import {useAccountBalance} from "./useAccountBalance";
import {Contract} from "near-api-js";
import {MarketInfo, Markets} from "./types";
import BigNumber from "bignumber.js";

import "./MainInfo.css";

type MainInfoProps = {};

export const MainInfo: FC<MainInfoProps> = () => {
  const walletConnection = useWalletConnection();
  const accountBalance = useAccountBalance();

  const contract = useMemo(() => {
    if (!walletConnection) return;

    return new Contract(
      walletConnection.account(),
      'app_2.spin_swap.testnet',
      {
        viewMethods: ['markets', 'view_market'],
        changeMethods: []
      }
    );
  }, [walletConnection]);

  const [markets, setMarkets] = useState<Markets>([]);
  useEffect(() => {
    if (!contract) return;

    // Poor contract typings
    // @ts-ignore
    contract.markets().then(res => setMarkets(res));
  }, [contract]);

  const [market, setMarket] = useState<MarketInfo | undefined>();
  const viewMarket = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    if (!contract) return;

    const val = +event.target.value;

    if (val === -1) {
      setMarket(undefined);
      return;
    }

    // Poor contract typings
    // @ts-ignore
    contract.view_market({market_id: val}).then(res => setMarket(res));
  }, [contract]);

  return (
    <div>
      <div className={'account'}>
        <p className={'account_name'}>{walletConnection?.getAccountId()}</p>
        <a href='/'>Logout</a>
      </div>
      <div className={'balance'}>
        <p className={'balance_item'}>Total</p>
        <p className={'balance_item'}>{accountBalance?.total}</p>
        <p className={'balance_item'}>Available</p>
        <p className={'balance_item'}>{accountBalance?.available}</p>
      </div>

      <select onChange={viewMarket}>
        <option value={-1}>Select market</option>
        {markets.map((item) => (
          <option key={item.id} value={item.id}>{item.base.ticker} / {item.quote.ticker}</option>
        ))}
      </select>

      {market !== undefined ? (
        <>
          <p>Ask Orders</p>
          <table className={'market_info'}>
            <thead>
            <tr>
              <td>Price</td>
              <td>Quantity</td>
            </tr>
            </thead>
            {market.ask_orders.map(({price, quantity}) => (
              <tr>
                <td>{BigNumber(price).toFormat(0)}</td>
                <td>{BigNumber(quantity).toFormat(0)}</td>
              </tr>
            ))}
          </table>

          <hr/>

          <p>Bid Orders</p>
          <table className={'market_info'}>
            <thead>
            <tr>
              <td>Price</td>
              <td>Quantity</td>
            </tr>
            </thead>
            {market.bid_orders.map(({price, quantity}) => (
              <tr>
                <td>{BigNumber(price).toFormat(0)}</td>
                <td>{BigNumber(quantity).toFormat(0)}</td>
              </tr>
            ))}
          </table>
        </>
      ) : null}
    </div>
  );
};

