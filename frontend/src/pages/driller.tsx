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
          <h4>Which chords?</h4>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Form>
              <b>Key</b>
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
              <b>Chord Type</b>
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
        <Row>
          <b>Assorted notes:</b>
          <pre>
            {`default scale is major  C       -> C E G
default 7 is dominant   C7      -> C E G Bb
minor is minor          Cm      -> C Eb G
minor 7 is dominant     Cm7     -> C Eb G Bb
major 7 is major 7      Cmaj7   -> C E G B
6 is major 6            C6      -> C E G A
+ is augmented 5        C+7     -> C E G# Bb
m7b5 b3 b5 b7           Cm7b5   -> C Eb Gb Bb
dim7 b3 b5 bb7          Cdim7   -> C Eb Gb A
b5 is flat 5            C7b5    -> C E Gb Bb
9 for small hands       C9      -> E G C D
9 can be replaced by 7  C9 <=> C7
sustain means 3 -> 4    Csus    -> C F G (popular with Uncle Michael songs)
anything above 9 can be ignored


c maj -> c augment (#5)
    as
c min -> c diminish (b5)

augmented chords are composed of 3 major thirds
diminished chords are composed of 4 minor thirds

augmented 7 chords add dominant 7
there are 3 diminished chords and all others can be expressed as inversions`}
          </pre>
        </Row>
      </Container>
    }
  }
}

const DrillerContainer = () => {
  return <Driller />;
};

export default DrillerContainer;
