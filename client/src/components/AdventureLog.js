// components/AdventureLog.js
// Ce composant React connecté à Redux 
// affiche les informations en lien avec les actions passés dans la partie.
// Yoan Poulin Truchon (auteur)
// Raphael Lavoie
// Nicolas Drolet

import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';

const diceNum = {
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
};

const AdventureLog = (props) => {
  const { logs } = props;

  const renderAdventureLogData = () => {
    if (logs) {
      return logs.map((log) => {
        const { weekNb, playerId, promptChosen, actions, completedProjects } =
          log;
        console.log('completedProjects', completedProjects);

        return (
          <div
            key={weekNb}
            className='single-log'>
            <div className='single-log-title'>
              <strong>Week {weekNb}</strong>
              <p className='single-log-player'>
                {playerId ? playerId : 'an unknown player'}
              </p> 
            </div>
            <div className='single-log-infos'>
              
              <p className='single-log-prompt'>
                {promptChosen}
                <div className='log-card-icon'></div>
              </p>
              {actions.map((action, index) => {
                const { type, tokens, turns, description, discussion } = action;

                return (
                  <div
                    key={`${weekNb}-${index}`}
                    className={`action-${index}`}>
                    {index === 1 && (<div className='action-1-title'>Second Action</div>)}
                    <div className={`action-${index}-type`}>
                      {type}{' '}
                      {type === 'Start Project' && turns === 0 && (
                        <strong>COMPLETED</strong>
                      )}
                    </div>
                    {tokens > 0 && (
                      <div>
                        <strong>Contempt token{tokens > 1 ? 's' : ''}:</strong>{' '}
                        {tokens}
                      </div>
                    )}

                    <div>
                      {discussion !== undefined && (
                        <>
                          {discussion.map(({ player, statement }, index) => (
                            <div key={index}>
                              <div>
                                <strong>{player}: </strong>
                                {statement}
                              </div>
                            </div>
                          ))}
                          <strong></strong>
                        </>
                      )}
                      {discussion === undefined && (
                        <>
                          <div className={`action-${index}-specifics`}>{description}</div> 
                        </>
                      )}
                    </div>
                    {turns > 0 && (
                      <div>
                        <strong>Ready in: </strong>
                        {turns > 6 && (
                          <img
                            className='dice-adventure-log'
                            src={diceNum[6]}
                            alt={`Dice with number 6`}
                          />
                        )}
                        <img
                          className='dice-adventure-log'
                          src={diceNum[turns > 6 ? turns - 6 : turns]}
                          alt={`Dice with number ${
                            turns > 6 ? turns - 6 : turns
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            
              <br />
              {completedProjects.length > 0 && (
                <div>
                  <div className='centered-column'>
                    <h3>Project completed this week!</h3>
                  </div>
                  {completedProjects.map(
                    ({ orgDesc, endDesc, orgPlayer, endPlayer }, index) => (
                      <div key={index}>
                        <hr />
                        <div>
                          <strong>{orgPlayer}: </strong>
                          {orgDesc}
                        </div>
                        <div>
                          <strong>{endPlayer}: </strong>
                          {endDesc}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        );
      });
    }
  };

  return (
    <motion.div
      className='adventure-log-container'
      initial={{ scale: 0.2, opacity: 0, x: '-50%', y: '-50%' }}
      animate={{ scale: [0.2, 1.1, 1.0], opacity: 1, x: '-50%', y: '-50%' }}
      exit={{ scale: 0.2, opacity: 0, x: '-50%', y: '-50%' }}
      transition={{ duration: 0.25 }}
      style={{ position: 'absolute', top: '50%', left: '50%' }}>
      <h2>Adventure Log</h2>
      <hr />
      <div className='list-log'>{renderAdventureLogData()}</div>
      <hr />
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    logs: state.log.logs,
  };
};

export default connect(mapStateToProps)(AdventureLog);
