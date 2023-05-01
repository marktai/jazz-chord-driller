import React, { useState } from 'react';
import CloverService, { GameType } from '../api';
import NameChord from './nameChord';

const chords = [
  'Ab',
  'A',
  'Bb',
  'B',
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
];

const modifiers = [
  '',
  '7',
  'maj7',
  '+7',
  'm',
  'm7',
  'dim7',
  'm7b5',
  '6',
  '9',
];

function generateRandomChord(): string {
  let chord = chords[Math.floor(Math.random() * chords.length)];
  let modifier = modifiers[Math.floor(Math.random() * modifiers.length)];

  return `${chord}${modifier}`;
}

type DrillerState = {
  chord: string,
};

export class Driller extends React.Component<{}, DrillerState> {
  state: DrillerState = {
    chord: generateRandomChord(),
  };

  render() {
    if (this.state.chord === null){
      return <div> <img className="loader" src="https://www.marktai.com/download/54689/ZZ5H.gif"/> </div>
    } else {
      return <div>
        <button className={"btn btn-primary"} onClick={() => {this.setState({chord: generateRandomChord()})}}>New Chord!</button>
        <NameChord chord={this.state.chord}/>
      </div>
    }
  }
}

const DrillerContainer = () => {
  return <Driller />;
};

export default DrillerContainer;
