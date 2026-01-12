import { motion, AnimatePresence } from 'framer-motion';

export function HowToPlayModal({ isOpen, onClose }) {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="relative w-full max-w-lg bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl"
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
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

						<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
							<svg
								className="w-8 h-8 text-purple-400"
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
							How to Play
						</h2>

						<div className="space-y-4 text-gray-300">
							<p>Find the secret NBA player. You have unlimited guesses.</p>
							<p>
								<strong className="text-white">Searchable players</strong> have
								been sorted by an algorithm according to how similar they are to
								the secret player.
							</p>
							<div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
								<p className="mb-2 text-sm text-gray-400">Example Ranks:</p>
								<div className="space-y-2">
									<div className="flex items-center gap-3">
										<span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded">
											#1
										</span>
										<span className="text-sm">Correct Player</span>
									</div>
									<div className="flex items-center gap-3">
										<span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
											#2-10
										</span>
										<span className="text-sm">Very Close</span>
									</div>
									<div className="flex items-center gap-3">
										<span className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded">
											#11-50
										</span>
										<span className="text-sm">Close</span>
									</div>
								</div>
							</div>
							<p>
								The algorithm analyzed attributes of active NBA players
								including{' '}
								<strong className="text-white">
									team history, position, draft year, college/country, and
									accolades
								</strong>
								.
							</p>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
