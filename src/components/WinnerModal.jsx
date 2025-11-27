import { motion, AnimatePresence } from 'framer-motion';

const WinnerModal = ({ winner, onReset, players }) => {
    return (
        <AnimatePresence>
            {winner && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.5, y: 50 }}
                        className="bg-[#1e293b] border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full text-center"
                    >
                        <h2 className="text-4xl font-bold mb-2 text-white">
                            {winner === 'Draw' ? 'Draw!' : 'Winner!'}
                        </h2>
                        <div className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                            {winner === 'Draw' ? '🤝' : `${players[winner.toLowerCase()]}`}
                        </div>

                        <button
                            onClick={onReset}
                            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95"
                        >
                            Play Again
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WinnerModal;
