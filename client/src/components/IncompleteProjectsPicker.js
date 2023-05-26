// components/IncompleteProjectPicker.js
// Ce composant React connecté à Redux 
// affiche les projets en cours et permet de les sélectionner au besoin d'une 
// finition de projet. lorsque le projet est sélectionné, le composante
// se ferme.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { ACTIONS } from '../../../utils/constants.mjs';
import { collapseIncompleteProjectPicker } from '../actions/settings';
import { motion } from 'framer-motion';

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
    <motion.div
      className='adventure-log-container'
      initial={{ scale: 0.2, opacity: 0, x: "-50%", y: "-50%" }}
      animate={{ scale: [0.2, 1.1, 1.0], opacity: 1, x: "-50%", y: "-50%" }}
      exit={{ scale: 0.2, opacity: 0, x: "-50%", y: "-50%" }}
      transition={{ duration: 0.25 }}
      style={{ position: "absolute", top: "50%", left: "50%" }}
    >
      <h2>Unfinished projects</h2>
      <hr />
      <div>{renderIncompleteProjectList()}</div>
      <hr />
    </motion.div>
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
