import { useState } from 'react';
import { useNBAPlayers } from '../hooks/useNBAPlayers';
import { useGameState } from '../hooks/useGameState';
import { Header } from './Header';
import { LoadingIndicator } from './LoadingIndicator';
import { SearchBar } from './SearchBar';
import { GuessList } from './GuessList';
import { StatsModal } from './StatsModal';
import { HowToPlayModal } from './HowToPlayModal';
import { getRankColor } from '../utils/similarity';

export function NBAContextoGame() {
	const { players, loading, error } = useNBAPlayers();
	const {
		secretPlayer,
		guesses,
		isGameOver,
		cluesUsed,
		stats,
		canRevealClue,
		makeGuess,
		revealClue,
		giveUp,
		startNewGame,
	} = useGameState(players);

	const [showStatsModal, setShowStatsModal] = useState(false);
	const [showHelpModal, setShowHelpModal] = useState(false);

	const lastGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null;

	const handleGiveUp = () => {
		giveUp();
		setShowStatsModal(true);
	};

	// Show modal when game is over
	if (isGameOver && !showStatsModal) {
		setTimeout(() => setShowStatsModal(true), 500);
	}

	return (
		<div className="min-h-screen p-4 md:p-8">
			<div className="max-w-7xl mx-auto relative">
				<button
					onClick={() => setShowHelpModal(true)}
					className="fixed top-6 left-6 z-50 p-2 text-white/50 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full"
					title="How to Play"
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
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
				<Header onRandomGame={startNewGame} />

				{loading ? (
					<LoadingIndicator />
				) : (
					<>
						<div className="glass rounded-2xl p-6 md:p-8 mb-6">
							<SearchBar
								players={players}
								onSelectPlayer={makeGuess}
								disabled={isGameOver}
							/>

							{lastGuess && (
								<div className="mt-6 mb-4 animate-fadeIn">
									<div className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-bold text-center">
										Last Guess
									</div>
									<div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50">
										{/* Progress Bar Background */}
										<div
											className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${getRankColor(
												lastGuess.rank
											)}`}
											style={{
												width: `${Math.max(
													5,
													Math.round(
														((players.length - lastGuess.rank) /
															players.length) *
															100
													)
												)}%`,
											}}
										/>
										{/* Content */}
										<div className="relative z-10 p-4 flex items-center justify-between text-white text-shadow-sm">
											<div className="font-bold text-lg drop-shadow-md">
												{lastGuess.name}
											</div>
											<div className="font-mono font-bold text-2xl drop-shadow-md">
												#{lastGuess.rank}
											</div>
										</div>
									</div>
								</div>
							)}

							<div className="flex items-center justify-between mt-6 mb-4">
								<button
									onClick={revealClue}
									disabled={!canRevealClue}
									className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
										canRevealClue
											? 'bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer transform hover:scale-105'
											: 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
									}`}
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
										/>
									</svg>
									Reveal Clue
								</button>

								<div className="text-white font-medium">
									{guesses.length} GUESS{guesses.length !== 1 ? 'ES' : ''}
								</div>

								<button
									onClick={handleGiveUp}
									disabled={isGameOver}
									className={`px-6 py-3 rounded-lg font-medium transition-all ${
										isGameOver
											? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
											: 'bg-red-500 hover:bg-red-600 text-white cursor-pointer transform hover:scale-105'
									}`}
								>
									Give Up
								</button>
							</div>

							{guesses.length > 0 && (
								<div className="mt-6">
									<GuessList guesses={guesses} />
								</div>
							)}
						</div>
					</>
				)}

				{error && (
					<div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm">
						{error}
					</div>
				)}

				<StatsModal
					isOpen={showStatsModal}
					onClose={() => setShowStatsModal(false)}
					secretPlayer={secretPlayer}
					guesses={guesses}
					cluesUsed={cluesUsed}
					stats={stats}
					isWon={guesses.some((g) => g.rank === 1)}
					onPlayAgain={startNewGame}
				/>

				<HowToPlayModal
					isOpen={showHelpModal}
					onClose={() => setShowHelpModal(false)}
				/>
			</div>
		</div>
	);
}
