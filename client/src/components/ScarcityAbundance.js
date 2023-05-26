// components/ScarcityAbundance.js

// composant React qui gère l'affichage et l'interaction de deux listes 
// dynamiques : "Scarcities" et "Abundances", permettant aux utilisateurs 
// d'ajouter des éléments, de transférer des éléments entre les listes et de cocher 
// plusieurs éléments pour un transfert en masse, tout en synchronisant ces actions 

// Premiere et seule composante fait majoritairement par Nicolas, avec supervision de Yoan.

// avec un serveur via des sockets.
// Nicolas Drolet (auteur)
// Yoan Poulin Truchon (co-auteur)
// Raphael Lavoie

import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import { SocketContext } from '../middleware/socketcontext';
import { DATA, ACTIONS } from '../../../utils/constants.mjs';
import { motion } from 'framer-motion';

const ScarcityInput = (props) => (
  <InputField
    {...props}
    placeholder='Add a scarcity'
    onSave={(value) => {
      const data = {
        type: DATA.SCARCITY,
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
        type: DATA.ABUNDANCE,
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
        type='checkbox'
        name={item}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={item}
        style={{ marginLeft: '5px' }}>
        {item}
      </label>
      <button
        onClick={() => onTransfer(item)}
        style={{ marginLeft: '5px' }}>
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
      socket.emit(DATA.SAVE_LOG, {
        type: DATA.ABUNDANCE,
        value: item,
        action: ACTIONS.TRANSFER,
      });
    } else {
      setCurrentAbundances(currentAbundances.filter((a) => a !== item));
      setCurrentScarcities([...currentScarcities, item]);
      socket.emit(DATA.SAVE_LOG, {
        type: DATA.SCARCITY,
        value: item,
        action: ACTIONS.TRANSFER,
      });
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
      setCurrentScarcities((prevScarcities) =>
        prevScarcities.filter((s) => s !== item)
      );
      setCurrentAbundances((prevAbundances) => [...prevAbundances, item]);
      socket.emit(DATA.SAVE_LOG, {
        type: DATA.ABUNDANCE,
        value: item,
        action: ACTIONS.TRANSFER,
      });
    });
    setCheckedScarcities([]);

    checkedAbundances.forEach((item) => {
      setCurrentAbundances((prevAbundances) =>
        prevAbundances.filter((a) => a !== item)
      );
      setCurrentScarcities((prevScarcities) => [...prevScarcities, item]);
      socket.emit(DATA.SAVE_LOG, {
        type: DATA.SCARCITY,
        value: item,
        action: ACTIONS.TRANSFER,
      });
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
          onTransfer={() => transferItem(item, source)} // Sert à transferer les items individuellement
          onCheckedChange={(isChecked) =>
            handleCheckedChange(item, isChecked, source)
          } // Mettre en banque pour un éventuel transfert de masse
        />
      ));
    }
    return <div>pas {title}</div>;
  };

  const renderScarcityLogData = () => {
    return renderScarcityAbundanceData(
      currentScarcities,
      'scarcity',
      'scarcity'
    );
  };

  const renderAbundanceLogData = () => {
    return renderScarcityAbundanceData(
      currentAbundances,
      'abundance',
      'abundance'
    );
  };

  return (
    <motion.div
      className='scarcity-abundance-container'
      initial={{ scale: 0.2, opacity: 0, x: "-50%", y: "-50%" }}
      animate={{ scale: [0.2, 1.1, 1.0], opacity: 1, x: "-50%", y: "-50%" }}
      exit={{ scale: 0.2, opacity: 0, x: "-50%", y: "-50%" }}
      transition={{ duration: 0.25 }}
      style={{ position: "absolute", top: "50%", left: "50%" }}
    >
      <h2 className='scarcity-abundance-title'>Scarcities and Abundances</h2>
      <div className='list-scarcities-abundances'>
        <div className='scarcities-section'>
          <fieldset
            style={{ margin: '5px', padding: '5px' }}
            className='list-scarcities'>
            <legend>Scarcities</legend>
            {renderScarcityLogData()}
          </fieldset>
          <div className='scarcities-abundance-input'>
            <ScarcityInput
              onSave={(data) => {
                socket.emit(DATA.SAVE_LOG, data);
              }}
            />
          </div>
        </div>
        <div className='abundances-section'>
          <fieldset
            style={{ margin: '5px', padding: '5px' }}
            className='list-abundances'>
            <legend>Abundances</legend>
            {renderAbundanceLogData()}
          </fieldset>
          <div className='scarcities-abundance-input'>
            <AbundanceInput
              onSave={(data) => {
                socket.emit(DATA.SAVE_LOG, data);
              }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => transferCheckedItems()}
        className='scarcities-abundance-mass-transfer-button'>
        Mass Transfer
      </button>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    scarcities: state.scarcity_abundance.scarcities,
    abundances: state.scarcity_abundance.abundances,
  };
};

export default connect(mapStateToProps)(ScarcityAbundanceLog);
