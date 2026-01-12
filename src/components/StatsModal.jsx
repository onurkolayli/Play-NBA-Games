import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function StatsModal({
	isOpen,
	onClose,
	secretPlayer,
	guesses,
	cluesUsed,
	stats,
	isWon,
	onPlayAgain,
}) {
	const [showAnswer, setShowAnswer] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShowAnswer(false);
		}
	}, [isOpen]);

	const handleClose = () => {
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
					onClick={handleClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
						className="glass rounded-2xl p-8 max-w-md w-full"
					>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-white">
								{isWon ? 'Congratulations! 🎉' : 'Game Over'}
							</h2>
							<button
								onClick={handleClose}
								className="text-gray-400 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="mb-6">
							<div className="text-center mb-4">
								<div className="text-sm text-gray-400 mb-2">Secret Player</div>
								<div
									className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent ${
										!isWon && !showAnswer ? 'blur-md select-none' : ''
									}`}
								>
									{secretPlayer?.name || '???'}
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 mb-6">
							<div className="glass rounded-lg p-4 text-center">
								<div className="text-gray-400 text-sm mb-1">Total Tries</div>
								<div className="text-2xl font-bold text-white">
									{guesses.length}
								</div>
							</div>
							<div className="glass rounded-lg p-4 text-center">
								<div className="text-gray-400 text-sm mb-1">Clues Used</div>
								<div className="text-2xl font-bold text-white">{cluesUsed}</div>
							</div>
							<div className="glass rounded-lg p-4 text-center">
								<div className="text-gray-400 text-sm mb-1">Success Rate</div>
								<div className="text-2xl font-bold text-white">
									{stats.gamesPlayed > 0
										? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
										: 0}
									%
								</div>
							</div>
							<div className="glass rounded-lg p-4 text-center">
								<div className="text-gray-400 text-sm mb-1">Current Streak</div>
								<div className="text-2xl font-bold text-white">
									{stats.currentStreak}
								</div>
							</div>
							<div className="glass rounded-lg p-4 text-center col-span-2">
								<div className="text-gray-400 text-sm mb-1">Best Streak</div>
								<div className="text-2xl font-bold text-white">
									{stats.bestStreak}
								</div>
							</div>
						</div>

						{!isWon && !showAnswer && (
							<button
								onClick={() => setShowAnswer(true)}
								className="w-full mb-3 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg text-white font-bold transition-all transform hover:scale-105"
							>
								Reveal Answer
							</button>
						)}

						<button
							onClick={() => {
								handleClose();
								onPlayAgain();
							}}
							className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-bold transition-all transform hover:scale-105"
						>
							Play Again
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
