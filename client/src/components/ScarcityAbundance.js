import React, { useContext } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import { SocketContext } from '../middleware/socketcontext';

const ScarcityInput = (props) => (
  <InputField
    {...props}
    placeholder='Add a scarcity'
    onSave={(value) => {
      const data = {
        type: 'Scarcity',
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
        type: 'Abundance',
        value: value,
      };
      props.onSave(data);
    }}
  />
);

const ScarcityAbundanceLog = (props) => {
  const socket = useContext(SocketContext);
  const {scarcity, abundance} = props;

  const renderScarcityLogData = () => {
    if (scarcity) {
      return <div>scarcity</div>;
    }
    return <div>pas scarcity</div>
  };

  const renderAbundanceLogData = () => {
    if (abundance) {
      return <div>abundance</div>;
    }
    return <div>pas abundance</div>
  };

  return (
    <div className='scarcity-abundance-container'>
      <h2>Scarcities and Abundances</h2>
      <div className='list-scarcities-abundances'>
        <div className='scarcities-abundances'>
          {renderScarcityLogData()}
          <ScarcityInput
            onSave={(data) => {
              socket.emit('saveData', data);
            }}
          />
        </div>
        <div className='list-abundances'>
          {renderAbundanceLogData()}
          <AbundanceInput
            onSave={(data) => {
              socket.emit('saveData', data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    scarcities: state.scarcity.scarcities,
    abundances: state.abundance.abundances
  };
};

export default connect(mapStateToProps)(ScarcityAbundanceLog);
