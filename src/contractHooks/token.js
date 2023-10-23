import { erc20ABI as ERC20_ABI } from "wagmi";
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
    abi: ERC20_ABI,
    address: contractAddress,
    functionName,
    args,
  });
}

async function contractWriter(contractAddress, functionName, args = [], value = "0") {
  const { request } = await prepareWriteContract({
    abi: ERC20_ABI,
    address: contractAddress,
    functionName,
    args,
    value,
  });
  const { hash } = await writeContract(request);
  return retryOperation(waitForTransaction, { hash });
}

// -------- Read Functions -------- //

export async function balanceOf(contractAddress, account, tokenDecimals) {
  const tokenBalance = await contractReader(contractAddress, "balanceOf", [account]);
  return formatUnits(tokenBalance, tokenDecimals);
}
export async function allowance(contractAddress, owner, spender, tokenDecimals) {
  const allowance = await contractReader(contractAddress, "allowance", [owner, spender]);
  return formatUnits(allowance, tokenDecimals);
}

// -------- Write Functions -------- //

export async function approve(contractAddress, spender, amount, tokenDecimals) {
  amount = parseUnits(amount, tokenDecimals);
  await contractWriter(contractAddress, "approve", [spender, amount]);
}
