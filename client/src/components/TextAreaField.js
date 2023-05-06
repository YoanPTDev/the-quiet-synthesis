import React, { useState } from 'react';
import { connect } from 'react-redux';

const TextAreaField = ({ placeholder, onSave, value, collapse }) => {
  const [inputValue, setInputValue] = useState(value || '');

  console.log(collapse);

  const handleSave = () => {
    if (onSave) {
      onSave(inputValue);
      setInputValue('');
    }

    if(collapse) {
      collapse();
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      handleSave();
    }
  };

  return (
    <>
      <textarea
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button onClick={handleSave}>Submit</button>
    </>
  );
};

export default connect()(TextAreaField);
