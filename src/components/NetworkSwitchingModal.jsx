import supportedChains from "../config/supportedChains.json";
import Modal from "./common/Modal";
import { toastError } from "../utils/toastWrapper";
import { switchNetwork } from "wagmi/actions";

const NetworkSwitchingModal = ({ handleModalClose, modalOpen }) => {
  const handleNetworkSwitch = async (chainId) => {
    try {
      await switchNetwork({ chainId: parseInt(chainId) });
      handleModalClose();
    } catch (error) {
      handleModalClose();
      error.shortMessage && toastError(error.shortMessage);
    }
  };

  // Needs to add network

  const modalBody = () => {
    return (
      <div className="chain-popup__form">
        {Object.keys(supportedChains).map((chainId, index) => {
          return (
            <div
              key={index}
              onClick={async () => await handleNetworkSwitch(chainId)}
              className="chain-popup__item"
            >
              <img
                src={`/images/${supportedChains[chainId].logoUrl}`}
                alt={supportedChains[chainId].name}
                className="chain-icon"
              />
              <div className="SwitchNetworkItem_name__2pWLA">{supportedChains[chainId].name}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Modal
      modalBody={modalBody()}
      modalTitle={"Choose Network"}
      handleModalClose={handleModalClose}
      modalOpen={modalOpen}
    />
  );
};

export default NetworkSwitchingModal;
