import Loader from "./Loader";

const Modal = ({ loading, handleModalClose, modalOpen, modalTitle, modalBody }) => {
  return (
    modalOpen && (
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(33, 37, 41, 0.8)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          {!loading ? (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" onClick={handleModalClose} className="btn-close"></button>
              </div>
              <div className="modal-body">{modalBody}</div>
            </div>
          ) : (
            <Loader size={25} loading={loading} />
          )}
        </div>
      </div>
    )
  );
};

export default Modal;
