import React, { useState } from 'react';
import { connect } from 'react-redux';

const InputField = ({ placeholder, onSave, value }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleSave = () => {
    if (onSave) {
      onSave(inputValue);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button onClick={handleSave}>Submit</button>
    </>
  );
};

export default connect()(InputField);
