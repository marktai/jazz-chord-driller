import React from 'react';
import CloverService from '../api';
import { GameType } from '../api';
import {Container, Row, Col, NameChordGroup, Button} from 'react-bootstrap';
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

type NameChordProps = {
  chord: string,
};

type NameChordState = {
  revealed: boolean
};

class NameChord extends React.Component<NameChordProps, NameChordState> {
  state: NameChordState = {
    // games: null,
    revealed: false,
  };

  async componentDidMount() {
  }

  async componentDidUpdate(prevProps: NameChordProps) {
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

  handleClick(){
    console.log(this);
    return this.setState({
      ...this.state,
      revealed: !this.state.revealed
    });
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
        onClick={() => {this.handleClick()}} 
        // className={"NameChord" + (this.props.wordNameChord !== "default" ? ` ${this.props.wordNameChord}` : "")}
      >
        <Row>
          <Col xs={12} md={4}>
            <img src={this.chordNameImageLink()}/>
          </Col>
          <Col xs={12} md={8}>
            <img src={this.fullImageLink()}  style={{ visibility: this.state.revealed ? 'visible': 'hidden' }} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NameChord;
