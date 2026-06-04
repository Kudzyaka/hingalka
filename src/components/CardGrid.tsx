import React from 'react';
import type { WordCard } from '../data/words';
import { FlashCard } from './FlashCard';

interface CardGridProps {
  cards: WordCard[];
}

export const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', gridColumn: '1 / -1' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Список карточек пуст. Вы можете добавить свою первую карточку ниже!
        </p>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {cards.map((card, idx) => (
        <FlashCard key={card.id} card={card} index={idx + 1} />
      ))}
    </div>
  );
};
