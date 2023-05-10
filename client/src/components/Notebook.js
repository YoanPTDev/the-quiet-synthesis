// components/Notebook.js
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import { SocketContext } from '../middleware/socketcontext';
import { DATA } from '../../../utils/constants.mjs';

const NotebookInput = (props) => (
  <InputField
    {...props}
    placeholder='Add a Notebook entry'
    onSave={(value) => {
      if (value !== '') {
        const data = {
          type: DATA.NOTE,
          value: value,
        };
        props.onSave(data);
      }
    }}
  />
);

const Notebook = (props) => {
  const { notes } = props;
  const socket = useContext(SocketContext);

  const renderNotebookData = () => {
    if (notes) {
      return notes.map((note) => <li key={note.id}>{note.value}</li>);
    }
  };

  return (
    <div className='notebook-container'>
      <h2>Notebook</h2>
      <hr />
      <ul className='list-note'>{renderNotebookData()}</ul>
      <hr />
      <NotebookInput
        onSave={(data) => {
          socket.emit(DATA.SAVE_LOG, data);
        }}
      />
      <hr />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.note.notes,
  };
};

export default connect(mapStateToProps)(Notebook);
