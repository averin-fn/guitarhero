import React, { useState, useRef, useEffect } from 'react';
import './ChordDropdown.css';

interface ChordDropdownProps {
  chords: string[];
  selectedChord: string;
  learnedChords: Set<string>;
  onChordSelect: (chord: string) => void;
}

interface ChordGroup {
  name: string;
  chords: string[];
}

const ChordDropdown: React.FC<ChordDropdownProps> = ({
  chords,
  selectedChord,
  learnedChords,
  onChordSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Группировка аккордов по типам
  const groupChords = (chords: string[]): ChordGroup[] => {
    const groups: ChordGroup[] = [
      { name: 'Мажорные', chords: [] },
      { name: 'Минорные', chords: [] },
      { name: 'Септаккорды', chords: [] },
      { name: 'Минорные септ.', chords: [] },
      { name: 'Мажорные септ.', chords: [] },
      { name: 'Другие', chords: [] },
    ];

    chords.forEach(chord => {
      if (chord.includes('maj7')) {
        groups[4].chords.push(chord);
      } else if (chord.includes('m7')) {
        groups[3].chords.push(chord);
      } else if (chord.includes('7')) {
        groups[2].chords.push(chord);
      } else if (chord.includes('m') && !chord.includes('maj')) {
        groups[1].chords.push(chord);
      } else if (!chord.includes('aug') && !chord.includes('dim') && !chord.includes('#')) {
        groups[0].chords.push(chord);
      } else {
        groups[5].chords.push(chord);
      }
    });

    return groups.filter(group => group.chords.length > 0);
  };

  const filteredChords = chords.filter(chord =>
    chord.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chordGroups = groupChords(filteredChords);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleChordSelect = (chord: string) => {
    onChordSelect(chord);
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className="chord-dropdown" ref={dropdownRef}>
      <div className="dropdown-header">
        <h3 className="dropdown-title">Выберите аккорд</h3>
        <button
          className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          <span className="selected-chord">
            {selectedChord}
            {learnedChords.has(selectedChord) && (
              <span className="learned-indicator">✓</span>
            )}
          </span>
          <span className="dropdown-arrow">▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-content">
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Поиск аккорда..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="chords-list">
            {chordGroups.map((group) => (
              <div key={group.name} className="chord-group">
                <div className="group-header">{group.name}</div>
                <div className="group-chords">
                  {group.chords.map((chord) => (
                    <button
                      key={chord}
                      className={`chord-option ${
                        selectedChord === chord ? 'selected' : ''
                      } ${learnedChords.has(chord) ? 'learned' : ''}`}
                      onClick={() => handleChordSelect(chord)}
                    >
                      <span className="chord-name">{chord}</span>
                      {learnedChords.has(chord) && (
                        <span className="check-mark">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredChords.length === 0 && (
              <div className="no-results">
                Аккорды не найдены
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChordDropdown;
