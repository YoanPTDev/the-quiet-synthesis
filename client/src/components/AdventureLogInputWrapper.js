import React, {useContext} from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../middleware/socketcontext';
import { collapseAdventureLogInput } from '../actions/settings';
import TextAreaField from "./TextAreaField";
import { ADVENTURE_LOG_DESCRIPTION, SAVE_LOG_DATA } from "../../../utils/constants.mjs";

const AdventureLogInput = (props) => (
  <TextAreaField
    {...props}
    placeholder="Add an AdventureLog entry"
    onSave={(value) => {
      const data = {
        type: ADVENTURE_LOG_DESCRIPTION,
        value: value,
      };
      props.onSave(data);
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