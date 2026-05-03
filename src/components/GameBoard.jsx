import SentenceColumn from './SentenceColumn';

export default function GameBoard({
  leftItems,
  rightItems,
  selectedLeft,
  selectedRight,
  matchResult,
  matchedPairId,
  onSelectLeft,
  onSelectRight,
  isVertical,
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8">
      <div className={`flex gap-4 sm:gap-6 ${
        isVertical ? 'flex-row' : 'flex-col sm:flex-row'
      }`}>
        {/* 左カラム（前半） */}
        <SentenceColumn
          items={leftItems}
          side="left"
          selectedItem={selectedLeft}
          matchResult={matchResult}
          matchedPairId={matchedPairId}
          onSelect={onSelectLeft}
          isVertical={isVertical}
        />

        {/* 区切り線 */}
        <div className={`flex-shrink-0 flex items-center justify-center ${
          isVertical
            ? 'w-px self-stretch'
            : 'hidden sm:flex w-px self-stretch'
        }`}>
          <div className={`${
            isVertical
              ? 'h-full w-0.5 divider-gradient rounded-full'
              : 'h-full w-0.5 divider-gradient rounded-full'
          }`} />
        </div>

        {/* モバイル用横区切り */}
        <div className="sm:hidden h-px w-full divider-gradient-horizontal rounded-full" 
             style={{ display: isVertical ? 'none' : undefined }} />

        {/* 右カラム（後半） */}
        <SentenceColumn
          items={rightItems}
          side="right"
          selectedItem={selectedRight}
          matchResult={matchResult}
          matchedPairId={matchedPairId}
          onSelect={onSelectRight}
          isVertical={isVertical}
        />
      </div>
    </div>
  );
}
