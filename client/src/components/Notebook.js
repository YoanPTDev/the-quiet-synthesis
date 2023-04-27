// components/Notebook.js
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import NotebookInput from './NotebookInput';
import { SocketContext } from '../middleware/socketcontext';

const Notebook = (props) => {
  const { notebookData } = props;
  const socket = useContext(SocketContext);

  const renderNotebookData = () => {
    if (notebookData) {
      return notebookData.map((data, index) => <p key={index}>{data.value}</p>);
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
    notebookData: state.note.data,
  };
};

export default connect(mapStateToProps)(Notebook);
