import React from 'react';
import { HairstyleOption, Language } from '../types';

interface StyleCardProps {
  styleOption: HairstyleOption;
  isSelected: boolean;
  onSelect: (style: HairstyleOption) => void;
  lang: Language;
}

export const StyleCard: React.FC<StyleCardProps> = ({ styleOption, isSelected, onSelect, lang }) => {
  // Helper to get localized string
  const getName = () => {
    switch(lang) {
      case 'zh': return styleOption.name_zh || styleOption.name;
      case 'vi': return styleOption.name_vi || styleOption.name;
      case 'th': return styleOption.name_th || styleOption.name;
      default: return styleOption.name;
    }
  };

  const getDescription = () => {
    switch(lang) {
      case 'zh': return styleOption.description_zh || styleOption.description;
      case 'vi': return styleOption.description_vi || styleOption.description;
      case 'th': return styleOption.description_th || styleOption.description;
      default: return styleOption.description;
    }
  };

  return (
    <div
      onClick={() => onSelect(styleOption)}
      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 border
        ${isSelected 
          ? 'border-brand-500 bg-brand-500/10 shadow-[0_0_15px_rgba(66,133,244,0.3)] ring-1 ring-brand-500' 
          : 'border-zinc-700 hover:border-zinc-500 bg-[#28292a] hover:bg-[#353638]'
        }`}
    >
      <div className="p-4 flex flex-col h-full">
        <h4 className={`font-bold text-sm mb-2 ${isSelected ? 'text-brand-200' : 'text-zinc-200'}`}>
          {getName()}
        </h4>
        <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
          {getDescription()}
        </p>

        {isSelected && (
          <div className="absolute top-2 right-2 text-brand-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};