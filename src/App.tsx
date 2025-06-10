import React, { useState } from 'react';
import './App.css';
import ChordDropdown from './components/ChordDropdown';
import GuitarNeck from './components/GuitarNeck';
import ConfirmButton from './components/ConfirmButton';

const chords = {
  // Мажорные аккорды (порядок: E B G D A E - от тонкой к толстой)
  'A': [0, 2, 2, 2, 0, null],
  'B': [2, 4, 4, 4, 2, null],
  'C': [0, 1, 0, 2, 3, null],
  'D': [2, 3, 2, 0, null, null],
  'E': [0, 0, 1, 2, 2, 0],
  'F': [1, 1, 2, 3, 3, 1],
  'G': [3, 3, 0, 0, 2, 3],
  
  // Минорные аккорды
  'Am': [0, 1, 2, 2, 0, null],
  'Bm': [2, 3, 4, 4, 2, null],
  'Cm': [3, 4, 5, 5, 3, null],
  'Dm': [1, 3, 2, 0, null, null],
  'Em': [0, 0, 0, 2, 2, 0],
  'Fm': [1, 1, 1, 3, 3, 1],
  'Gm': [3, 3, 3, 5, 5, 3],
  
  // Септаккорды
  'A7': [0, 2, 0, 2, 0, null],
  'B7': [2, 0, 2, 1, 2, null],
  'C7': [0, 1, 3, 2, 3, null],
  'D7': [2, 1, 2, 0, null, null],
  'E7': [0, 0, 1, 0, 2, 0],
  'F7': [1, 1, 2, 1, 3, 1],
  'G7': [1, 0, 0, 0, 2, 3],
  
  // Минорные септаккорды
  'Am7': [0, 1, 0, 2, 0, null],
  'Bm7': [2, 3, 2, 4, 2, null],
  'Cm7': [3, 4, 3, 5, 3, null],
  'Dm7': [1, 1, 2, 0, null, null],
  'Em7': [0, 0, 0, 0, 2, 0],
  'Fm7': [1, 1, 1, 1, 3, 1],
  'Gm7': [3, 3, 3, 3, 5, 3],
  
  // Мажорные септаккорды
  'Amaj7': [0, 2, 1, 2, 0, null],
  'Bmaj7': [2, 4, 3, 4, 2, null],
  'Cmaj7': [0, 0, 0, 2, 3, null],
  'Dmaj7': [2, 2, 2, 0, null, null],
  'Emaj7': [0, 0, 1, 1, 2, 0],
  'Fmaj7': [1, 1, 2, 2, 3, 1],
  'Gmaj7': [2, 0, 0, 0, 2, 3],
  
  // Дополнительные аккорды
  'A#': [1, 3, 3, 3, 1, null],
  'C#': [4, 6, 6, 6, 4, null],
  'D#': [3, 4, 3, 1, null, null],
  'F#': [2, 2, 3, 4, 4, 2],
  'G#': [4, 4, 5, 6, 6, 4],
  
  'A#m': [1, 2, 3, 3, 1, null],
  'C#m': [4, 5, 6, 6, 4, null],
  'D#m': [2, 4, 3, 1, null, null],
  'F#m': [2, 2, 2, 4, 4, 2],
  'G#m': [4, 4, 4, 6, 6, 4],
  
  // Увеличенные и уменьшенные
  'Aaug': [1, 2, 3, 2, 0, null],
  'Adim': [2, 1, 2, 1, 0, null],
  'Caug': [0, 1, 1, 2, 3, null],
  'Cdim': [2, 4, 2, 4, 3, null],
};

function App() {
  const [selectedChord, setSelectedChord] = useState<string>('A');
  const [learnedChords, setLearnedChords] = useState<Set<string>>(new Set());

  const handleChordSelect = (chord: string) => {
    setSelectedChord(chord);
  };

  const handleChordConfirm = () => {
    setLearnedChords(prev => new Set(Array.from(prev).concat(selectedChord)));
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">🎸 Изучение аккордов гитары</h1>
          <p className="subtitle">Выберите аккорд и изучите аппликатуру</p>
        </header>

        <main className="main">
          <ChordDropdown
            chords={Object.keys(chords)}
            selectedChord={selectedChord}
            learnedChords={learnedChords}
            onChordSelect={handleChordSelect}
          />

          <div className="chord-display">
            <h2 className="chord-name">{selectedChord}</h2>
            <GuitarNeck 
              frets={chords[selectedChord as keyof typeof chords]} 
              chordName={selectedChord}
            />
          </div>

          <ConfirmButton
            chordName={selectedChord}
            isLearned={learnedChords.has(selectedChord)}
            onConfirm={handleChordConfirm}
          />

          <div className="progress">
            <p className="progress-text">
              Изучено аккордов: {learnedChords.size} из {Object.keys(chords).length}
            </p>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${(learnedChords.size / Object.keys(chords).length) * 100}%` 
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
