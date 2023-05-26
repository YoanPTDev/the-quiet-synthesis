// components/TextAreaField.js
//  composant React qui fournit un champ de saisie de texte de type 
// 'textarea' avec des fonctionnalités telles que la possibilité de sauvegarder 
// l'entrée, de réinitialiser le champ après la sauvegarde, de réagir 
// à la combinaison de touches 'Shift + Enter' pour sauvegarder et de 
// replier le champ.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useState } from 'react';
import { connect } from 'react-redux';

const TextAreaField = ({ placeholder, onSave, value, collapse }) => {
  const [inputValue, setInputValue] = useState(value || '');

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
