import React from 'react';
import InputField from './InputField';

const NotebookInput = (props) => (
  <InputField
    {...props}
    placeholder="Add a Notebook entry"
    onSave={(value) => {
      const data = {
        type: 'Notebook',
        value: value,
      };
      props.onSave(data);
    }}
  />
);

export default NotebookInput;