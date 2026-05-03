import { AnimatePresence } from 'framer-motion';
import SentenceCard from './SentenceCard';

export default function SentenceColumn({
  items,
  side,
  selectedItem,
  matchResult,
  matchedPairId,
  onSelect,
  isVertical,
}) {
  const label = side === 'left' ? '前半' : '後半';
  const labelColor = side === 'left' ? 'text-coral' : 'text-mint';
  const bgGradient = side === 'left'
    ? 'from-coral/5 to-transparent'
    : 'from-mint/5 to-transparent';

  return (
    <div className={`flex-1 ${isVertical ? 'min-w-[200px]' : ''}`}>
      {/* カラムヘッダー */}
      <div className={`text-center mb-4 ${isVertical ? 'mb-6' : ''}`}>
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold
          bg-gradient-to-r ${bgGradient} ${labelColor}`}>
          {label}
        </span>
      </div>

      {/* カードリスト */}
      <div className={`flex flex-col gap-3 ${
        isVertical ? 'flex-row gap-4 overflow-x-auto pb-2' : ''
      }`}
        style={isVertical ? { display: 'flex', flexDirection: 'row', gap: '1rem' } : {}}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <SentenceCard
              key={item.id}
              sentence={item}
              side={side}
              isSelected={selectedItem?.id === item.id}
              matchResult={matchResult}
              matchedPairId={matchedPairId}
              onClick={onSelect}
              isVertical={isVertical}
            />
          ))}
        </AnimatePresence>

        {/* 空状態 */}
        {items.length === 0 && (
          <div className="flex items-center justify-center h-32 rounded-2xl
                          border-2 border-dashed border-gray-200 text-gray-300">
            <span className="text-2xl">✨</span>
          </div>
        )}
      </div>
    </div>
  );
}
