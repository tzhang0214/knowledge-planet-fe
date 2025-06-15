import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

const mockSuggestions = [
  '地球', '火星', '木星', '土星', '银河', '星系', '黑洞', '宇宙飞船', '星球大战', '星际旅行'
];

const SearchBar = ({ searchHistory, setSearchHistory, suggestions, setSuggestions }) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const inputRef = useRef(null);

  // 历史去重，最新的在前
  const uniqueHistory = Array.from(new Set([...searchHistory].reverse()));

  useEffect(() => {
    if (input) {
      setFilteredSuggestions(
        mockSuggestions.filter(s => s.includes(input) && !uniqueHistory.includes(s))
      );
      setFilteredHistory(
        uniqueHistory.filter(h => h.includes(input))
      );
    } else {
      setFilteredSuggestions([]);
      setFilteredHistory(uniqueHistory.slice(0, 5));
    }
  }, [input, searchHistory]);

  const handleInput = (e) => {
    setInput(e.target.value);
    setShowDropdown(true);
  };

  const handleSelect = (val) => {
    setInput(val);
    setShowDropdown(false);
    if (val) {
      // 去重，最新的在前
      const newHistory = [val, ...uniqueHistory.filter(h => h !== val)];
      setSearchHistory(newHistory);
      console.log(`search:${val}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      // 去重，最新的在前
      const newHistory = [input, ...uniqueHistory.filter(h => h !== input)];
      setSearchHistory(newHistory);
      setShowDropdown(false);
      console.log(`search:${input}`);
    }
  };

  const handleDeleteHistory = (val, e) => {
    e.stopPropagation();
    setSearchHistory(uniqueHistory.filter(h => h !== val).reverse());
  };

  return (
    <div className="searchbar-wrapper searchbar-wrapper-top">
      <form className="searchbar-form" onSubmit={handleSubmit} autoComplete="off">
        <input
          ref={inputRef}
          className="searchbar-input"
          type="text"
          placeholder="搜索星球、宇宙知识..."
          value={input}
          onChange={handleInput}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
        <button className="searchbar-btn" type="submit">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7" stroke="#222" strokeWidth="2" />
            <line x1="16.0711" y1="16.4853" x2="20" y2="20" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </form>
      {showDropdown && (filteredSuggestions.length > 0 || filteredHistory.length > 0) && (
        <div className="searchbar-dropdown">
          {filteredHistory.length > 0 && (
            <div className="searchbar-section">
              <div className="searchbar-section-title searchbar-section-title-right">搜索历史</div>
              {filteredHistory.map((h, i) => (
                <div key={h + i} className="searchbar-item searchbar-item-history" onMouseDown={() => handleSelect(h)}>
                  <span className="searchbar-item-content">{h}</span>
                  <span className="searchbar-item-delete" onMouseDown={e => handleDeleteHistory(h, e)} title="删除">✕</span>
                </div>
              ))}
            </div>
          )}
          {filteredSuggestions.length > 0 && (
            <div className="searchbar-section">
              <div className="searchbar-section-title">关键词提示</div>
              {filteredSuggestions.map((s, i) => (
                <div key={s + i} className="searchbar-item" onMouseDown={() => { handleSelect(s); console.log(`search:${s}`); }}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 