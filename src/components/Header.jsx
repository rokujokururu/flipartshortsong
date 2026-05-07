import { motion } from 'framer-motion';

export default function Header({ isVertical, onToggle, onReset, onShowAnswers, isGameComplete }) {
  return (
    <header className="w-full py-6 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* タイトル */}
        <div className="flex items-center">
          <h1 className="text-3xl sm:text-4xl font-black gradient-text tracking-tight">
            フリップ芸
          </h1>
        </div>

        {/* コントロール */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 正解を表示ボタン */}
          {!isGameComplete && (
            <motion.button
              onClick={onShowAnswers}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white shadow-card
                         text-[10px] sm:text-sm font-bold text-coral hover:shadow-card-hover
                         border border-coral/10 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>💡</span>
              <span className="whitespace-nowrap">正解を表示</span>
            </motion.button>
          )}

          {/* 縦書き切替ボタン */}
          <motion.button
            onClick={onToggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white shadow-card
                       text-[10px] sm:text-sm font-medium text-gray-600 hover:shadow-card-hover
                       transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isVertical ? '横書きに切替' : '縦書きに切替'}
          >
            <motion.span
              animate={{ rotate: isVertical ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-base sm:text-lg"
            >
              📝
            </motion.span>
            <span className="whitespace-nowrap">
              {isVertical ? '横書き' : '縦書き'}
            </span>
          </motion.button>

          {/* リセットボタン */}
          {isGameComplete && (
            <motion.button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl
                         bg-gradient-to-r from-coral to-mint text-white
                         text-sm font-bold shadow-card hover:shadow-card-hover
                         transition-all duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 もう一回
            </motion.button>
          )}
        </div>
      </div>

      {/* サブタイトル */}
      <motion.p
        className="text-center text-gray-400 text-sm mt-2 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        前半と後半を正しく組み合わせよう！
      </motion.p>
    </header>
  );
}
