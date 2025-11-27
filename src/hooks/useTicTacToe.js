import { useState, useCallback, useEffect } from 'react';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function useTicTacToe(gameMode = 'pvp') {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [scores, setScores] = useState({ x: 0, o: 0 });

  const checkWinner = useCallback((currentBoard) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: WINNING_COMBINATIONS[i] };
      }
    }
    if (!currentBoard.includes(null)) {
      return { winner: 'Draw', line: null };
    }
    return null;
  }, []);

  const handleClick = useCallback(
    (index) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result.winner);
        setWinningLine(result.line);
        if (result.winner !== 'Draw') {
          setScores((prev) => ({
            ...prev,
            [result.winner.toLowerCase()]: prev[result.winner.toLowerCase()] + 1,
          }));
        }
      }
    },
    [board, isXNext, winner, checkWinner]
  );

  useEffect(() => {
    if (gameMode === 'pvai' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        // AI Logic
        // 1. Check for winning move
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
          const [a, b, c] = WINNING_COMBINATIONS[i];
          const squares = [board[a], board[b], board[c]];
          if (squares.filter((s) => s === 'O').length === 2 && squares.includes(null)) {
            const emptyIndex = [a, b, c].find((index) => board[index] === null);
            handleClick(emptyIndex);
            return;
          }
        }

        // 2. Block player winning move
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
          const [a, b, c] = WINNING_COMBINATIONS[i];
          const squares = [board[a], board[b], board[c]];
          if (squares.filter((s) => s === 'X').length === 2 && squares.includes(null)) {
            const emptyIndex = [a, b, c].find((index) => board[index] === null);
            handleClick(emptyIndex);
            return;
          }
        }

        // 3. Take center
        if (board[4] === null) {
          handleClick(4);
          return;
        }

        // 4. Random move
        const emptyIndices = board
          .map((square, index) => (square === null ? index : null))
          .filter((val) => val !== null);

        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          handleClick(randomIndex);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [board, isXNext, winner, gameMode, handleClick]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  }, []);

  const resetScores = useCallback(() => {
    setScores({ x: 0, o: 0 });
    resetGame();
  }, [resetGame]);

  return {
    board,
    isXNext,
    winner,
    winningLine,
    scores,
    handleClick,
    resetGame,
    resetScores,
  };
}
