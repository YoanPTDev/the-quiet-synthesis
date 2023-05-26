// components/DiscussionInputWrapper.js
// Ce composant React connecté à Redux 
// affiche un textAreaField qui prends une discussion et sauvegarde 
// celle-ci dans le back end à l'aide d'un emit avec le socket.
// Le wrapper l'affiche au click
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { collapseDiscussionInput } from '../actions/settings';
import TextAreaField from './TextAreaField';
import { DATA } from '../../../utils/constants.mjs';

const DiscussionInput = (props) => (
  <TextAreaField
    {...props}
    placeholder='Discuss...'
    onSave={(value) => {
      const data = value;
      props.onSave(data);
    }}
    collapse={props.collapse}
  />
);

const DiscussionInputWrapper = (props) => {
  const { dispatch, discussionInputExpanded } = props;

  if (!discussionInputExpanded) return null;

  const socket = useContext(SocketContext);

  return (
    <div className='input-container centered-column'>
      <DiscussionInput
        onSave={(data) => {
          socket.emit(DATA.DISCUSSION, data);
        }}
        collapse={() => dispatch(collapseDiscussionInput())}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    discussionInputExpanded: state.settings.discussionInputExpanded,
  };
};

export default connect(mapStateToProps)(DiscussionInputWrapper);
