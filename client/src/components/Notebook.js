// components/Notebook.js
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import NotebookInput from './NotebookInput';
import { SocketContext } from '../middleware/socketcontext';

const Notebook = (props) => {
  const { notes } = props;
  const socket = useContext(SocketContext);

  const renderNotebookData = () => {
    if (notes) {
      return notes.map((note) => <p key={note.id}>{note.value}</p>);
    }
  };

  return (
    <div className='notebook-container'>
      <h2>Notebook</h2>
      <hr />
      {renderNotebookData()}
      <hr />
      <NotebookInput
        onSave={(data) => {
          console.log('data', data);
          socket.emit('saveData', data);
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
