import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import SoundfontProvider from './SoundfontProvider';
import classNames from 'classnames';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

export const MIDI_TO_NOTE_FLAT = Object.freeze({
    48: 'C3',
    49: 'Db3',
    50: 'D3',
    51: 'Eb3',
    52: 'E3',
    53: 'F3',
    54: 'Gb3',
    55: 'G3',
    56: 'Ab3',
    57: 'A3',
    58: 'Bb3',
    59: 'B3',
    60: 'C4',
    61: 'Db4',
    62: 'D4',
    63: 'Eb4',
    64: 'E4',
    65: 'F4',
    66: 'Gb4',
    67: 'G4',
    68: 'Ab4',
    69: 'A4',
    70: 'Bb4',
    71: 'B4',
});

export const MIDI_TO_NOTE_SHARP = Object.freeze({
    48: 'C3',
    49: 'C#3',
    50: 'D3',
    51: 'D#3',
    52: 'E3',
    53: 'F3',
    54: 'F#3',
    55: 'G3',
    56: 'G#3',
    57: 'A3',
    58: 'A#3',
    59: 'B3',
    60: 'C4',
    61: 'C#4',
    62: 'D4',
    63: 'D#4',
    64: 'E4',
    65: 'F4',
    66: 'F#4',
    67: 'G4',
    68: 'G#4',
    69: 'A4',
    70: 'A#4',
    71: 'B4',
});

class BasicPiano extends React.Component {
    static propTypes = {
        noteRange: PropTypes.PropTypes.shape({
            first: PropTypes.number.isRequired,
            last: PropTypes.number.isRequired
        }).isRequired,
        absentNotes: PropTypes.arrayOf(PropTypes.number),
        presentNotes: PropTypes.arrayOf(PropTypes.number),
        correctNotes: PropTypes.arrayOf(PropTypes.number),
        isShowFlat: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            absentNotes: [],
            presentNotes: [],
            correctNotes: []
        };
    }

    calcSize() {
        const bottleNeck = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;


    }

    render() {
        const keyboardShortcuts = KeyboardShortcuts.create({
            firstNote: this.props.noteRange.first,
            lastNote: this.props.noteRange.last,
            keyboardConfig: KeyboardShortcuts.HOME_ROW,
        });
        const inNoteRangeFn = midi => midi >= this.props.noteRange.first && midi <= this.props.noteRange.last;
        //const absentNotes = (this.props.absentNotes.filter(midi => midi >= this.props.noteRange.first && midi <= this.props.noteRange.last);
        return (
            <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                playedNotes={this.playedNotes}
                setPlayedNotes={this.setPlayedNotes}
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                    <Piano
                        absentNotes={this.props.absentNotes.filter(inNoteRangeFn)}
                        presentNotes={this.props.presentNotes.filter(inNoteRangeFn)}
                        correctNotes={this.props.correctNotes.filter(inNoteRangeFn)}
                        noteRange={this.props.noteRange}
                        // TODO: make responsive resize for mobile
                        width={window.innerWidth * 0.8}
                        playNote={playNote}
                        stopNote={stopNote}
                        disabled={isLoading}
                        //keyboardShortcuts={keyboardShortcuts}
                        keyWidthToHeight={0.8}
                        renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }) => {
                            return (
                                <div>
                                    <div className={classNames({
                                        'ReactPiano__NoteLabel--accidental': isAccidental,
                                        'ReactPiano__NoteLabel--natural': !isAccidental,
                                    })}>{this.props.isShowFlat ? MIDI_TO_NOTE_FLAT[midiNumber] : MIDI_TO_NOTE_SHARP[midiNumber]}</div>
                                </div>
                            );
                        }
                        }
                    />
                )}
                {...this.props}
            />
        );
    }
}
export default BasicPiano;
