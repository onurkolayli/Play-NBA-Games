import { motion } from 'framer-motion';
import { GameTile } from './GameTile';

export function HomePage() {
	const games = [
		{
			title: 'NBA Contexto',
			description: 'Guess the hidden NBA player by typing names.',
			icon: '🏀',
			path: '/nba-contexto',
			isNew: true,
		},
		{
			title: 'NBA Player Quiz',
			description: 'Challenge yourself with daily NBA trivia.',
			icon: '❓',
			path: '/quiz',
			isComingSoon: true,
		},
		{
			title: 'Higher or Lower',
			description: 'Compare player stats in this addictive game.',
			icon: '📊',
			path: '/higher-lower',
			isComingSoon: true,
		},
		{
			title: 'Daily Lineup',
			description: 'Build the best roster based on daily challenges.',
			icon: '📋',
			path: '/lineup',
			isComingSoon: true,
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="pt-20 pb-12 px-4 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
						Play <span className="text-cyan-500">NBA</span> Games
					</h1>
					<p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
						Daily challenges and trivia for every basketball fan.
					</p>
				</motion.div>
			</section>

			{/* Games Grid */}
			<main className="max-w-7xl mx-auto px-6 pb-20">
				<div className="mb-8">
					<h2 className="text-white text-xs font-bold uppercase tracking-[0.2em] border-l-4 border-cyan-500 pl-4">
						Daily NBA Challenges
					</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{games.map((game, index) => (
						<motion.div
							key={game.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="h-full"
						>
							<GameTile {...game} />
						</motion.div>
					))}
				</div>

				{/* Footer/Progress Section (Inspired by playfootball.games) */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					className="mt-20 p-8 glass rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5"
				>
					<div className="flex gap-8 text-center md:text-left">
						<div>
							<div className="text-2xl font-black text-white">0</div>
							<div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
								Games Played
							</div>
						</div>
						<div>
							<div className="text-2xl font-black text-white">0%</div>
							<div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
								Win Rate
							</div>
						</div>
						<div>
							<div className="text-2xl font-black text-white">0</div>
							<div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
								Current Streak
							</div>
						</div>
					</div>

					<div className="flex -space-x-2">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className="w-8 h-8 rounded-full border-2 border-slate-900 bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-600"
							>
								{i + 1}
							</div>
						))}
					</div>
				</motion.div>
			</main>
		</div>
	);
}
