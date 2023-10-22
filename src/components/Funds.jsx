import Button from "../components/common/Button";
import Input from "./common/Input";

const Funds = ({ supported }) => {
  return (
    <div className="card d-flex flex-column align-items-center justify-content-between">
      <div className="">
        <img className="icon--big" src={`/images/${supported.currencyLogoUrl}`} alt="" />
        <h5>My Funds</h5>
        <p className="text-grey">{supported.currency} staked</p>
        <h5 className="text-bold">0.000 {supported.currency}</h5>
      </div>
      <div className="">
        <div className="staking-input d-flex justify-space-between my-4 ">
          <div className="d-flex justify-content-between align-items-center">
            <img className="icon mx-2" src={`/images/${supported.currencyLogoUrl}`} alt="" />
            <span className="">{supported.currency}</span>
          </div>
          <input placeholder="0.00" type="number" className="form-control" />
        </div>
        <p className="text-grey text-underline">Available: 59.762231 {supported.currency}</p>
        <Button className={"btn btn--purple mb-2"} btnLabel={"Stake"} />
        <Button className={"btn btn--grey"} btnLabel={"Unstake"} />
      </div>
    </div>
  );
};

export default Funds;
