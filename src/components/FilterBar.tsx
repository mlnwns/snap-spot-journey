
import React from 'react';
import { SpotTheme } from '@/types';

interface FilterBarProps {
  selectedThemes: SpotTheme[];
  onThemeChange: (themes: SpotTheme[]) => void;
}

const themeLabels: Record<SpotTheme, string> = {
  couple: '커플',
  solo: '혼자',
  friends: '친구들',
  content: '콘텐츠',
  vintage: '빈티지',
  minimal: '미니멀',
  nature: '자연',
  urban: '도심',
  pet: '반려동물'
};

const FilterBar = ({ selectedThemes, onThemeChange }: FilterBarProps) => {
  const toggleTheme = (theme: SpotTheme) => {
    if (selectedThemes.includes(theme)) {
      onThemeChange(selectedThemes.filter(t => t !== theme));
    } else {
      onThemeChange([...selectedThemes, theme]);
    }
  };

  return (
    <div className="fixed top-20 left-0 right-0 z-40 glass-effect border-b border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap mr-2">테마:</span>
          {(Object.keys(themeLabels) as SpotTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => toggleTheme(theme)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedThemes.includes(theme)
                  ? 'bg-coral-500 text-white shadow-md'
                  : 'bg-white/70 text-gray-600 hover:bg-white'
              }`}
            >
              {themeLabels[theme]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
