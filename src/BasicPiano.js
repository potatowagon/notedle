import React from 'react';
import PropTypes from 'prop-types';
import { Piano, KeyboardShortcuts } from 'react-piano';
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
    };

    constructor(props) {
        super(props);
    }

    render() {
        const keyboardShortcuts = KeyboardShortcuts.create({
            firstNote: this.props.noteRange.first,
            lastNote: this.props.noteRange.last,
            keyboardConfig: KeyboardShortcuts.HOME_ROW,
        });
        return (
            <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                    <Piano
                        noteRange={this.props.noteRange}
                        width={500}
                        playNote={playNote}
                        stopNote={stopNote}
                        disabled={isLoading}
                        keyboardShortcuts={keyboardShortcuts}
                        keyWidthToHeight={0.8}
                    />
                )}
            />
        );
    }
}
export default BasicPiano;
