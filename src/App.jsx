import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import CompletedArea from './components/CompletedArea';
import Confetti from './components/Confetti';
import { useGameReducer } from './hooks/useGameReducer';
import sentences from './data/sentences.json';

export default function App() {
  const { state, selectLeft, selectRight, toggleVertical, resetGame } =
    useGameReducer(sentences);

  return (
    <div className="min-h-screen pb-12">
      {/* 紙吹雪 */}
      <Confetti isActive={state.isGameComplete} />

      {/* ヘッダー */}
      <Header
        isVertical={state.isVertical}
        onToggle={toggleVertical}
        onReset={resetGame}
        isGameComplete={state.isGameComplete}
      />

      {/* ステータスバー */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-6">
        <div className="flex items-center justify-center gap-4">
          <AnimatePresence mode="wait">
            {state.matchResult === 'correct' && (
              <motion.div
                key="correct"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                           bg-success/20 text-green-700 font-bold text-sm"
              >
                <span className="text-lg">✅</span>
                完成！
              </motion.div>
            )}
            {state.matchResult === 'incorrect' && (
              <motion.div
                key="incorrect"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                           bg-failure/20 text-red-700 font-bold text-sm"
              >
                <span className="text-lg">❌</span>
                もう一度！
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ゲームボード */}
      <GameBoard
        leftItems={state.leftItems}
        rightItems={state.rightItems}
        selectedLeft={state.selectedLeft}
        selectedRight={state.selectedRight}
        matchResult={state.matchResult}
        matchedPairId={state.matchedPairId}
        onSelectLeft={selectLeft}
        onSelectRight={selectRight}
        isVertical={state.isVertical}
      />

      {/* 完成エリア */}
      <CompletedArea
        completed={state.completed}
        isVertical={state.isVertical}
        total={sentences.length}
      />

      {/* 全問正解メッセージ */}
      <AnimatePresence>
        {state.isGameComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="max-w-5xl mx-auto px-4 sm:px-8 mt-8"
          >
            <div className="text-center py-8 px-6 rounded-3xl
                            bg-gradient-to-br from-coral/10 via-white to-mint/10
                            border border-coral/20 shadow-card">
              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎊
              </motion.div>
              <h2 className="text-2xl font-black gradient-text mb-2">
                完成！
              </h2>
              <p className="text-gray-500 font-medium">
                すべての短歌を正しく組み合わせました！
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* フッター */}
      <footer className="text-center text-gray-300 text-xs mt-12 pb-4">
        フリップ芸｜六条くるるweb歌集
      </footer>
    </div>
  );
}
