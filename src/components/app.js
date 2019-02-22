import React, {Component} from 'react';
import elements from '../elements.json';
import '../style/app.scss';

function getElementDiv(groupBlock, atomicNumber, symbol, onFocus) {
  return (
    <div
      onMouseEnter={onFocus}
      onClick={onFocus}
      className={groupBlock.replace(/\s+/g, '-').toLowerCase()}
    >
      <span className="atomic-number">{atomicNumber}</span>
      <span className="atomic-symbol">{symbol}</span>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    const elementIndex = elements.reduce((obj, itm) => {
      obj[itm.atomicNumber] = itm;
      return obj;
    }, {});

    this.state = {
      selectedElement: elementIndex[1],
      elementIndex,
    };
  }

  updateSelectedElement = index => {
    this.setState({selectedElement: this.state.elementIndex[index]});
  };

  render() {
    const {
      selectedElement: {name, atomicMass, atomicRadius, standardState, yearDiscovered},
    } = this.state;

    const tableHeader = (
      <div className="grid__item--banner">
        <h1>Periodic Table</h1>
      </div>
    );
    const tableSpan = <div className="grid__item--span" />;
    const tableSpace = <div className="grid__item--space" />;
    const partialSpan = <div className="grid__item--partial" />;
    const emptyRow = <div className="grid__item--row" />;
    const selectionArea = (
      <div className="grid__item--area">
        <h2>{name}</h2>
        <ul style={{alignSelf: 'flex-start'}}>
          <li>{`Atomic Mass: ${atomicMass}`}</li>
          <li>{`Atomic Radius: ${atomicRadius}`}</li>
          <li>{`Year Discovered: ${yearDiscovered}`}</li>
          {standardState && <li>{`State: ${standardState}`}</li>}
        </ul>
      </div>
    );
    const table = [];
    const lanthanides = [];
    const actinides = [];

    elements.forEach(({symbol, atomicNumber, groupBlock}) => {
      if (atomicNumber >= 57 && atomicNumber <= 71) {
        if (atomicNumber === 57) {
          table.push(getElementDiv('lanthanoid', '', '57-71'));
        }
        lanthanides.push(
          getElementDiv(groupBlock, atomicNumber, symbol, () =>
            this.updateSelectedElement(atomicNumber)
          )
        );
      } else if (atomicNumber >= 89 && atomicNumber <= 103) {
        if (atomicNumber === 89) {
          table.push(getElementDiv('actinoid', '', '89-103'));
        }
        actinides.push(
          getElementDiv(groupBlock, atomicNumber, symbol, () =>
            this.updateSelectedElement(atomicNumber)
          )
        );
      } else {
        table.push(
          getElementDiv(groupBlock, atomicNumber, symbol, () =>
            this.updateSelectedElement(atomicNumber)
          )
        );
      }
    });

    table.splice(1, 0, tableHeader);

    table.splice(5, 0, tableSpan);
    table.splice(6, 0, selectionArea);
    table.splice(7, 0, tableSpace);

    table.splice(16, 0, tableSpan);
    table.splice(17, 0, tableSpace);

    table.splice(18 * 5 + 13, 0, emptyRow);
    table.push(partialSpan);
    table.push(...lanthanides);
    table.push(partialSpan);
    table.push(...actinides);

    return (
      <div className="grid-container">
        <div className="grid">{table}</div>
      </div>
    );
  }
}

export default App;
