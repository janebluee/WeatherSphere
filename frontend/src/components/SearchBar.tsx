import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 
                      rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 
                      group-hover:duration-500"></div>
        
        <div className="relative flex items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 lg:px-5 py-2 lg:py-3 bg-white/5 border border-white/10 
                     rounded-xl text-white placeholder-blue-200/50 outline-none 
                     focus:ring-2 focus:ring-blue-500/50 transition-all duration-500 
                     backdrop-blur-xl text-sm lg:text-base group-hover:bg-white/10
                     group-hover:border-white/20"
          />
          
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 lg:px-5 py-1.5 lg:py-2
                     bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-lg text-white
                     font-medium transition-all duration-500 backdrop-blur-xl hover:backdrop-blur-2xl
                     border border-white/10 hover:border-white/20 hover:scale-105
                     hover:from-blue-500/40 hover:to-indigo-500/40
                     text-xs lg:text-sm shadow-lg hover:shadow-blue-500/25"
          >
            <span className="relative z-10">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};
