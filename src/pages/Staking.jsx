import { useAccount, useNetwork } from "wagmi";
import Display from "../components/Display";
import Funds from "../components/Funds";
import Rewards from "../components/Rewards";
import { useEffect, useState } from "react";
import supportedChains from "../config/supportedChains.json";

const Staking = () => {
  const [supported, setSupported] = useState({});

  const { account, isConnected } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    if (!isConnected) {
      return setSupported({});
    }
    setSupported(supportedChains[chain.id]);
  }, [chain, isConnected]);

  return (
    <div className="container">
      <Display supported={supported} />
      <div className="card-container d-flex justify-content-center align-items-center">
        <Funds supported={supported} />
        <Rewards supported={supported} />
      </div>
    </div>
  );
};

export default Staking;
