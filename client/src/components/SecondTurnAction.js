import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { actionDiscovery, actionDiscussion, actionProject } from '../actions/secondTurn';

const SecondTurnAction = ({
  actionDiscovery,
  actionDiscussion,
  actionProject,
  secondTurnActionExpanded,
  collapseSecondTurnAction,
}) => {
  const handleClick = (choice) => {
    if(choice === 'Start a project') {
      actionProject();
    }
    else if (choice === 'Discover something new') {
      actionDiscovery();
    }
    else {
      actionDiscussion();
    }

    dispatch(collapseSecondTurnAction());
  };

  if (!secondTurnActionExpanded) return null;

  return (
    <div>
      <button
        onClick={() => handleClick('Start a project')}
        style={{ marginLeft: '10px' }}>
        Start a project
      </button>
      <button
        onClick={() => handleClick('Discover something new')}
        style={{ marginLeft: '10px' }}>
        Discover something new
      </button>
      <button
        onClick={() => handleClick('Start a discussion')}
        style={{ marginLeft: '10px' }}>
        Start a discussion
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { secondTurnActionExpanded: state.settings.secondTurnActionExpanded };
};

const mapDispatchToProps = (dispatch, props) => {
  const { socket } = props;
  return {
    actionDiscovery: () => dispatch(actionDiscovery(socket)),
    actionDiscussion: () => dispatch(actionDiscussion(socket)),
    actionProject: () => dispatch(actionProject(socket)),
  };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

const ConnectedSecondTurnAction = componentConnector(SecondTurnAction);

const SecondTurnActionWrapper = (props) => {
  const socket = useContext(SocketContext);
  return (
    <ConnectedSecondTurnAction
      {...props}
      socket={socket}
    />
  );
};

export default SecondTurnActionWrapper;
