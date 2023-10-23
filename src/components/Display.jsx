import { useEffect, useState } from "react";
import { getApy, getTotalFundsStaked } from "../contractHooks/staking";
import { formatNumber } from "../utils/formatNumber";
import bn from "bignumber.js";

const initialStakingDetails = {
  apy: "0",
  totalFundsStaked: "0",
};

const Display = ({ stakingDetails, token }) => {
  return (
    <div className="display d-flex justify-content-between align-items-center">
      <div className="py-2 px-2">
        <div>{stakingDetails.apy}%</div>
        <div className="text-purple">%APY</div>
      </div>
      <div className="py-2 px-2">
        <div>{formatNumber(stakingDetails.totalFundsStaked, 2)}</div>
        <div className="text-grey">Total {token.name} staked</div>
      </div>
      <div className="py-2 px-2">
        {/* Assuming Tokens value to be $5 */}
        <div>
          ${formatNumber(String(new bn(stakingDetails.totalFundsStaked).multipliedBy(5)), 2)}
        </div>
        <div className="text-grey">Staked Value</div>
      </div>
    </div>
  );
};

export default Display;
