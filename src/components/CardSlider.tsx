import React, { useState, useEffect, useRef } from 'react';
import type { WordCard } from '../data/words';
import { FlashCard } from './FlashCard';

interface CardSliderProps {
  cards: WordCard[];
}

export const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  // Reset index when cards change (e.g. category switch)
  useEffect(() => {
    setCurrentIndex(0);
  }, [cards]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cards.length === 0) return;
      
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, cards]);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Swiping support for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (cards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Список карточек пуст. Вы можете добавить свою первую карточку ниже!
        </p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="slider-container">
      {/* Swipe area container */}
      <div 
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Pass key={currentCard.id} to force remount/reset flip state when switching cards */}
        <FlashCard key={currentCard.id} card={currentCard} index={currentIndex + 1} />
      </div>

      <div className="slider-controls">
        <button 
          className="slider-btn" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          aria-label="Предыдущая карточка"
        >
          ←
        </button>
        
        <span className="slider-progress">
          {currentIndex + 1} / {cards.length}
        </span>
        
        <button 
          className="slider-btn" 
          onClick={handleNext} 
          disabled={currentIndex === cards.length - 1}
          aria-label="Следующая карточка"
        >
          →
        </button>
      </div>
      
      <p style={{ 
        textAlign: 'center', 
        fontSize: '0.8rem', 
        color: 'var(--text-muted)', 
        marginTop: '12px',
        fontStyle: 'italic'
      }}>
        💡 Совет: вы можете листать карточки стрелками на клавиатуре ⌨️ или свайпами на смартфоне 📱
      </p>
    </div>
  );
};
