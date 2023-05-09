import React, {useContext} from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { collapseDiscussionInput } from '../actions/settings';
import TextAreaField from "./TextAreaField";
import { DISCUSSION_DATA } from "../../../utils/constants.mjs";

const DiscussionInput = (props) => (
  <TextAreaField
    {...props}
    placeholder="Discuss..."
    onSave={(value) => {
      const data = value;
      props.onSave(data);
    }}
    collapse={props.collapse}
  />
);

const DiscussionInputWrapper = (props) => {
  const { dispatch, discussionInputExpanded } =
    props;

    if(!discussionInputExpanded) return null;

    const socket = useContext(SocketContext);

    return (
      <div className='input-container'>
        <DiscussionInput 
        onSave={(data) => {
          socket.emit(DISCUSSION_DATA, data);
        }}
        collapse={() => dispatch(collapseDiscussionInput())}
        />
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    discussionInputExpanded: state.settings.discussionInputExpanded,
  };
};

export default connect(mapStateToProps)(DiscussionInputWrapper);