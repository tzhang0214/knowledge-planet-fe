import React, { useState } from 'react';
import './App.css';
import Planet from './Planet';
import SearchBar from './SearchBar';
// import planetImg1 from './planet1.png'; // 如有单独星球图片可引入

const planets = [
  {
    id: 1,
    size: 120,
    left: '12%',
    top: '30%',
    floatDuration: 4,
    floatDelay: '0s',
    // imgSrc: planetImg1,
  },
  {
    id: 2,
    size: 90,
    left: '60%',
    top: '18%',
    floatDuration: 5,
    floatDelay: '1s',
  },
  {
    id: 3,
    size: 70,
    left: '40%',
    top: '60%',
    floatDuration: 4.5,
    floatDelay: '0.5s',
  },
  {
    id: 4,
    size: 100,
    left: '75%',
    top: '50%',
    floatDuration: 6,
    floatDelay: '1.5s',
  },
  {
    id: 5,
    size: 60,
    left: '25%',
    top: '70%',
    floatDuration: 5.5,
    floatDelay: '0.8s',
  },
  // 可继续添加更多星球
];

function App() {
  // 可在此处管理搜索历史和关键词提示
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="App" style={{ background: '#10182a', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <SearchBar
        searchHistory={searchHistory}
        setSearchHistory={setSearchHistory}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />
      {/* 星球背景可选加星空图层 */}
      {planets.map((planet) => (
        <Planet key={planet.id} {...planet} />
      ))}
    </div>
  );
}

export default App;
