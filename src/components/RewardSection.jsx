import { useEffect, useState } from "react";
import Button from "./common/Button";
import { formatNumber } from "../utils/formatNumber";
import { claimRewards } from "../contractHooks/staking";
import BigNumber from "bignumber.js";
import { toastError, toastSuccess } from "../utils/toastWrapper";

const Rewards = ({ supported, staker, token, updateStaker }) => {
  const [loadingBtn, setBtnLoading] = useState(false);

  const handleClaimRewards = async () => {
    try {
      setBtnLoading(true);
      await claimRewards(token.stakingAddress);

      // Updating State
      const unclaimedRewards = "0";
      const claimedRewards = String(
        new BigNumber(staker.claimedRewards).plus(new BigNumber(staker.unclaimedRewards))
      );
      updateStaker({ ...staker, unclaimedRewards, claimedRewards });

      setBtnLoading(false);
      toastSuccess(`Claimed ${staker.unclaimedRewards} ${token.name}`);
    } catch (error) {
      error.shortMessage && toastError(error.shortMessage);
      setBtnLoading(false);
    }
  };

  return (
    <div className="card d-flex flex-column align-items-center justify-content-between">
      <div className="">
        <img className="icon--big" src={`/images/${token.logoUrl}`} alt="" />
        <h5>My Rewards</h5>
        <p className="text-grey">Unclaimed rewards</p>
        <h5 className="text-bold">
          {formatNumber(staker.unclaimedRewards, 7)} {token.name}
        </h5>
      </div>
      <div className="">
        <p className="text-grey">
          Total rewards claimed: {formatNumber(staker.claimedRewards, 7)} {token.name}
        </p>
        <Button
          loading={loadingBtn}
          onClick={handleClaimRewards}
          disableBtn={!supported || !parseFloat(staker.unclaimedRewards) || loadingBtn}
          className={"btn btn--purple mb-2"}
          btnLabel={"Claim Rewards"}
        />
      </div>
    </div>
  );
};

export default Rewards;
