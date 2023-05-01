import React, { useState } from 'react';
import CloverService, { GameType } from '../api';
import {Container, Row, Col, List, Form} from 'react-bootstrap';
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

type DrillerState = {
  chord: null | string,
  chordChoices: Array<[string, boolean]>,
  modifierChoices: Array<[string, boolean]>,
};

export class Driller extends React.Component<{}, DrillerState> {
  state: DrillerState = {
    chord: null,
    chordChoices: chords.map(chord => { return [chord, true] }),
    modifierChoices: modifiers.map(modifier => { return [modifier, true] }),
  };

  generateRandomChord(): string {
    let allowedChords = this.state.chordChoices.filter( chordChoice => chordChoice[1] ).map( chordChoice => chordChoice[0] );
    let allowedModifiers = this.state.modifierChoices.filter( modifierChoice => modifierChoice[1] ).map( modifierChoice => modifierChoice[0] );
    let chord = allowedChords[Math.floor(Math.random() * allowedChords.length)];
    let modifier = allowedModifiers[Math.floor(Math.random() * allowedModifiers.length)];

    return `${chord}${modifier}`;
  }

  componentDidMount() {
    this.setState({chord: this.generateRandomChord()});
  }

  render() {
    if (this.state.chord === null){
      return <div> <img className="loader" src="https://www.marktai.com/download/54689/ZZ5H.gif"/> </div>
    } else {

      console.log(this.state.chordChoices);
      return <Container>
        <Row>
          <button className={"btn btn-primary"} onClick={() => {this.setState({chord: this.generateRandomChord()})}}>New Chord!</button>
        </Row>
        <Row>
          <NameChord chord={this.state.chord}/>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Form>
              Key
              { this.state.chordChoices.map((chordChoice, index) =>
                <Form.Check
                  type={'checkbox'}
                  key={chordChoice[0]}
                  id={chordChoice[0]}
                  label={chordChoice[0]}
                  checked={chordChoice[1]}
                  onChange={(evt) => {
                    let newChordChoices = JSON.parse(JSON.stringify(this.state.chordChoices));
                    newChordChoices[index][1] = evt.target.checked;
                    this.setState({
                      ...this.state,
                      chordChoices: newChordChoices,
                    });
                  }}>
                </Form.Check>
              )}
            </Form>
          </Col>

          <Col xs={12} md={4}>
            <Form>
              Chord Type
              { this.state.modifierChoices.map((modifierChoice, index) =>
                <Form.Check
                  type={'checkbox'}
                  key={modifierChoice[0]}
                  id={modifierChoice[0]}
                  label={modifierChoice[0] === '' ? 'maj': modifierChoice[0]}
                  checked={modifierChoice[1]}
                  onChange={(evt) => {
                    let newModifierChoices = JSON.parse(JSON.stringify(this.state.modifierChoices));
                    newModifierChoices[index][1] = evt.target.checked;
                    this.setState({
                      ...this.state,
                      modifierChoices: newModifierChoices,
                    });
                  }}>
                </Form.Check>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    }
  }
}

const DrillerContainer = () => {
  return <Driller />;
};

export default DrillerContainer;
