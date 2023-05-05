import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import { SocketContext } from '../middleware/socketcontext';
import { ABUNDANCE_DATA, SAVE_LOG_DATA, SCARCITY_DATA, TRANSFER } from '../../../utils/constants';

const ScarcityInput = (props) => (
  <InputField
    {...props}
    placeholder='Add a scarcity'
    onSave={(value) => {
      const data = {
        type: SCARCITY_DATA,
        value: value,
      };
      props.onSave(data);
    }}
  />
);

const AbundanceInput = (props) => (
  <InputField
    {...props}
    placeholder='Add an abundance'
    onSave={(value) => {
      const data = {
        type: ABUNDANCE_DATA,
        value: value,
      };
      props.onSave(data);
    }}
  />
);

const ListItem = ({ item, onTransfer, onCheckedChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCheckedChange(item, !isChecked);
  };

  return (
    <div key={item}>
      <input
        type="checkbox"
        name={item}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={item} style={{ marginLeft: '5px' }}>
        {item}
      </label>
      <button onClick={() => onTransfer(item)} style={{ marginLeft: '5px' }}>
        Transfer
      </button>
    </div>
  );
};

const ScarcityAbundanceLog = (props) => {
  const socket = useContext(SocketContext);
  const { scarcities, abundances } = props;

  // Mettre scarcities et abundances à jour au fur et à mesure qu'on en ajoute
  const [currentScarcities, setCurrentScarcities] = useState(scarcities);
  const [currentAbundances, setCurrentAbundances] = useState(abundances);

  useEffect(() => {
    setCurrentScarcities(scarcities);
  }, [scarcities]);

  useEffect(() => {
    setCurrentAbundances(abundances);
  }, [abundances]);

  // Transferer des items d'une liste à l'autre individuellement ===========================
  const transferItem = (item, source) => {
    if (source === 'scarcity') {
      setCurrentScarcities(currentScarcities.filter((s) => s !== item));
      setCurrentAbundances([...currentAbundances, item]);
      socket.emit(SAVE_LOG_DATA, { type: ABUNDANCE_DATA, value: item, action: TRANSFER });
    } else {
      setCurrentAbundances(currentAbundances.filter((a) => a !== item));
      setCurrentScarcities([...currentScarcities, item]);
      socket.emit(SAVE_LOG_DATA, { type: SCARCITY_DATA, value: item, action: TRANSFER });
    }
  };
  // =======================================================================================

  // Transferer plusieurs items en même temps ==============================================
  // Voir quels items sont cochés
  const [checkedScarcities, setCheckedScarcities] = useState([]);
  const [checkedAbundances, setCheckedAbundances] = useState([]);

  const handleCheckedChange = (item, isChecked, source) => {
    if (source === 'scarcity') {
      setCheckedScarcities(
        isChecked
          ? [...checkedScarcities, item]
          : checkedScarcities.filter((s) => s !== item)
      );
    } else {
      setCheckedAbundances(
        isChecked
          ? [...checkedAbundances, item]
          : checkedAbundances.filter((a) => a !== item)
      );
    }
  };

  // Transfert de plusieurs items cochés entre les deux listes
  const transferCheckedItems = () => {
    checkedScarcities.forEach((item) => {
      setCurrentScarcities(prevScarcities => prevScarcities.filter((s) => s !== item));
      setCurrentAbundances(prevAbundances => [...prevAbundances, item]);
      socket.emit(SAVE_LOG_DATA, { type: ABUNDANCE_DATA, value: item, action: TRANSFER });
    });
    setCheckedScarcities([]);
  
    checkedAbundances.forEach((item) => {
      setCurrentAbundances(prevAbundances => prevAbundances.filter((a) => a !== item));
      setCurrentScarcities(prevScarcities => [...prevScarcities, item]);
      socket.emit(SAVE_LOG_DATA, { type: SCARCITY_DATA, value: item, action: TRANSFER });
    });
    setCheckedAbundances([]);
  };
  // =======================================================================================

  const renderScarcityAbundanceData = (list, title, source) => {
    if (list) {
      return list.map((item) => (
        <ListItem
          key={`${item}-${list.indexOf(item)}`}
          item={item}
          onTransfer={() => transferItem(item, source)}     // Sert à transferer les items individuellement
          onCheckedChange={(isChecked) => handleCheckedChange(item, isChecked, source)}   // Mettre en banque pour un éventuel transfert de masse
        />
      ));
    }
    return <div>pas {title}</div>;
  };

  const renderScarcityLogData = () => {
    return renderScarcityAbundanceData(currentScarcities, 'scarcity', 'scarcity');
  };

  const renderAbundanceLogData = () => {
    return renderScarcityAbundanceData(currentAbundances, 'abundance', 'abundance');
  };

  return (
    <div className='scarcity-abundance-container'>
      <h2 className='scarcity-abundance-title'>Scarcities and Abundances</h2>
      <div className='list-scarcities-abundances'>
        <div className='scarcities-section'>
          <fieldset style={{margin: '5px', padding: '5px'}} className='list-scarcities'>
            <legend>Scarcities</legend>
            {renderScarcityLogData()}
          </fieldset>
          <div className='scarcities-abundance-input'>
            <ScarcityInput
              onSave={(data) => {
                socket.emit(SAVE_LOG_DATA, data);
              }}
            />
          </div>
        </div>
        <div className='abundances-section'>
          <fieldset style={{margin: '5px', padding: '5px'}} className='list-abundances'>
            <legend>Abundances</legend>
            {renderAbundanceLogData()}
          </fieldset>
          <div className='scarcities-abundance-input'>
            <AbundanceInput
              onSave={(data) => {
                socket.emit(SAVE_LOG_DATA, data);
              }}
            />
          </div>
        </div>
      </div>
      <button onClick={() => transferCheckedItems()} className='scarcities-abundance-mass-transfer-button'>Mass Transfer</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    scarcities: state.scarcity_abundance.scarcities,
    abundances: state.scarcity_abundance.abundances
  };
};

export default connect(mapStateToProps)(ScarcityAbundanceLog);
