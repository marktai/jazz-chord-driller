import React from 'react';
import CloverService from '../api';
import { GameType } from '../api';
import {Container, Row, Col, List, Button} from 'react-bootstrap';
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

type NameChordProps = {
  chord: string,
};

type NameChordState = {
  revealed: boolean,
  nextToggleEnable: number,
};

class NameChord extends React.Component<NameChordProps, NameChordState> {
  state: NameChordState = {
    // games: null,
    revealed: false,
    nextToggleEnable: 0,
  };

  toggleRevealed() {
    this.setState({
      ...this.state,
      nextToggleEnable: Date.now() + 100,
      revealed: !this.state.revealed,
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      if (!event.repeat && Date.now() > this.state.nextToggleEnable) {

        console.log(event);
        this.toggleRevealed();
      }
    }, false);
  }

  componentDidUpdate(prevProps: NameChordProps) {
    if (prevProps.chord != this.props.chord) {
      this.setState({
        ...this.state,
        revealed: false,
      });
    }
    console.log(this.props.chord);
  }

  chordNameImageLink() {
    return `/static2/chord-name/chord-${encodeURIComponent(this.props.chord)}.png`;
  }

  fullImageLink() {
    return `/static2/full/${encodeURIComponent(this.props.chord)}.png`;
  }

  render() {
    // const [gamesWithoutClues, gamesWithClues] = [
    //   (this.state.games ?? []).filter((g) => g.clues === null),
    //   (this.state.games ?? []).filter((g) => g.clues !== null),
    // ].map((NameChord) => NameChord.map(
    //   (game: GameType, i: number) => {
    //     let text = game.clues === null ?
    //       `Game ${game.id} without clues` :
    //       `Game ${game.id} by ${game.author} with ${game.suggested_num_cards} cards`;
    //     if (game.daily_set_time !== null) {
    //       const date = new Date(new Date(game.daily_set_time).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    //       text += ` (${date.getMonth() + 1}/${date.getDate()}'s daily puzzle)`
    //     }
    //     return <NameChordGroup.Item key={i}>
    //       <Link to={this.getLink(game)}>{text}</Link>
    //     </NameChordGroup.Item>;
    // }));


    return (
      <Container 
        onClick={() => {this.toggleRevealed()}} 
        // className={"NameChord" + (this.props.wordNameChord !== "default" ? ` ${this.props.wordNameChord}` : "")}
      >
        <Row>
          <Col xs={12} md={4}>
            <img src={this.chordNameImageLink()}/>
          </Col>
          <Col xs={12} md={8} style={{ visibility: this.state.revealed ? 'visible': 'hidden' }}>
            <div>In Treble Clef</div>
            <img style={{'maxWidth': '100%'}} src={this.fullImageLink()} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NameChord;
