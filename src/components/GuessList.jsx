import { GuessItem } from './GuessItem';

export function GuessList({ guesses }) {
	// Sort guesses by rank (best first)
	// Sort guesses by rank (best first)
	const sortedGuesses = [...guesses].sort((a, b) => a.rank - b.rank);

	const gridClass =
		'grid grid-cols-[minmax(0,1.5fr)_70px_70px_minmax(0,2fr)_minmax(0,1fr)_80px_80px] gap-2 items-center pl-4';

	return (
		<div className="space-y-2">
			{/* Header Row */}
			<div
				className={`${gridClass} pr-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:grid`}
			>
				<div className="text-left">Name</div>
				<div className="text-center">Team</div>
				<div className="text-center">Pos</div>
				<div className="text-center">College</div>
				<div className="text-center">Country</div>
				<div className="text-center">Draft</div>
				<div className="text-right">Rank</div>
			</div>

			<div className="space-y-3">
				{sortedGuesses.map((guess, index) => (
					<GuessItem
						key={guess.name}
						guess={guess}
						index={index}
						gridClass={gridClass}
					/>
				))}
			</div>
		</div>
	);
}
