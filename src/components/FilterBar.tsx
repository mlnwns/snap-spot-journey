
import React from 'react';
import { SpotTheme } from '@/types';

interface FilterBarProps {
  selectedThemes: SpotTheme[];
  onThemeChange: (themes: SpotTheme[]) => void;
}

const themeLabels: Record<SpotTheme, string> = {
  couple: '💕 커플',
  solo: '🧘 혼자',
  friends: '👥 친구들',
  content: '📹 콘텐츠',
  vintage: '🎞️ 빈티지',
  minimal: '⚪ 미니멀',
  nature: '🌿 자연',
  urban: '🏙️ 도심',
  pet: '🐕 반려동물',
  sunset: '🌅 노을',
  night: '🌙 야경'
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
    <div className="fixed top-[56px] left-0 right-0 z-40 glass-effect border-b border-blue-200">
      <div className="px-3 py-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-hide">
          <span className="text-xs font-medium text-slate-600 whitespace-nowrap mr-1">테마:</span>
          {(Object.keys(themeLabels) as SpotTheme[]).map((theme) => (
            <button
              key={theme}
              onClick={() => toggleTheme(theme)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedThemes.includes(theme)
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white/70 text-slate-600 hover:bg-white border border-blue-300'
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
