import React from 'react';
import { connect } from 'react-redux';

const IncompleteProjectPicker = (props) => {
  const { incompleteProjects } = props;

  const renderIncompleteProjectList = () => {
    if (incompleteProjects) {
      return incompleteProjects.map((project) => {
        const { index, playerName, desc, turns } = project;

        return (
          <div>
            <div>{index}</div>
            <div>{playerName}</div>
            <div>{desc}</div>
            <div>{turns}</div>
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

export default connect(mapStateToProps)(IncompleteProjectPicker);
