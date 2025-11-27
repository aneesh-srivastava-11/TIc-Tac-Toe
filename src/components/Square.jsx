import { motion } from 'framer-motion';

const Square = ({ value, onClick, isWinningSquare, disabled }) => {
    return (
        <motion.button
            whileHover={!value && !disabled ? { scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}}
            whileTap={!value && !disabled ? { scale: 0.95 } : {}}
            className={`
        h-20 w-20 sm:h-32 sm:w-32 bg-white/5 backdrop-blur-sm border-2 rounded-xl text-3xl sm:text-6xl flex items-center justify-center cursor-pointer transition-colors duration-300
        ${isWinningSquare ? 'border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]' : 'border-white/10'}
        ${value === 'X' ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]'}
        ${disabled && !isWinningSquare ? 'opacity-50 cursor-default' : ''}
      `}
            onClick={onClick}
            disabled={disabled}
        >
            {value && (
                <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {value}
                </motion.span>
            )}
        </motion.button>
    );
};

export default Square;
