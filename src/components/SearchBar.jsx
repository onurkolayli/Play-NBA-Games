import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar({ players, onSelectPlayer, disabled }) {
	const [query, setQuery] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const filteredPlayers =
		query.length >= 2
			? players
					.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
					.slice(0, 8)
			: [];

	const handleSelect = (player) => {
		onSelectPlayer(player.name);
		setQuery('');
		setShowDropdown(false);
		setSelectedIndex(0);
	};

	const handleKeyDown = (e) => {
		if (filteredPlayers.length === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setSelectedIndex((prev) => (prev + 1) % filteredPlayers.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSelectedIndex(
				(prev) => (prev - 1 + filteredPlayers.length) % filteredPlayers.length
			);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			handleSelect(filteredPlayers[selectedIndex]);
		}
	};

	return (
		<div className="relative">
			<input
				type="text"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setShowDropdown(true);
					setSelectedIndex(0);
				}}
				onKeyDown={handleKeyDown}
				onFocus={() => setShowDropdown(true)}
				onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
				disabled={disabled}
				placeholder="Search NBA Player..."
				className="w-full px-6 py-4 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
			/>

			<AnimatePresence>
				{showDropdown && filteredPlayers.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden z-50 shadow-2xl maxHeight-60 overflow-y-auto"
					>
						{filteredPlayers.map((player, index) => (
							<button
								key={index}
								onClick={() => handleSelect(player)}
								className={`w-full px-6 py-3 text-left transition-colors border-b border-white/10 last:border-0 ${
									index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'
								}`}
							>
								<div className="font-medium text-white">{player.name}</div>
								<div className="text-sm text-gray-400">
									{player.position} • {player.teams[player.teams.length - 1]}
								</div>
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
