import { useAccount, useNetwork } from "wagmi";
import Display from "../components/Display";
import StakingSection from "../components/StakingSection";
import RewardSection from "../components/RewardSection";
import { useEffect, useState } from "react";
import { getApy, getStakerInfo, getTotalFundsStaked } from "../contractHooks/staking";
import { balanceOf } from "../contractHooks/token";
import stakingTokens from "../config/stakingTokens.json";
import { useParams } from "react-router-dom";

const Staking = () => {
  const [supported, setSupported] = useState(false);
  const [staker, setStaker] = useState({});
  const [stakingDetails, setStakingDetails] = useState({});

  let { tokenAddress } = useParams();
  let token = stakingTokens[tokenAddress];
  if (!token) token = stakingTokens["0x64DE202c43c0C2F666222E8bF327eA1f280d9948"];

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    settingStakingDetails();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setSupported(false);
      setStaker({});
    } else {
      settingStaker();
      setSupported(token.chainId === chain.id);
    }
  }, [isConnected, chain]);

  const settingStakingDetails = async function () {
    const [apy, totalFundsStaked] = await Promise.all([
      getApy(token.stakingAddress),
      getTotalFundsStaked(token.stakingAddress, token.decimals),
    ]);
    setStakingDetails({ apy, totalFundsStaked });
  };

  const settingStaker = async () => {
    const [tokenBalance, { stakedAmount, claimedRewards, unclaimedRewards }] = await Promise.all([
      balanceOf(token.address, address, token.decimals),
      getStakerInfo(token.stakingAddress, address, token.decimals),
    ]);

    setStaker({ address, tokenBalance, stakedAmount, claimedRewards, unclaimedRewards });
  };

  const updateStaker = (staker) => {
    setStaker(staker);
  };

  const updateStakingDetails = (stakingDetails) => {
    setStakingDetails(stakingDetails);
  };

  return (
    <div className="container">
      <Display stakingDetails={stakingDetails} token={token} />
      <div className="card-container d-flex justify-content-center align-items-center">
        <StakingSection
          supported={supported}
          token={token}
          staker={staker}
          stakingDetails={stakingDetails}
          updateStakingDetails={updateStakingDetails}
          updateStaker={updateStaker}
        />
        <RewardSection
          supported={supported}
          token={token}
          staker={staker}
          updateStaker={updateStaker}
        />
      </div>
    </div>
  );
};

export default Staking;
