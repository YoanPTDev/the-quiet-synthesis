// components/CompleteProjectInputWrapper.js
// Ce composant React connecté à Redux 
// affiche un textAreaField qui prends la description d'une action
// ou d'un projet démarré qui doit être complété et sauvegardé
// dans le back end à l'aide d'un emit avec le socket.
// Le wrapper l'affichant est dans le même fichier
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import TextAreaField from './TextAreaField';
import { ACTIONS } from '../../../utils/constants.mjs';
import { collapseCompleteProjectInput } from '../actions/settings';

const CompleteProjectInput = ({ onSave }) => (
  <TextAreaField
    placeholder='Describe how this project ended...'
    onSave={(value) => {
      if (value !== '') {
        onSave(value);
      }
    }}
  />
);

const CompleteProjectInputWrapper = (props) => {
  const { dispatch, completeProjectInputExpanded, firstProjectDescription } = props;
  const socket = useContext(SocketContext);

  if (!completeProjectInputExpanded) return null;

  return (
    <div className='input-container centered-column'>
      <CompleteProjectInput
        onSave={(description) => {
          if (description !== '') {
            const data = description;
            socket.emit(ACTIONS.COMPLETE_PROJECT, data);
            dispatch(collapseCompleteProjectInput());
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    completeProjectInputExpanded: state.settings.completeProjectInputExpanded,
  };
};

export default connect(mapStateToProps)(CompleteProjectInputWrapper);
