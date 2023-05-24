import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { ACTIONS } from '../../../utils/constants.mjs';
import { collapseIncompleteProjectPicker } from '../actions/settings';

const IncompleteProjectPicker = (props) => {
  const { incompleteProjects, collapseIncompleteProjectPicker } = props;
  const socket = useContext(SocketContext);

  const handleClick = (index) => {
    socket.emit(ACTIONS.SELECT_INCOMPLETE_PROJECT, index);
    collapseIncompleteProjectPicker();
  };

  const renderIncompleteProjectList = () => {
    if (incompleteProjects) {
      return incompleteProjects.map((project) => {
        const { index, playerName, desc, turns } = project;

        return (
          <div
            className='incomplete-project'
            onClick={() => handleClick(index)}>
            <div>Player: {playerName}</div>
            <div>Description: {desc}</div>
            <div>Turn left: {turns}</div>
          </div>
        );
      });
    }
  };

  return (
    <div className='adventure-log-container'>
      <h2>Unfinished projects</h2>
      <hr />
      <div>{renderIncompleteProjectList()}</div>
      <hr />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    incompleteProjects: state.incompleteProject.incompleteProjects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    collapseIncompleteProjectPicker: () => dispatch(collapseIncompleteProjectPicker())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncompleteProjectPicker);
