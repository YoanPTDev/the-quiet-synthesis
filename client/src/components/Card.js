import React from 'react';
import { connect } from 'react-redux';

const Card = ({ cards }) => {
  if (!cards[0]) return null;

  const { _id, value, suit, season, } = cards[0];
};
