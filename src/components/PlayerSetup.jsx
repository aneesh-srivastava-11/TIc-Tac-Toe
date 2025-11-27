import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight, Gamepad2 } from 'lucide-react';

const PlayerSetup = ({ onStartGame }) => {
    const [playerX, setPlayerX] = useState('');
    const [playerO, setPlayerO] = useState('');
    const [gameTitle, setGameTitle] = useState('TIC TAC TOE');
    const [gameMode, setGameMode] = useState('pvp'); // 'pvp' or 'pvai'

    const handleSubmit = (e) => {
        e.preventDefault();
        onStartGame({
            x: playerX.trim() || 'Player X',
            o: gameMode === 'pvai' ? 'Computer' : (playerO.trim() || 'Player O'),
            title: gameTitle.trim() || 'TIC TAC TOE',
            mode: gameMode,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-[#1e293b]/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl"
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Game Setup
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-white/80 font-medium flex items-center gap-2">
                            <Gamepad2 size={18} />
                            Game Title
                        </label>
                        <input
                            type="text"
                            value={gameTitle}
                            onChange={(e) => setGameTitle(e.target.value)}
                            placeholder="Enter game title..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-1 bg-black/20 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setGameMode('pvp')}
                            className={`py-2 rounded-lg font-medium transition-all ${gameMode === 'pvp'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            PvP
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setGameMode('pvai');
                                setPlayerO('Computer');
                            }}
                            className={`py-2 rounded-lg font-medium transition-all ${gameMode === 'pvai'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-white/50 hover:text-white/80'
                                }`}
                        >
                            PvAI
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-cyan-400 font-medium flex items-center gap-2">
                            <User size={18} />
                            Player X (Cyan)
                        </label>
                        <input
                            type="text"
                            value={playerX}
                            onChange={(e) => setPlayerX(e.target.value)}
                            placeholder="Enter name..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-fuchsia-400 font-medium flex items-center gap-2">
                            <User size={18} />
                            Player O (Fuchsia)
                        </label>
                        <input
                            type="text"
                            value={gameMode === 'pvai' ? 'Computer' : playerO}
                            onChange={(e) => setPlayerO(e.target.value)}
                            disabled={gameMode === 'pvai'}
                            placeholder="Enter name..."
                            className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all ${gameMode === 'pvai' ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        Start Game
                        <ArrowRight size={20} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default PlayerSetup;
