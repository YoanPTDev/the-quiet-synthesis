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
      return notes.map((note) => <li key={note.id}>{note.value}</li>);
    }
  };

  return (
    <div className='notebook-container'>
      <h2>Notebook</h2>
      <hr />
      <ul className='list-note'>
        {renderNotebookData()}
      </ul>
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
