import React from 'react';
import { connect } from 'react-redux';
import IncompleteProjectPicker from './IncompleteProjectsPicker';
import { collapseIncompleteProjectPicker, expandIncompleteProjectPicker } from '../actions/settings';
import { addRipple } from '../animations';

const IncompleteProjectsPickerWrapper = (props) => {
  const { incompleteProjectPickerExpanded, expandIncompleteProjectPicker, collapseIncompleteProjectPicker } =
    props;

  const toggleIncompleteProjectsPicker = () => {
    if (incompleteProjectPickerExpanded) {
      collapseIncompleteProjectPicker();
    } else {
      expandIncompleteProjectPicker();
    }
  };

  return (
    <div>
      <button onClick={(event) => {addRipple(event, "var(--log-button)"); toggleIncompleteProjectsPicker();}} className='menu-button adv-button'>
        <div className='adv-button-icon'></div>
      </button>
      {incompleteProjectPickerExpanded && <IncompleteProjectPicker />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    incompleteProjectPickerExpanded: state.settings.incompleteProjectPickerExpanded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    expandIncompleteProjectPicker: () => dispatch(expandIncompleteProjectPicker()),
    collapseIncompleteProjectPicker: () => dispatch(collapseIncompleteProjectPicker()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncompleteProjectsPickerWrapper);
