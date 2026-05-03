import { useReducer, useCallback, useEffect, useRef } from 'react';
import { shuffle } from '../utils/shuffle';

// アクションタイプ
const ACTIONS = {
  SELECT_LEFT: 'SELECT_LEFT',
  SELECT_RIGHT: 'SELECT_RIGHT',
  MATCH_CORRECT: 'MATCH_CORRECT',
  MATCH_INCORRECT: 'MATCH_INCORRECT',
  RESET_MATCH_RESULT: 'RESET_MATCH_RESULT',
  TOGGLE_VERTICAL: 'TOGGLE_VERTICAL',
  RESET_GAME: 'RESET_GAME',
};

function createInitialState(sentences) {
  return {
    leftItems: shuffle(sentences),
    rightItems: shuffle(sentences),
    selectedLeft: null,
    selectedRight: null,
    completed: [],
    matchResult: null, // 'correct' | 'incorrect' | null
    matchedPairId: null, // 正解時のペアID
    isVertical: false,
    isGameComplete: false,
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_LEFT: {
      // 同じアイテムを再クリックしたら選択解除
      if (state.selectedLeft?.id === action.payload.id) {
        return { ...state, selectedLeft: null };
      }
      return { ...state, selectedLeft: action.payload, matchResult: null };
    }

    case ACTIONS.SELECT_RIGHT: {
      // 同じアイテムを再クリックしたら選択解除
      if (state.selectedRight?.id === action.payload.id) {
        return { ...state, selectedRight: null };
      }
      return { ...state, selectedRight: action.payload, matchResult: null };
    }

    case ACTIONS.MATCH_CORRECT: {
      const matchedId = state.selectedLeft.id;
      const matchedSentence = state.selectedLeft;
      const newCompleted = [...state.completed, matchedSentence].sort(
        (a, b) => a.order - b.order
      );
      const newLeftItems = state.leftItems.filter((item) => item.id !== matchedId);
      const newRightItems = state.rightItems.filter((item) => item.id !== matchedId);
      const isGameComplete = newLeftItems.length === 0;

      return {
        ...state,
        leftItems: newLeftItems,
        rightItems: newRightItems,
        completed: newCompleted,
        matchResult: 'correct',
        matchedPairId: matchedId,
        isGameComplete,
      };
    }

    case ACTIONS.MATCH_INCORRECT: {
      return {
        ...state,
        matchResult: 'incorrect',
      };
    }

    case ACTIONS.RESET_MATCH_RESULT: {
      return {
        ...state,
        selectedLeft: null,
        selectedRight: null,
        matchResult: null,
        matchedPairId: null,
      };
    }

    case ACTIONS.TOGGLE_VERTICAL: {
      return { ...state, isVertical: !state.isVertical };
    }

    case ACTIONS.RESET_GAME: {
      return createInitialState(action.payload);
    }

    default:
      return state;
  }
}

export function useGameReducer(sentences) {
  const [state, dispatch] = useReducer(gameReducer, sentences, createInitialState);
  const timeoutRef = useRef(null);

  // 左右が両方選択された時に判定を実行
  useEffect(() => {
    if (state.selectedLeft && state.selectedRight && state.matchResult === null) {
      if (state.selectedLeft.id === state.selectedRight.id) {
        // 正解
        dispatch({ type: ACTIONS.MATCH_CORRECT });
        timeoutRef.current = setTimeout(() => {
          dispatch({ type: ACTIONS.RESET_MATCH_RESULT });
        }, 800);
      } else {
        // 不正解
        dispatch({ type: ACTIONS.MATCH_INCORRECT });
        timeoutRef.current = setTimeout(() => {
          dispatch({ type: ACTIONS.RESET_MATCH_RESULT });
        }, 600);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state.selectedLeft, state.selectedRight, state.matchResult]);

  const selectLeft = useCallback((item) => {
    dispatch({ type: ACTIONS.SELECT_LEFT, payload: item });
  }, []);

  const selectRight = useCallback((item) => {
    dispatch({ type: ACTIONS.SELECT_RIGHT, payload: item });
  }, []);

  const toggleVertical = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_VERTICAL });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: ACTIONS.RESET_GAME, payload: sentences });
  }, [sentences]);

  return {
    state,
    selectLeft,
    selectRight,
    toggleVertical,
    resetGame,
  };
}
