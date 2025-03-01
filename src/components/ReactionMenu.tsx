
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { reactionsList } from '../utils/emojisPosts';

interface ReactionMenuProps {
  isOpen: boolean;
  onSelect: (type: string) => void;
  currentReaction?: string | null;
}

const ReactionMenu = ({ isOpen, onSelect, currentReaction }: ReactionMenuProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Pre-load all reaction images when component mounts
  useEffect(() => {
    reactionsList.forEach(({ emoji }) => {
      const img = new Image();
      img.src = emoji;
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn(
      "absolute bottom-full left-0 mb-2 p-6 rounded-3xl bg-gray-900/95 border border-gray-800 shadow-lg transition-all duration-200 z-50 w-[450px]",
      isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    )}>
      <div className="grid grid-cols-3 gap-6">
        {reactionsList.map(({ emoji, type, label }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl transition-all hover:bg-gray-800",
              currentReaction === type && "bg-gray-800 scale-110"
            )}
          >
            <img 
              src={emoji} 
              alt={label} 
              className="w-16 h-16 mb-2"
              loading="eager" 
            />
            <span className="text-gray-300 text-sm font-medium text-center whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReactionMenu;
