import { useState } from 'react';
import { useTicTacToe } from './hooks/useTicTacToe';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import WinnerModal from './components/WinnerModal';
import PlayerSetup from './components/PlayerSetup';
import { RotateCcw, Users, Trophy } from 'lucide-react';

function App() {
  const [players, setPlayers] = useState(null);

  const {
    board,
    isXNext,
    winner,
    winningLine,
    scores,
    handleClick,
    resetGame,
    resetScores,
  } = useTicTacToe(players?.mode);

  const handleStartGame = (playerData) => {
    setPlayers(playerData);
  };

  const handleChangeNames = () => {
    setPlayers(null);
    resetScores();
  };

  if (!players) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px]" />
        <PlayerSetup onStartGame={handleStartGame} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[120px]" />

      <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight text-center">
        {players.title}
      </h1>

      <ScoreBoard scores={scores} isXNext={isXNext} players={players} />

      <Board
        board={board}
        onClick={handleClick}
        winningLine={winningLine}
        winner={winner}
      />

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all duration-300"
        >
          <RotateCcw size={18} />
          Reset Game
        </button>
        <button
          onClick={resetScores}
          className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all duration-300"
        >
          <Trophy size={18} />
          Reset Scores
        </button>
        <button
          onClick={handleChangeNames}
          className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all duration-300"
        >
          <Users size={18} />
          Change Names
        </button>
      </div>

      <WinnerModal winner={winner} onReset={resetGame} players={players} />
    </div>
  );
}

export default App;
