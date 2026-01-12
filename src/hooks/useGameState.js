import { useState, useEffect, useCallback } from 'react';
import { calculateRankings } from '../utils/similarity';
import { useLocalStorage } from './useLocalStorage';

export function useGameState(players) {
	const [secretPlayer, setSecretPlayer] = useState(null);
	const [guesses, setGuesses] = useState([]);
	const [rankings, setRankings] = useState({});
	const [isGameOver, setIsGameOver] = useState(false);
	const [cluesUsed, setCluesUsed] = useState(0);
	const [stats, setStats] = useLocalStorage('nbaContextoStats', {
		gamesPlayed: 0,
		gamesWon: 0,
		currentStreak: 0,
		bestStreak: 0,
		totalGuesses: 0,
	});

	// Start new game
	const startNewGame = useCallback(() => {
		if (players.length === 0) return;

		const randomPlayer = players[Math.floor(Math.random() * players.length)];

		//TODO Remove line
		console.log('randomPlayer', randomPlayer);

		setSecretPlayer(randomPlayer);
		setGuesses([]);
		setIsGameOver(false);
		setCluesUsed(0);

		const newRankings = calculateRankings(players, randomPlayer);
		setRankings(newRankings);
	}, [players]);

	// Initialize game when players are loaded
	useEffect(() => {
		if (players.length > 0 && !secretPlayer) {
			startNewGame();
		}
	}, [players, secretPlayer, startNewGame]);

	// Make a guess
	const makeGuess = useCallback(
		(playerName) => {
			if (isGameOver) return;
			if (guesses.some((g) => g.name === playerName)) return;

			const rank = rankings[playerName];
			const playerDetails = players.find((p) => p.name === playerName);
			const newGuesses = [
				...guesses,
				{
					name: playerName,
					rank,
					teamAbbreviation: playerDetails?.teamAbbreviation,
					position: playerDetails?.position,
					college: playerDetails?.college,
					country: playerDetails?.country,
					draftYear: playerDetails?.draftYear,
				},
			];
			setGuesses(newGuesses);

			// Check if won
			if (rank === 1) {
				setIsGameOver(true);
				setStats((prev) => ({
					...prev,
					gamesPlayed: prev.gamesPlayed + 1,
					gamesWon: prev.gamesWon + 1,
					currentStreak: prev.currentStreak + 1,
					bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
					totalGuesses: prev.totalGuesses + newGuesses.length,
				}));
			}
		},
		[isGameOver, guesses, rankings, setStats]
	);

	// Reveal clue
	const revealClue = useCallback(() => {
		if (isGameOver || guesses.length === 0) return;

		const bestRank = Math.min(...guesses.map((g) => g.rank));
		if (bestRank <= 2) return;

		const targetRank = Math.round(bestRank / 2);
		const cluePlayer = Object.entries(rankings).find(
			([, rank]) => rank === targetRank
		);

		if (cluePlayer) {
			setCluesUsed((prev) => prev + 1);
			makeGuess(cluePlayer[0]);
		}
	}, [isGameOver, guesses, rankings, makeGuess]);

	// Give up
	const giveUp = useCallback(() => {
		setIsGameOver(true);
		setStats((prev) => ({
			...prev,
			gamesPlayed: prev.gamesPlayed + 1,
			currentStreak: 0,
		}));
	}, [setStats]);

	// Check if reveal button should be enabled
	const canRevealClue =
		guesses.length > 0 &&
		!isGameOver &&
		Math.min(...guesses.map((g) => g.rank)) > 2;

	return {
		secretPlayer,
		guesses,
		rankings,
		isGameOver,
		cluesUsed,
		stats,
		canRevealClue,
		makeGuess,
		revealClue,
		giveUp,
		startNewGame,
	};
}
