
  // #1: add missing `blockchain` property to `WalletBalance` and `usdValue` to `FormattedWalletBalance`
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  usdValue: number;
}

// START - Define placeholder hooks & interfaces
const useWalletBalances = () => {
  return [] as WalletBalance[];
};

const usePrices = () => {
    return {
        'Osmosis': 1,
        'Ethereum': 2,
        'Arbitrum': 3,
        'Zilliqa': 4,
        'Neo': 5,
    } as { [key: string]: number };
};

interface BoxProps {}

const WalletRow: React.FC<unknown> = () => {
  return <></>;
}

interface Props extends BoxProps {
    classes: {
        row: string;
    };
}
// END - Define placeholder hooks & interfaces

// #2: move the `getPriority` out of the component to avoid recreating on each re-render
// #3: change type of `blockchain` param to `string` instead of `any`
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

// #4: remove the unused variables
const WalletPage: React.FC<Props> = (props: Props) => {
    const { classes } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // #5: change `lhsPriority` to `balancePriority`
        if (balancePriority > -99) {
          if (balance.amount <= 0) {
            // TODO: is the condition opposite?
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // #6: should return 0 at the end OR shorten the sort logic like this
        return getPriority(lhs.blockchain) - getPriority(rhs.blockchain);
        // const leftPriority = getPriority(lhs.blockchain);
        // const rightPriority = getPriority(rhs.blockchain);
        // if (leftPriority > rightPriority) {
        //   return -1;
        // } else if (rightPriority > leftPriority) {
        //   return 1;
        // }
        // return 0;
      });
  }, [balances]); // #7: Remove the `prices` in the deps array as the `sortedBalances` does not depend on the `prices`

  // #8: `formattedBalances` is defined but no use anywhere. Merge it to the `rows`
  //   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //     return {
  //       ...balance,
  //       formatted: balance.amount.toFixed(),
  //     };
  //   });

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const sortedBalance: FormattedWalletBalance = {
      ...balance,
      formatted: balance.amount.toFixed(),
      usdValue: (prices?.[balance.currency] ?? 0) * balance.amount,
    };
    // const usdValue = prices[balance.currency]  * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={sortedBalance.currency} // #9: change `key` from `index` to `balance.currency` as it's a React anti-pattern
        amount={sortedBalance.amount}
        usdValue={sortedBalance.usdValue}
        formattedAmount={sortedBalance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

// #10: should separate `rows` into another component to reduce the complexity of the `WalletPage` component