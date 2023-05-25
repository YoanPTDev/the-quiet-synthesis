// components/Notebook.js
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import InputField from './InputField';
import { SocketContext } from '../middleware/socketcontext';
import { DATA } from '../../../utils/constants.mjs';
import { motion } from 'framer-motion';

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
    <motion.div
      className='notebook-container'
      initial={{ scale: 0.2, opacity: 0, x: "-50%", y: "-50%" }}
      animate={{ scale: [0.2, 1.1, 1.0], opacity: 1, x: "-50%", y: "-50%" }}
      exit={{ scale: 0.2, opacity: 0, x: "-50%", y: "-50%" }}
      transition={{ duration: 0.25 }}
      style={{ position: "absolute", top: "50%", left: "50%" }}
    >
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
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.note.notes,
  };
};

export default connect(mapStateToProps)(Notebook);
