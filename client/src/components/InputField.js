// components/InputField.js
// c'est un champ de saisie textuelle React qui accepte une valeur par
// défaut et un texte indicatif (placeholder), qui sauvegarde la valeur de
// l'input quand on appuie sur 'Entrée' ou sur le bouton '
// Submit', et qui réinitialise le champ après la sauvegarde.
// C'est un component utilitaire et facilement réutilisable.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React, { useState } from 'react';

const InputField = ({ placeholder, onSave, value }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleSave = () => {
    if (inputValue !== '') {
      if (onSave) {
        onSave(inputValue);
        setInputValue('');
      }
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // flexDirection: 'column',
          alignItems: 'center',
        }}>
        <input
          type='text'
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button onClick={handleSave}>Submit</button>
      </div>
    </>
  );
};

export default InputField;
