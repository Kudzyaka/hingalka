import { useState, useEffect } from 'react';
import { INITIAL_WORDS, type WordCard } from './data/words';
import { CardGrid } from './components/CardGrid';
import { CardSlider } from './components/CardSlider';
import { AddWordForm } from './components/AddWordForm';

export default function App() {
  const [activeTab, setActiveTab] = useState<'similarities' | 'differences' | 'docx' | 'ladybug' | 'custom'>('docx');
  const [displayMode, setDisplayMode] = useState<'grid' | 'slider'>('grid');
  const [customCards, setCustomCards] = useState<WordCard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Load custom cards from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ladybugs_custom_cards');
    if (saved) {
      try {
        setCustomCards(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading custom cards", e);
      }
    }
  }, []);

  // Handle header scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add custom card
  const handleAddCard = (newCardData: Omit<WordCard, 'id' | 'category'>) => {
    const newCard: WordCard = {
      ...newCardData,
      id: Date.now(),
      category: 'custom'
    };

    const updated = [...customCards, newCard];
    setCustomCards(updated);
    localStorage.setItem('ladybugs_custom_cards', JSON.stringify(updated));

    // Switch to My List and Grid view to show the new card immediately
    setActiveTab('custom');
    setDisplayMode('grid');

    // Scroll to cards view
    const section = document.getElementById('flashcards-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clear custom cards
  const handleClearCustomCards = () => {
    if (window.confirm("Вы уверены, что хотите удалить все добавленные вами карточки?")) {
      setCustomCards([]);
      localStorage.removeItem('ladybugs_custom_cards');
      if (activeTab === 'custom') {
        setActiveTab('docx');
      }
    }
  };

  // Combine initial cards and custom cards
  const allCards = [...INITIAL_WORDS, ...customCards];

  // Filter cards based on Active Tab and Search Term
  const filteredCards = allCards.filter(card => {
    const matchesTab = card.category === activeTab;
    const matchesSearch =
      card.russian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.southHangul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.southTranscript.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.northHangul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.northTranscript.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Adjust display mode recommendation based on device width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDisplayMode('slider'); // Default to slider on mobile
      } else {
        setDisplayMode('grid'); // Default to grid on desktop
      }
    };
    // Run once on load
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ================= HEADER ================= */}
      <header className={headerScrolled ? 'scrolled' : ''}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>

          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero-section')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div className="floating-ladybug" style={{ fontSize: '1.8rem' }}>🐞</div>
            <span style={{ fontFamily: 'var(--font-header)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.5px' }}>
              Lady<span style={{ color: 'var(--accent-red)' }}>BUGs</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="desktop-nav">
            <span onClick={() => scrollToSection('about-section')} style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>О проекте</span>
            <span onClick={() => scrollToSection('flashcards-section')} style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>Карточки</span>
            <span onClick={() => scrollToSection('add-word-section')} style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>Предложить слово</span>
            <button onClick={() => scrollToSection('flashcards-section')} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
              Учиться 🚀
            </button>
          </nav>

          {/* Burger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 110
            }}
            className="burger-btn"
            aria-label="Меню"
          >
            <div style={{ width: '25px', height: '3px', backgroundColor: 'var(--text-dark)', transform: mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none', transition: '0.3s' }}></div>
            <div style={{ width: '25px', height: '3px', backgroundColor: 'var(--text-dark)', opacity: mobileMenuOpen ? 0 : 1, transition: '0.3s' }}></div>
            <div style={{ width: '25px', height: '3px', backgroundColor: 'var(--text-dark)', transform: mobileMenuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none', transition: '0.3s' }}></div>
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: mobileMenuOpen ? 0 : '-100%',
            width: '80%',
            maxWidth: '300px',
            height: '100vh',
            backgroundColor: 'var(--bg-notebook)',
            boxShadow: 'var(--shadow-lg)',
            transition: 'right 0.3s ease',
            zIndex: 105,
            padding: '80px 30px 40px 30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
          }}
        >
          <span onClick={() => scrollToSection('about-section')} style={{ cursor: 'pointer', fontSize: '1.2rem', fontWeight: 600 }}>О проекте</span>
          <span onClick={() => scrollToSection('flashcards-section')} style={{ cursor: 'pointer', fontSize: '1.2rem', fontWeight: 600 }}>Карточки</span>
          <span onClick={() => scrollToSection('add-word-section')} style={{ cursor: 'pointer', fontSize: '1.2rem', fontWeight: 600 }}>Предложить слово</span>
          <button onClick={() => scrollToSection('flashcards-section')} className="btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
            Начать учиться 🚀
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(3px)',
              zIndex: 101
            }}
          ></div>
        )}
      </header>

      {/* CSS stylesheet helper for layout responsiveness nav */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>

      {/* ================= MAIN CONTENT ================= */}
      <main style={{ flex: 1 }}>

        {/* ================= HERO SECTION ================= */}
        <section className="section" id="hero-section" style={{ padding: '80px 0 60px 0', background: 'radial-gradient(circle at 80% 20%, #FCEBEB 0%, var(--bg-main) 50%)' }}>
          <div className="container hero-grid">

            {/* Hero text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                <span className="badge-different" style={{ fontSize: '0.8rem', padding: '4px 12px' }}>Проект команды LadyBUGs</span>
                <span style={{ fontSize: '1.2rem' }}>🐞</span>
              </div>
              <h1 style={{ fontSize: '3rem', lineHeight: '1.15', marginBottom: '20px' }}>
                Хангылька: <br />
                <span style={{ color: 'var(--accent-red)' }}>Южная</span> против <br />
                <span style={{ color: 'var(--accent-blue)' }}>Северной</span> Кореи
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '35px', maxWidth: '550px' }}>
                Полноценный интерактивный гид по лексическим различиям корейского полуострова. Листайте карточки, слушайте озвучку и погружайтесь в историю языка!
              </p>

              <div className="hero-buttons">
                <button onClick={() => scrollToSection('flashcards-section')} className="btn-primary">
                  Открыть карточки 📖
                </button>
                <button onClick={() => scrollToSection('about-section')} className="btn-secondary">
                  О проекте 🔍
                </button>
              </div>
            </div>

            {/* Hero Notebook Graphic */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  background: 'var(--bg-notebook)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '30px',
                  width: '100%',
                  maxWidth: '360px',
                  boxShadow: 'var(--shadow-lg)',
                  transform: 'rotate(2deg)',
                  position: 'relative'
                }}
              >
                {/* Paper Ring Binding Simulation */}
                <div style={{ position: 'absolute', top: '-15px', left: '10%', right: '10%', display: 'flex', justifyContent: 'space-between' }}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ width: '12px', height: '24px', backgroundColor: 'var(--border-color)', borderRadius: '6px', border: '2px solid #FFF', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></div>
                  ))}
                </div>

                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '8px' }}>
                    <span>LadyBUGs Journal</span>
                    <span>2026</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.5rem', marginBottom: '10px' }}>Хангылька 🇰🇷🇰🇵</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', marginBottom: '15px' }}>
                    <strong>Факт:</strong> За 80 лет разделения словарный запас Юга и Севера разошелся примерно на 30-40% в бытовой сфере!
                  </p>

                  {/* Mini-Card representation */}
                  <div style={{ backgroundColor: '#FFF', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Сок (Juice)</span>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-blue)' }}>주스 [чжусы]</div>
                    </div>
                    <span style={{ fontSize: '1.2rem' }}>⚡</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Сладкая вода</span>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-red)' }}>단물 [танмуль]</div>
                    </div>
                  </div>

                  <div className="floating-ladybug" style={{ position: 'absolute', bottom: '-15px', right: '20px', fontSize: '2rem' }}>🐞</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section className="section alt-bg" id="about-section">
          <div className="container">
            <h2 className="section-title">🕵️‍♀️ О проекте LadyBUGs</h2>
            <p className="section-subtitle">
              Мы исследуем, как исторические события, интеграция иностранных слов и языковая политика сформировали лексические различия между Югом и Севером.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '50px', marginTop: '40px' }} className="about-grid">

              {/* Left Texts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🐞</span> Кто мы такие?
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Мы — команда студенток-исследовательниц <strong>LadyBUGs</strong>. Нас увлекает корейский язык, его культура, K-Pop и дорамы. В рамках проекта мы решили глубже изучить, как развивался корейский язык в условиях долгого разделения двух государств.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🇰🇵</span> Язык единого народа
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Несмотря на более чем 80 лет политического разделения, корейский язык остаётся <strong>единым</strong>. Грамматика, структура предложения и базовая лексика совпадают. Однако повседневные слова, новые технологии и культурные термины претерпели сильные изменения. И это абсолютно нормально для любого разделенного языка!
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>❤️</span> Почему это важно?
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Понимание лексических различий — ключ к культурному мосту. Южная Корея активно перенимала англицизмы (так называемый <em>Конглиш</em>), в то время как Северная Корея проводила строгую политику «очищения» языка от иностранных заимствований, создавая оригинальные корейские слова. Знание этих тонкостей помогает переводчикам, исследователям и тем, кто мечтает о взаимопонимании культур.
                  </p>
                </div>
              </div>

              {/* Right Sticker Notes Decor */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                <div className="sticker-note">
                  <div className="sticker-title">💡 Важная мысль</div>
                  <p>Хотя слова могут сильно отличаться (как <em>«шампунь»</em> и <em>«жидкое мыло для головы»</em>), мы — один народ, и корейский язык объединяет нас!</p>
                </div>

                <div className="sticker-note blue">
                  <div className="sticker-title">🔍 Наш подход</div>
                  <p>Мы распарсили и структурировали слова в четыре интерактивные колоды для презентации, чтобы показать наглядные примеры от базовой лексики до современных заимствований.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Responsive style helper for About grid */}
        <style>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          }
        `}</style>

        {/* ================= INTERACTIVE CARDS SECTION ================= */}
        <section className="section" id="flashcards-section">
          <div className="container">
            <h2 className="section-title">📚 Интерактивные карточки</h2>
            <p className="section-subtitle">
              Выберите колоду, настройте режим отображения и кликайте на карточки, чтобы посмотреть перевод и прослушать правильное корейское произношение.
            </p>

            {/* Search Bar */}
            <div style={{ maxWidth: '400px', margin: '0 auto 30px auto', position: 'relative' }}>
              <input
                type="text"
                placeholder="🔍 Поиск слова (например, вода, сок, 음식)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  borderRadius: '30px',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'var(--bg-notebook)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="tabs-container">
              <button
                className={`tab-btn ${activeTab === 'docx' ? 'active' : ''}`}
                onClick={() => setActiveTab('docx')}
              >
                💎 Заимствования vs Исконные
              </button>
              <button
                className={`tab-btn ${activeTab === 'differences' ? 'active' : ''}`}
                onClick={() => setActiveTab('differences')}
              >
                🌶️ Разговорные различия
              </button>
              <button
                className={`tab-btn ${activeTab === 'similarities' ? 'active' : ''}`}
                onClick={() => setActiveTab('similarities')}
              >
                🌸 Базовые слова (Сходства)
              </button>
              <button
                className={`tab-btn ${activeTab === 'ladybug' ? 'active' : ''}`}
                onClick={() => setActiveTab('ladybug')}
              >
                🐞 Спецвыпуск: Леди Баг
              </button>
              <button
                className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
                onClick={() => setActiveTab('custom')}
              >
                Мой список ({customCards.length})
              </button>
            </div>

            {/* Display Mode Toggle Wrapper */}
            <div className="toggle-wrapper">
              <span className="toggle-label" style={{ fontWeight: displayMode === 'grid' ? 700 : 500, color: displayMode === 'grid' ? 'var(--text-dark)' : 'var(--text-muted)' }}>
                🎛️ Сетка <span className="desktop-only">карточек</span>
              </span>

              <div
                className={`ladybug-toggle ${displayMode === 'slider' ? 'active' : ''}`}
                onClick={() => setDisplayMode(displayMode === 'grid' ? 'slider' : 'grid')}
                title="Переключить режим обучения"
              >
                <div className="ladybug-knob">
                  <div className="ladybug-head"></div>
                </div>
              </div>

              <span className="toggle-label" style={{ fontWeight: displayMode === 'slider' ? 700 : 500, color: displayMode === 'slider' ? 'var(--text-dark)' : 'var(--text-muted)' }}>
                🎚️ Обучение <span className="desktop-only">(Слайдер)</span>
              </span>
            </div>

            {/* My List Header Action */}
            {activeTab === 'custom' && customCards.length > 0 && (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                  onClick={handleClearCustomCards}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-red)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  🗑️ Очистить все мои карточки
                </button>
              </div>
            )}

            {/* RENDER MODE */}
            <div style={{ minHeight: '350px' }}>
              {displayMode === 'grid' ? (
                <CardGrid cards={filteredCards} />
              ) : (
                <CardSlider cards={filteredCards} />
              )}
            </div>

          </div>
        </section>

        {/* ================= ADD WORD SECTION ================= */}
        <section className="section alt-bg" id="add-word-section">
          <div className="container">
            <AddWordForm onAddCard={handleAddCard} />
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer style={{ backgroundColor: 'var(--text-dark)', color: '#FFF', padding: '50px 0 30px 0', borderTop: '4px solid var(--accent-red)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px', borderBottom: '1px solid #333', paddingBottom: '30px', marginBottom: '30px' }} className="footer-top">

            {/* Footer Logo */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.8rem' }}>🐞</span>
                <span style={{ fontFamily: 'var(--font-header)', fontWeight: 700, fontSize: '1.4rem', color: '#FFF', letterSpacing: '0.5px' }}>
                  Lady<span style={{ color: 'var(--accent-red)' }}>BUGs</span>
                </span>
              </div>
              <p style={{ color: '#aaa', fontSize: '0.85rem', maxWidth: '300px' }}>
                Интерактивный проект по изучению и сравнению лексики Южной и Северной Кореи.
              </p>
            </div>

            {/* Footer Sticker Quotes */}
            <div style={{
              backgroundColor: '#333',
              borderLeft: '4px solid var(--accent-red)',
              padding: '15px 20px',
              borderRadius: '6px',
              maxWidth: '500px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
              <p style={{ fontSize: '0.9rem', color: '#e5e5e5', fontStyle: 'italic', lineHeight: '1.5' }}>
                «Хотя слова могут отличаться, мы — один народ. Язык объединяет нас!» 🇰🇷🤝🇰🇵
              </p>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.8rem', color: '#888' }} className="footer-bottom">
            <span>© {new Date().getFullYear()} Команда LadyBUGs. Создано для презентации проекта.</span>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span>Учись легко, сравнивай и запоминай! 🐞❤️</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .footer-top { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
        }
      `}</style>

    </div>
  );
}
