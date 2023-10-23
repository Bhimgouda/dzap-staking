import { useEffect, useState } from "react";
import ConnectWalletBtn from "./ConnectWalletBtn";
import { useAccount, useNetwork } from "wagmi";
import supportedChains from "../config/supportedChains.json";
import NetworkSwitchingModal from "./NetworkSwitchingModal";

const Navbar = () => {
  const [supported, setSupported] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) return;

    if (supportedChains[chain.id]) {
      const supported = supportedChains[chain.id];
      setSupported(supported);
    } else {
      setSupported();
    }
  }, [chain, isConnected]);

  const handleModalToggle = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  return (
    <div className="navbar d-flex justify-content-between px-md-5 py-3 px-3 topSticky">
      <div>
        <img src="/images/dzap.svg" alt="" />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        {isConnected && (
          <button onClick={handleModalToggle} className="btn btn--grey" role="button">
            {supported ? (
              <div className="d-flex justify-content-between align-items-center">
                <img className="icon mx-2" src={`images/${supported?.logoUrl}`} alt="" />
                <span>{supported?.name}</span>
              </div>
            ) : (
              "Switch to Supported Chain"
            )}
          </button>
        )}
        <ConnectWalletBtn />
        <NetworkSwitchingModal modalOpen={modalOpen} handleModalClose={handleModalToggle} />
      </div>
    </div>
  );
};

export default Navbar;
