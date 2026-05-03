import { motion } from 'framer-motion';

export default function SentenceCard({
  sentence,
  side,
  isSelected,
  matchResult,
  matchedPairId,
  onClick,
  isVertical,
}) {
  const text = side === 'left' ? sentence.first : sentence.second;

  // カード状態に応じたクラス
  const getCardClass = () => {
    if (matchResult === 'correct' && matchedPairId === sentence.id) {
      return 'card-correct';
    }
    if (matchResult === 'incorrect' && isSelected) {
      return 'card-incorrect';
    }
    if (isSelected) {
      return side === 'left' ? 'card-selected-left' : 'card-selected-right';
    }
    return '';
  };

  // Framer Motionのバリアント
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        y: { type: 'spring', stiffness: 300, damping: 25 },
      }}
      onClick={() => onClick(sentence)}
      className={`card-base px-5 py-4 ${getCardClass()} ${
        isVertical ? 'vertical-mode min-h-[120px] py-6 px-3' : ''
      }`}
      whileHover={!isSelected && matchResult === null ? { scale: 1.03, y: -2 } : {}}
      whileTap={{ scale: 0.98 }}
      id={`card-${side}-${sentence.id}`}
    >
      <p className={`text-base font-medium text-gray-700 leading-relaxed ${
        isVertical ? 'text-sm' : ''
      }`}>
        {text}
      </p>
    </motion.div>
  );
}
