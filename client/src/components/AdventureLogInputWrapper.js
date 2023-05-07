import React, {useContext} from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { collapseAdventureLogInput } from '../actions/settings';
import TextAreaField from "./TextAreaField";
import { DESCRIPTION, SAVE_LOG_DATA } from "../../../utils/constants.mjs";

const AdventureLogInput = (props) => (
  <TextAreaField
    {...props}
    placeholder="Add a description to your action..."
    onSave={(value) => {
      if (value !== '') {
        const data = {
          type: DESCRIPTION,
          value: value,
        };
        props.onSave(data);
      }
    }}
    collapse={props.collapse}
  />
);

const AdventureLogInputWrapper = (props) => {
  const { dispatch, adventureLogInputExpanded } =
    props;

    if(!adventureLogInputExpanded) return null;

    const socket = useContext(SocketContext);

    return (
      <div>
        <AdventureLogInput 
        onSave={(data) => {
          console.log('sending description data', data);
          socket.emit(SAVE_LOG_DATA, data);
        }}
        collapse={() => dispatch(collapseAdventureLogInput())}
        />
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    adventureLogInputExpanded: state.settings.adventureLogInputExpanded,
  };
};

export default connect(mapStateToProps)(AdventureLogInputWrapper);