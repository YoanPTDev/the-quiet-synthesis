import React from 'react';
import InputField from './InputField';

const AdventureLogInput = (props) => (
  <InputField
    {...props}
    placeholder="Add an AdventureLog entry"
    onSave={(value) => {
      const data = {
        type: 'AdventureLog',
        value: value,
      };
      props.onSave(data);
    }}
  />
);

export default AdventureLogInput;