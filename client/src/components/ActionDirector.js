// components/ActionDirector.js
// Ce composant React connecté à Redux 
// affiche des instructions ou des directions à partir du store
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

const ActionDirector = ({ directions, font }) => {
  if(directions === undefined) return null;
  return (
    <motion.div
      className='unclickable action-director-container'
      style={{ position: "absolute", top: "12%"}}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ 
        opacity: [0.4, 0.6, 0.4],
        scale: [1, 1.1, 1],
        transition: { repeat: Infinity, duration: 5 }
      }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.5 } }}
    >
      <div className={`action-director ${font === 'small-direction' ? 'small-direction' : ''}`}>{directions}</div>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    directions: state.direction.directions,
    font: state.direction.font,
  };
};

export default connect(mapStateToProps)(ActionDirector);
