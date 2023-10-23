import { useEffect, useState } from "react";
import Modal from "./common/Modal";
import { allowance, approve } from "../contractHooks/token";
import { useAccount } from "wagmi";
import Button from "./common/Button";
import { stake } from "../contractHooks/staking";
import BigNumber from "bignumber.js";
import { toastError, toastSuccess } from "../utils/toastWrapper";

const StakingModal = ({
  handleModalClose,
  modalOpen,
  token,
  stakingAmount,
  staker,
  stakingDetails,
  updateStaker,
  updateStakingDetails,
  setStakingAmount,
}) => {
  const [modalLoading, setModalLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    checkTokenAllowance();
  }, []);

  const checkTokenAllowance = async () => {
    setModalLoading(true);
    let tAllowance = await allowance(token.address, address, token.stakingAddress, token.decimals);
    setModalLoading(false);

    if (tAllowance >= stakingAmount) {
      setHasAllowance(true);
    }
  };

  const handleApprove = async () => {
    try {
      setBtnLoading(true);
      await approve(token.address, token.stakingAddress, stakingAmount, token.decimals);

      setHasAllowance(true);
      setBtnLoading(false);
    } catch (error) {
      error.shortMessage && toastError(error.shortMessage);
      setBtnLoading(false);
    }
  };

  const handleStaking = async () => {
    try {
      setBtnLoading(true);
      await stake(token.stakingAddress, stakingAmount, token.decimals);

      // Updating State
      const stakedAmount = new BigNumber(staker.stakedAmount).plus(new BigNumber(stakingAmount));
      const totalFundsStaked = new BigNumber(stakingDetails.totalFundsStaked).plus(
        new BigNumber(stakingAmount)
      );
      updateStaker({ ...staker, stakedAmount });
      updateStakingDetails({ ...stakingDetails, totalFundsStaked });

      setBtnLoading(false);
      setStakingAmount("");
      handleModalClose();
      toastSuccess(`Successfully staked ${stakingAmount} ${token.name}`);
    } catch (error) {
      error.shortMessage && toastError(error.shortMessage);
      setBtnLoading(false);
    }
  };

  const modalBody = () => {
    return !hasAllowance ? (
      <Button
        loading={btnLoading}
        onClick={handleApprove}
        btnLabel={`Approve ${stakingAmount} ${token.name}`}
        className={"btn btn--purple"}
      />
    ) : (
      <Button
        loading={btnLoading}
        onClick={handleStaking}
        btnLabel={`Stake ${stakingAmount} ${token.name}`}
        className={"btn btn--purple"}
      />
    );
  };

  return (
    <Modal
      loading={modalLoading}
      modalBody={modalBody()}
      modalTitle={!hasAllowance ? "Approve Tokens" : "Confirm Staking"}
      handleModalClose={handleModalClose}
      modalOpen={modalOpen}
    />
  );
};

export default StakingModal;
