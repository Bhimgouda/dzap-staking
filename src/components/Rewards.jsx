import Button from "../components/common/Button";

const Rewards = ({ supported }) => {
  return (
    <div className="card d-flex flex-column align-items-center justify-content-between">
      <div className="">
        <h5>My Rewards</h5>
        <p className="text-grey">Unclaimed rewards</p>
        <h5 className="text-bold">0.000 {supported.currency}</h5>
      </div>
      <div className="">
        <p className="text-grey">Total rewards claimed: 1.9803 {supported.currency}</p>
        <Button className={"btn btn--purple mb-2"} btnLabel={"Claim Rewards"} />
      </div>
    </div>
  );
};

export default Rewards;
