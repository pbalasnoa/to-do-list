const DropdownMenu = (props) => {
  const { setOpen, items, classes } = props;

  return (
    <div
      className={`dropdown-background`}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div className={`dropdown ${classes}`}>
        {items.map((item) => (
          <div
            className="menu-item align-left-box"
            onClick={() => item[`${item.nameItem}`]()}
            key={item.nameItem}
          >
            <div className="box-icon align-center-box">
              <span className="material-icons icon">{item.icon}</span>
            </div>
            <p className="text--400 --margin-left p-0_5">{item.nameItem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
