import person from '../assets/person.png';
import plus from '../assets/plus.png';

const PriceList = ({ price1 = '100zł', price2 = '60zł/osoba', price3 = '120zł/grupa' }) => {
  // Casting style to React.CSSProperties
  const priceListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
    marginTop: '20px',
    border: '1px solid #800020',
    borderRadius: '5px',
    padding: '20px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px',
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
  };

  const leftColumnStyle: React.CSSProperties = {
    ...columnStyle,
    paddingLeft: '20px',
  };

  const smallImageStyle: React.CSSProperties = {
    width: '30px',
    height: 'auto',
  };

  const textStyle: React.CSSProperties = {
    color: 'darkgreen',
    fontWeight: 'bold',
  };

  return (
    <div style={priceListStyle}>
      <div style={rowStyle}>
        {/* First column: One person with left padding */}
        <div style={leftColumnStyle}>
          <img src={person} alt="Person 1" style={smallImageStyle} />
        </div>

        {/* Second column: Two persons side by side */}
        <div style={columnStyle}>
          <img src={person} alt="Person 1" style={smallImageStyle} />
          <img src={person} alt="Person 2" style={{ ...smallImageStyle, marginLeft: '-5px' }} />
        </div>

        {/* Third column: Two persons and a plus sign */}
        <div style={columnStyle}>
          <img src={person} alt="Person 1" style={smallImageStyle} />
          <img src={person} alt="Person 2" style={{ ...smallImageStyle, marginLeft: '-5px' }} />
          <img src={plus} alt="Plus sign" style={{ ...smallImageStyle, marginLeft: '5px' }} />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={leftColumnStyle}><span style={textStyle}>{price1}</span></div>
        <div style={columnStyle}><span style={textStyle}>{price2}</span></div>
        <div style={columnStyle}><span style={textStyle}>{price3}</span></div>
      </div>
    </div>
  );
};

export default PriceList;
