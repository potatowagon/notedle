import logo from './logo.svg';
import './App.css';
import { MidiNumbers } from 'react-piano';
// import 'react-piano/dist/styles.css';
// import SoundfontProvider from './SoundfontProvider';
import BasicPiano from './BasicPiano';
import './styles.css';
import { useState, useEffect } from 'react';

// const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

function App() {
  const noteRange3 = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('b3'),
  };
  const noteRange4 = {
    first: MidiNumbers.fromNote('c4'),
    last: MidiNumbers.fromNote('b4'),
  };

  const [absentNotes, setAbsentNotes] = useState([]);
  const [presentNotes, setPresentNotes] = useState([]);
  const [correctNotes, setCorrectNotes] = useState([]);
  const [playedNotes, setPlayedNotes] = useState([]);

  const answerNotes = [
    MidiNumbers.fromNote('c3'),
    MidiNumbers.fromNote('d3'),
    MidiNumbers.fromNote('e4'),
    MidiNumbers.fromNote('f3')
  ];

  // replace with onclick enter button
  const onButtonClick = () => {
    console.log('click');
    console.log(playedNotes);
    setPresentNotes(presentNotes.concat(playedNotes.filter((midiNumber) => answerNotes.includes(midiNumber))));
    setPlayedNotes([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onButtonClick} value={'abc'} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <BasicPiano
            noteRange={noteRange4}
            absentNotes={absentNotes}
            presentNotes={presentNotes}
            correctNotes={correctNotes}
            playedNotes={playedNotes}
            setPlayedNotes={setPlayedNotes}
            setAbsentNotes={setAbsentNotes}
            setPresentNotes={setPresentNotes}
            setCorrectNotes={setCorrectNotes}
          />
          <BasicPiano
            noteRange={noteRange3}
            absentNotes={absentNotes}
            presentNotes={presentNotes}
            correctNotes={correctNotes}
            playedNotes={playedNotes}
            setPlayedNotes={setPlayedNotes}
            setAbsentNotes={setAbsentNotes}
            setPresentNotes={setPresentNotes}
            setCorrectNotes={setCorrectNotes}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
