const Display = ({ supported }) => {
  return (
    <div className="display d-flex justify-content-between align-items-center">
      <div className="py-2 px-2">
        <div>109.32%</div>
        <div className="text-purple">%APY</div>
      </div>
      <div className="py-2 px-2">
        <div>4,000,000</div>
        <div className="text-grey">Total {supported.currency} staked</div>
      </div>
      <div className="py-2 px-2">
        <div>$328,000,000</div>
        <div className="text-grey">Staked Value</div>
      </div>
    </div>
  );
};

export default Display;
