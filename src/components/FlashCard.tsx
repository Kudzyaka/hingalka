import React, { useState, useEffect } from 'react';
import type { WordCard } from '../data/words';

interface FlashCardProps {
  card: WordCard;
  index: number;
}

export const FlashCard: React.FC<FlashCardProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [speakingState, setSpeakingState] = useState<'idle' | 'south' | 'north'>('idle');

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = (e: React.MouseEvent) => {
    // Prevent flipping when clicking the speaker button
    e.stopPropagation();

    if (!('speechSynthesis' in window)) {
      alert("Ваш браузер не поддерживает озвучку текста. Попробуйте обновить браузер или открыть сайт на современном смартфоне.");
      return;
    }

    window.speechSynthesis.cancel();

    // Remove slashes or brackets for clean pronunciation reading
    const cleanSouth = card.southHangul.split('/')[0].trim();
    const cleanNorth = card.northHangul.split('(')[0].trim();

    // 1. Speak South Korean
    const southUtterance = new SpeechSynthesisUtterance(cleanSouth);
    southUtterance.lang = 'ko-KR';
    southUtterance.rate = 0.85;

    southUtterance.onstart = () => setSpeakingState('south');
    southUtterance.onend = () => {
      setSpeakingState('idle');
      // Wait 1 second, then speak North Korean
      setTimeout(() => {
        const northUtterance = new SpeechSynthesisUtterance(cleanNorth);
        northUtterance.lang = 'ko-KR';
        northUtterance.rate = 0.85;

        northUtterance.onstart = () => setSpeakingState('north');
        northUtterance.onend = () => setSpeakingState('idle');
        northUtterance.onerror = () => setSpeakingState('idle');

        window.speechSynthesis.speak(northUtterance);
      }, 1000);
    };

    southUtterance.onerror = () => setSpeakingState('idle');

    window.speechSynthesis.speak(southUtterance);
  };

  const isUnified = card.southHangul === card.northHangul;

  return (
    <div 
      className={`flashcard-container ${isFlipped ? 'is-flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flashcard-inner">
        {/* ================= CARD FRONT ================= */}
        <div className="flashcard-front">
          <div className="card-header">
            <span className="card-num">{index}</span>
            <span className="card-title-rus">{card.russian}</span>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>ℹ️ Инфо</span>
          </div>

          <div className="card-body-flat">
            <div className="card-divider"></div>
            
            {/* South Korea Side */}
            <div 
              className="card-side south"
              style={{
                outline: speakingState === 'south' ? '3px solid var(--accent-blue)' : 'none',
                boxShadow: speakingState === 'south' ? '0 0 15px rgba(63, 136, 197, 0.4)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <div className="country-label">Южная Корея</div>
              <span style={{ fontSize: '1.5rem' }}>🇰🇷</span>
              <div className="korean-word">{card.southHangul}</div>
              <div className="korean-transcript">[{card.southTranscript}]</div>
            </div>

            {/* North Korea Side */}
            <div 
              className="card-side north"
              style={{
                outline: speakingState === 'north' ? '3px solid var(--accent-red)' : 'none',
                boxShadow: speakingState === 'north' ? '0 0 15px rgba(229, 75, 75, 0.4)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <div className="country-label">Северная Корея</div>
              <span style={{ fontSize: '1.5rem' }}>🇰🇵</span>
              <div className="korean-word">{card.northHangul}</div>
              <div className="korean-transcript">[{card.northTranscript}]</div>
            </div>
          </div>

          <div className="card-header" style={{ borderBottom: 'none', borderTop: '1px dashed var(--border-color)', justifyContent: 'center' }}>
            {isUnified ? (
              <span className="badge-unified">✨ Едины</span>
            ) : (
              <span className="badge-different">🌶️ Отличаются</span>
            )}
          </div>
        </div>

        {/* ================= CARD BACK ================= */}
        <div className="flashcard-back">
          <div className="card-header">
            <span className="card-num">{index}</span>
            <span className="card-title-rus" style={{ color: 'var(--accent-red)' }}>{card.russian}</span>
            <span className="flip-hint">🔄 Сравнить</span>
          </div>

          <div className="card-back-body">
            <div className="card-back-content-scroll">
              <div className="card-emoji">{card.emoji || '🐞'}</div>
              <p className="card-explanation">
                {card.explanation || "Исследуйте лексику: сравните произношение и написание на корейском языке для южной и северной норм."}
              </p>
            </div>

            <div className="card-back-footer">
              <button 
                className="listen-btn"
                onClick={handleSpeak}
                style={{
                  backgroundColor: speakingState !== 'idle' ? 'var(--accent-red)' : 'var(--text-dark)'
                }}
              >
                {speakingState === 'idle' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    Озвучить (Север + Юг)
                  </>
                ) : speakingState === 'south' ? (
                  <>🗣️ Произносим Юг...</>
                ) : (
                  <>🗣️ Произносим Север...</>
                )}
              </button>
              
              <span className="flip-hint" style={{ fontStyle: 'italic' }}>Кликни, чтобы перевернуть</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
