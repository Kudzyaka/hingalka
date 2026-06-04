import React, { useState } from 'react';
import type { WordCard } from '../data/words';

interface AddWordFormProps {
  onAddCard: (card: Omit<WordCard, 'id' | 'category'>) => void;
}

export const AddWordForm: React.FC<AddWordFormProps> = ({ onAddCard }) => {
  const [russian, setRussian] = useState('');
  const [southHangul, setSouthHangul] = useState('');
  const [southTranscript, setSouthTranscript] = useState('');
  const [northHangul, setNorthHangul] = useState('');
  const [northTranscript, setNorthTranscript] = useState('');
  const [explanation, setExplanation] = useState('');
  const [emoji, setEmoji] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!russian.trim() || !southHangul.trim() || !southTranscript.trim() || !northHangul.trim() || !northTranscript.trim()) {
      alert("Пожалуйста, заполните все обязательные поля!");
      return;
    }

    onAddCard({
      russian: russian.trim(),
      southHangul: southHangul.trim(),
      southTranscript: southTranscript.trim(),
      northHangul: northHangul.trim(),
      northTranscript: northTranscript.trim(),
      explanation: explanation.trim() || undefined,
      emoji: emoji.trim() || '🐞'
    });

    // Clear form
    setRussian('');
    setSouthHangul('');
    setSouthTranscript('');
    setNorthHangul('');
    setNorthTranscript('');
    setExplanation('');
    setEmoji('');
    
    // Show success banner
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  return (
    <div className="form-container" id="add-word-section">
      <h3 className="form-title">➕ Добавить свою карточку</h3>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        Добавьте новое слово для сравнения. Оно сразу появится во вкладке <strong>«Мой список»</strong> и сохранится в памяти браузера!
      </p>

      {successMsg && (
        <div style={{
          backgroundColor: '#EBF7EE',
          color: '#2E7D32',
          padding: '12px',
          borderRadius: '10px',
          fontSize: '0.9rem',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '20px',
          border: '1px solid #C8E6C9'
        }}>
          🎉 Карточка успешно добавлена в раздел «Мой список»!
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Понятие на русском *</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например: Апельсин" 
            value={russian}
            onChange={(e) => setRussian(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Южная Корея (Хангыль) *</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например: 오렌지" 
            value={southHangul}
            onChange={(e) => setSouthHangul(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Южная Корея (Русская транскрипция) *</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например: орэнджи" 
            value={southTranscript}
            onChange={(e) => setSouthTranscript(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Северная Корея (Хангыль) *</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например: 단귤" 
            value={northHangul}
            onChange={(e) => setNorthHangul(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Северная Корея (Русская транскрипция) *</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например: тангюль" 
            value={northTranscript}
            onChange={(e) => setNorthTranscript(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Иконка (Эмодзи)</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например: 🍊" 
            maxLength={4}
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Краткое пояснение / Различие</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например: Юг заимствовал слово, Север очистил..." 
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <div className="form-group full-width" style={{ textAlign: 'center', marginTop: '10px' }}>
          <button type="submit" className="btn-primary">
            Создать карточку ✨
          </button>
        </div>
      </form>
    </div>
  );
};
