import { useState } from "react";
import Button from "./common/Button";
import { formatNumber } from "../utils/formatNumber";
import StakingModal from "./StakingModal";
import { object, number } from "yup";
import { validate, validateProperty } from "../utils/formValidation";
import { unstake } from "../contractHooks/staking";
import BigNumber from "bignumber.js";
import { toastError } from "../utils/toastWrapper";

const StakingSection = ({
  staker,
  stakingDetails,
  token,
  supported,
  updateStaker,
  updateStakingDetails,
}) => {
  const [stakingAmount, setStakingAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);

  const stakingSchema = object({
    stakingAmount: number()
      .typeError("Please enter a Staking Amount")
      .positive()
      .max(staker.tokenBalance, "Exceeds your tokenBalance"),
  });

  const handleStakingAmountChange = async (e) => {
    const { currentTarget: input } = e;
    setStakingAmount(input.value);

    const errorMessage = await validateProperty(input, stakingSchema);
    const tError = { ...error };
    tError[input.name] = errorMessage;
    setError(tError);
  };

  const handleModalToggle = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  const handleStake = async () => {
    const tError = await validate({ stakingAmount }, stakingSchema);
    if (tError) {
      return setError(tError);
    }

    handleModalToggle();
  };

  const handleUnstake = async () => {
    try {
      setBtnLoading(true);
      await unstake(token.stakingAddress);

      // Updating Stake
      const stakedAmount = "0";
      const totalFundsStaked = String(
        new BigNumber(stakingDetails.totalFundsStaked).minus(new BigNumber(staker.stakedAmount))
      );
      updateStakingDetails({ ...stakingDetails, totalFundsStaked });
      updateStaker({ ...staker, stakedAmount });

      setBtnLoading(false);
    } catch (error) {
      error.shortMessage && toastError(error.shortMessage);
      setBtnLoading(false);
    }
  };

  return (
    <div className="card d-flex flex-column align-items-center justify-content-between">
      <div className="">
        <img className="icon--big" src={`/images/${token.logoUrl}`} alt="" />
        <h5>My Funds</h5>
        <p className="text-grey">{token.name} staked</p>
        <h5 className="text-bold">
          {formatNumber(staker.stakedAmount, 7)} {token.name}
        </h5>
      </div>
      <div className="">
        <div className="my-4">
          <div className="staking-input d-flex justify-space-between">
            <div className="d-flex justify-content-between align-items-center">
              <img className="icon mx-2" src={`/images/${token.logoUrl}`} alt="" />
              <span className="">{token.name}</span>
            </div>
            <input
              onChange={handleStakingAmountChange}
              placeholder="0.00"
              type="number"
              className="form-control"
              name="stakingAmount"
              value={stakingAmount}
            />
          </div>
          <small className="text-red">{error.stakingAmount}</small>
        </div>
        <p className="text-grey">
          Available: {formatNumber(staker.tokenBalance, 7)} {token.name}
        </p>
        <Button
          disableBtn={!supported || error.stakingAmount}
          onClick={handleStake}
          className={"btn btn--purple mb-2"}
          btnLabel={"Stake"}
        />
        <Button
          loading={btnLoading}
          disableBtn={!supported || !parseFloat(staker.stakedAmount) || btnLoading}
          onClick={handleUnstake}
          className={"btn btn--grey"}
          btnLabel={"Unstake"}
        />
      </div>
      {modalOpen && (
        <StakingModal
          token={token}
          stakingAmount={stakingAmount}
          setStakingAmount={setStakingAmount}
          modalOpen={modalOpen}
          handleModalClose={handleModalToggle}
          staker={staker}
          stakingDetails={stakingDetails}
          updateStaker={updateStaker}
          updateStakingDetails={updateStakingDetails}
        />
      )}
    </div>
  );
};

export default StakingSection;
