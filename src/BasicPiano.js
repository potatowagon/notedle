import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import SoundfontProvider from './SoundfontProvider';


const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

class BasicPiano extends React.Component {
    static propTypes = {
        noteRange: PropTypes.PropTypes.shape({
            first: PropTypes.number.isRequired,
            last: PropTypes.number.isRequired
        }).isRequired,
        absentNotes: PropTypes.arrayOf(PropTypes.number),
        presentNotes: PropTypes.arrayOf(PropTypes.number),
        correctNotes: PropTypes.arrayOf(PropTypes.number)
    };

    constructor(props) {
        super(props);
        this.state = {
            absentNotes: [],
            presentNotes: [],
            correctNotes: []
        };
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
                                    <div className="label-keyboardShortcut">{midiNumber}</div>
                                    <div className="label-midiNumber">{'b'}</div>
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
