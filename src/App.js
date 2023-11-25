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
        width: window.screen.width,
        height: window.screen.height,
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
      <div className="flex-container-1-item flex-container-2">
        <table className="flex-container-2-item" width={windowSize.width * 0.7}>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
        </table>
        <div className="flex-container-2-item flex-container-3">
          <button className="flex-container-3-item" onClick={onButtonClick} width={windowSize.width * 0.2}>NEW GAME</button>
          <button className="flex-container-3-item" onClick={onButtonClick} width={windowSize.width * 0.2}>PLAY SOUND</button>
        </div>
      </div>
      <div className=".flex-container-1-item">
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
      <div className="flex-container-1-item flex-container-4" flexBasis={windowSize.width * 0.9}>
        <button className="flex-container-4-item" onClick={onButtonClick} width={windowSize.width * 0.3}>CLEAR</button>
        <div className="flex-container-4-item">
          {windowSize.width},
          {windowSize.height}
        </div>
        <button className="flex-container-4-item" onClick={onButtonClick} width={windowSize.width * 0.3}>ENTER</button>
      </div>
    </div>
  );
}

export default App;
