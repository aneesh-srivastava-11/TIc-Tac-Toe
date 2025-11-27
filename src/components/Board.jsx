import Square from './Square';

const Board = ({ board, onClick, winningLine, winner }) => {
    return (
        <div className="grid grid-cols-3 gap-3 p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            {board.map((square, i) => (
                <Square
                    key={i}
                    value={square}
                    onClick={() => onClick(i)}
                    isWinningSquare={winningLine?.includes(i)}
                    disabled={!!square || (!!winner && winner !== 'Draw')}
                />
            ))}
        </div>
    );
};

export default Board;
