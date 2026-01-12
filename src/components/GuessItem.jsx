import { motion } from 'framer-motion';
import { getRankColor } from '../utils/similarity';

export function GuessItem({ guess, index, gridClass }) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: index * 0.05 }}
			className={`glass rounded-lg p-4 md:p-0 md:min-h-[4rem] ${gridClass?.replace(
				'pl-4',
				'md:pl-4'
			)} flex flex-col md:grid gap-2 md:gap-4`}
		>
			<div className="flex justify-between items-center md:block">
				<span className="text-white font-medium text-lg md:text-base">
					{guess.name}
				</span>
				{/* Mobile Rank */}
				<span
					className={`md:hidden px-3 py-1 rounded-lg text-white font-bold text-xs ${getRankColor(
						guess.rank
					)}`}
				>
					{guess.rank}
				</span>
			</div>

			<div className="flex flex-wrap gap-x-3 gap-y-1 md:contents text-sm text-gray-300">
				{/* Team */}
				<div className="flex items-center gap-2 md:flex md:items-center md:justify-center min-w-0">
					<span className="md:hidden text-xs text-gray-500 uppercase">
						Team:
					</span>
					<span className="truncate" title={guess.teamAbbreviation}>
						{guess.teamAbbreviation}
					</span>
				</div>
				{/* Position */}
				<div className="flex items-center gap-2 md:flex md:items-center md:justify-center min-w-0">
					<span className="md:hidden text-xs text-gray-500 uppercase">
						Pos:
					</span>
					<span className="truncate" title={guess.position}>
						{guess.position}
					</span>
				</div>
				{/* College */}
				<div className="flex items-center gap-2 md:flex md:items-center md:justify-center min-w-0">
					<span className="md:hidden text-xs text-gray-500 uppercase">
						College:
					</span>
					<span className="truncate" title={guess.college}>
						{guess.college?.trim() || '-'}
					</span>
				</div>
				{/* Country */}
				<div className="flex items-center gap-2 md:flex md:items-center md:justify-center min-w-0">
					<span className="md:hidden text-xs text-gray-500 uppercase">
						Country:
					</span>
					<span className="truncate" title={guess.country}>
						{guess.country}
					</span>
				</div>
				{/* Draft */}
				<div className="flex items-center gap-2 md:flex md:items-center md:justify-center min-w-0">
					<span className="md:hidden text-xs text-gray-500 uppercase">
						Draft:
					</span>
					<span className="truncate">
						{guess.draftYear ? guess.draftYear : 'Undrafted'}
					</span>
				</div>
			</div>

			{/* Desktop Rank */}
			<div className="hidden md:flex justify-end pr-4">
				<span
					className={`px-4 py-2 rounded-lg text-white font-bold text-sm ${getRankColor(
						guess.rank
					)}`}
				>
					{guess.rank}
				</span>
			</div>
		</motion.div>
	);
}
