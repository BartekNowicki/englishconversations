import React from 'react';
import person from '../assets/person.png';
import plus from '../assets/plus.png';

const PriceList = ({ price1 = '100zł', price2 = '60zł/osoba', price3 = '120zł/grupa' }) => {
  const priceListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',  // Adjust gap between rows
    marginTop: '20px',  // Top margin for the whole PriceList
    border: '1px solid #800020',  // Thin burgundy border
    borderRadius: '5px',
    padding: '20px',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',  // Space between columns
    padding: '0px',  // Padding inside each row
  };

  const columnStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',  // Centers the content inside each column
    padding: '0px',  // Padding inside each cell
  };

  const leftColumnStyle = {
    ...columnStyle,
    paddingLeft: '20px',  // Left padding for the first column only
  };

  const smallImageStyle = {
    width: '30px',  // Set the size of the image to 30px
    height: 'auto', // Maintain aspect ratio
  };

  const textStyle = {
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
        <div style={columnStyle}><span style={textStyle}>{price3}&nbsp;&nbsp;</span></div>
      </div>
    </div>
  );
};

export default PriceList;
