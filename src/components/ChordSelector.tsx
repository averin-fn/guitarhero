import React from 'react';
import './ChordSelector.css';

interface ChordSelectorProps {
  chords: string[];
  selectedChord: string;
  learnedChords: Set<string>;
  onChordSelect: (chord: string) => void;
}

const ChordSelector: React.FC<ChordSelectorProps> = ({
  chords,
  selectedChord,
  learnedChords,
  onChordSelect,
}) => {
  return (
    <div className="chord-selector">
      <h3 className="selector-title">Выберите аккорд</h3>
      <div className="chord-grid">
        {chords.map((chord) => (
          <button
            key={chord}
            className={`chord-button ${
              selectedChord === chord ? 'selected' : ''
            } ${learnedChords.has(chord) ? 'learned' : ''}`}
            onClick={() => onChordSelect(chord)}
          >
            <span className="chord-text">{chord}</span>
            {learnedChords.has(chord) && (
              <span className="check-icon">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChordSelector;
