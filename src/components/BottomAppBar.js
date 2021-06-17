import "../styles/components/BottomAppBar.css";

const BottomAppBar = ({ openModal }) => {
  return (
    <div className="bottom-bar">
      {/* <div className="slider"></div> */}
      <div className="tabs">
        <div className="tab tab--left">
          <span className="material-icons">menu</span>
        </div>
        <div className="tab tab--fab">
          <div className="top">
            <span className="fab material-icons" onClick={openModal}>
              add
            </span>
          </div>
        </div>
        <div className="tab tab--right">
          <span className="material-icons">more_vert</span>
        </div>
      </div>
    </div>
  );
};

export default BottomAppBar;
