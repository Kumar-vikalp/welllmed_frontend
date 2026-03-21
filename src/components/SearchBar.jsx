import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export default function SearchBar({ onSearch, placeholder = "Search medicines, health products..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="neo-input w-full pl-6 pr-24 placeholder:font-bold placeholder:uppercase"
        />
        
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 border-2 border-transparent hover:border-neo-ink hover:bg-neo-secondary"
            onClick={handleClear}
          >
            <svg className="w-5 h-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        )}
        
        <Button
          variant="primary"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 rotate-1"
          type="submit"
        >
          <svg className="w-5 h-5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Button>
      </div>
      
      {/* Search suggestions could go here */}
    </motion.form>
  );
}