import "../styles/components/BottomAppBar.css";

const BottomAppBar = ({ openModal, openModalOptions }) => {
  return (
    <div className="bottom-bar icon">
      <div className="tabs">
        <div className="tab tab--left">
          <span className="material-icons">menu</span>
        </div>
        <div className="tab tab--fab">
          <div className="top">
            <span className="fab material-icons --pointer" onClick={openModal}>
              add
            </span>
          </div>
        </div>
        <div className="tab tab--right">
          <span className="material-icons --pointer" onClick={openModalOptions}>
            more_vert
          </span>
        </div>
      </div>
    </div>
  );
};

export default BottomAppBar;
