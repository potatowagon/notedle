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

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [])

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
    <div className="flex-container-1" height={windowSize.height}>
      <button className="flex-container-1-items" onClick={onButtonClick} value={'abc'} />
      <div className="flex-container-1-items">
        {windowSize.width},
        {windowSize.height}
      </div>
      <div className=".flex-container-1-items">
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
    </div>
  );
}

export default App;
