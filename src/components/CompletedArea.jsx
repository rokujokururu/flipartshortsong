import { motion, AnimatePresence } from 'framer-motion';

export default function CompletedArea({ completed, isVertical, total }) {
  if (completed.length === 0) return null;

  const progress = Math.round((completed.length / total) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-8">
      {/* セクションヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎉</span>
          <h2 className="text-lg font-bold text-gray-700">完成した短歌</h2>
          <span className="text-sm font-medium text-gray-400">
            {completed.length} / {total}
          </span>
        </div>

        {/* プログレスバー */}
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs ml-4">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-coral to-mint"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </div>
          <span className="text-xs font-bold text-gray-400">{progress}%</span>
        </div>
      </div>

      {/* 縦書きモード：横スクロール1行1ページレイアウト */}
      {isVertical ? (
        <div
          className="flex flex-row-reverse gap-6 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <AnimatePresence>
            {[...completed].reverse().map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 22,
                  delay: 0.08,
                }}
                className="flex-shrink-0 relative"
                style={{ height: '360px', width: '80px' }}
              >
                {/* 番号バッジ */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full
                                bg-gradient-to-br from-coral to-mint
                                flex items-center justify-center
                                text-white text-xs font-bold shadow-md z-10">
                  {item.order}
                </div>

                <div
                  className="bg-white rounded-2xl shadow-card border-t-4 border-success
                             h-full w-full flex items-start justify-center pt-6 px-3"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                  }}
                >
                  <p className="text-gray-700 font-medium leading-loose text-base">
                    <span className="text-coral font-bold">{item.first}</span>
                    <span className="text-mint font-bold">{item.second}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* 横書きモード：グリッドレイアウト */
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          <AnimatePresence>
            {completed.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.1,
                }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-card p-4 border-l-4 border-success">
                  {/* 番号バッジ */}
                  <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full
                                  bg-gradient-to-br from-coral to-mint
                                  flex items-center justify-center
                                  text-white text-xs font-bold shadow-md">
                    {item.order}
                  </div>

                  <p className="text-gray-700 font-medium leading-relaxed">
                    <span className="text-coral font-bold">{item.first}</span>
                    <span className="text-mint font-bold">{item.second}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
