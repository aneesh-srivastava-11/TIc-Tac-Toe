import { motion } from 'framer-motion';

const ScoreBoard = ({ scores, isXNext, players }) => {
    return (
        <div className="flex justify-between items-center w-full max-w-md mb-6 px-4 gap-2">
            <div className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 flex-1 ${isXNext ? 'bg-cyan-500/20 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-white/5 border border-white/10'}`}>
                <span className="text-cyan-400 font-bold text-sm sm:text-xl mb-1 truncate w-full text-center">{players.x}</span>
                <span className="text-2xl sm:text-3xl font-mono text-white">{scores.x}</span>
            </div>

            <div className="text-white/50 font-mono text-lg sm:text-xl">VS</div>

            <div className={`flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 flex-1 ${!isXNext ? 'bg-fuchsia-500/20 border border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'bg-white/5 border border-white/10'}`}>
                <span className="text-fuchsia-400 font-bold text-sm sm:text-xl mb-1 truncate w-full text-center">{players.o}</span>
                <span className="text-2xl sm:text-3xl font-mono text-white">{scores.o}</span>
            </div>
        </div>
    );
};

export default ScoreBoard;
