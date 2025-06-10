import React from 'react';
import './ConfirmButton.css';

interface ConfirmButtonProps {
  chordName: string;
  isLearned: boolean;
  onConfirm: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  chordName,
  isLearned,
  onConfirm,
}) => {
  return (
    <div className="confirm-section">
      <button
        className={`confirm-button ${isLearned ? 'learned' : ''}`}
        onClick={onConfirm}
        disabled={isLearned}
      >
        <span className="button-icon">
          {isLearned ? '✓' : '🎸'}
        </span>
        <span className="button-text">
          {isLearned 
            ? `Аккорд ${chordName} изучен!` 
            : `Изучил аккорд ${chordName}`
          }
        </span>
      </button>
      
      {!isLearned && (
        <p className="help-text">
          Нажмите кнопку, когда изучите аккорд {chordName}
        </p>
      )}
    </div>
  );
};

export default ConfirmButton;
