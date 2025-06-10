import React from 'react';
import './GuitarNeck.css';

interface GuitarNeckProps {
  frets: (number | null)[];
  chordName: string;
}

const GuitarNeck: React.FC<GuitarNeckProps> = ({ frets, chordName }) => {
  const strings = ['E', 'B', 'G', 'D', 'A', 'E']; // Перевернули порядок струн
  const fretNumbers = [0, 1, 2, 3, 4, 5];

  const renderStringLabel = (stringIndex: number) => {
    return (
      <div className="string-label" key={`label-${stringIndex}`}>
        {strings[stringIndex]}
      </div>
    );
  };

  const renderFret = (stringIndex: number, fretNumber: number) => {
    const isPressed = frets[stringIndex] === fretNumber;
    const isOpen = frets[stringIndex] === 0 && fretNumber === 0;
    const isMuted = frets[stringIndex] === null;

    return (
      <div
        key={`${stringIndex}-${fretNumber}`}
        className={`fret ${isPressed ? 'pressed' : ''} ${isOpen ? 'open' : ''} ${
          isMuted && fretNumber === 0 ? 'muted' : ''
        }`}
      >
        {isPressed && fretNumber > 0 && <div className="finger-dot" />}
        {isOpen && <div className="open-marker">○</div>}
        {isMuted && fretNumber === 0 && <div className="mute-marker">×</div>}
      </div>
    );
  };

  return (
    <div className="guitar-neck">
      <div className="neck-container">
        {/* Номера ладов */}
        <div className="fret-numbers">
          <div className="fret-number-spacer"></div>
          {fretNumbers.slice(1).map((fretNum) => (
            <div key={`fret-num-${fretNum}`} className="fret-number">
              {fretNum}
            </div>
          ))}
        </div>

        {/* Струны и лады */}
        <div className="strings-container">
          {strings.map((_, stringIndex) => (
            <div key={`string-${stringIndex}`} className="string-row">
              {renderStringLabel(stringIndex)}
              <div className="frets-row">
                {fretNumbers.map((fretNumber) =>
                  renderFret(stringIndex, fretNumber)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chord-instructions">
        <p className="instruction-text">
          ○ - открытая струна, × - заглушенная струна, • - зажатая струна
        </p>
      </div>
    </div>
  );
};

export default GuitarNeck;
