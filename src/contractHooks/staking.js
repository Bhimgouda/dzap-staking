import STAKING_CONTRACT_ABI from "../contractAbis/stakingContractAbi.json";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "wagmi/actions";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { retryOperation } from "../utils/retryOperation";

function contractReader(contractAddress, functionName, args = []) {
  return readContract({
    abi: STAKING_CONTRACT_ABI,
    address: contractAddress,
    functionName,
    args,
  });
}

async function contractWriter(contractAddress, functionName, args = [], value = "0") {
  const { request } = await prepareWriteContract({
    abi: STAKING_CONTRACT_ABI,
    address: contractAddress,
    functionName,
    args,
    value,
  });

  const { hash } = await writeContract(request);
  return retryOperation(waitForTransaction, { hash });
}

// -------- Read Functions -------- //

export async function getApy(contractAddress) {
  const data = await contractReader(contractAddress, "getDetails");
  return formatUnits(data[3], 0);
}
export async function getTotalFundsStaked(contractAddress, tokenDecimals) {
  const data = await contractReader(contractAddress, "getTVLDetails");
  return formatUnits(data[0], tokenDecimals);
}
export async function getStakerInfo(contractAddress, stakerAddress, tokenDecimals) {
  const data = await contractReader(contractAddress, "getStakerInfo", [stakerAddress]);
  return {
    stakedAmount: formatUnits(data[0], tokenDecimals),
    unclaimedRewards: formatUnits(data[1], tokenDecimals),
    claimedRewards: formatUnits(data[2], tokenDecimals),
  };
}

// -------- Write Functions -------- //

export async function stake(contractAddress, amount, tokenDecimals) {
  amount = parseUnits(amount, tokenDecimals);
  return contractWriter(contractAddress, "stake", [amount, ""]);
}
export async function unstake(contractAddress) {
  return contractWriter(contractAddress, "unstake");
}
export async function claimRewards(contractAddress) {
  return contractWriter(contractAddress, "claimRewards");
}
