import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function GameTile({
	title,
	description,
	icon,
	path,
	isNew,
	isComingSoon,
}) {
	const TileContent = (
		<div className="flex flex-col h-full">
			{isNew && (
				<div className="absolute top-3 right-3 z-10">
					<span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
						New
					</span>
				</div>
			)}

			<div className="aspect-[4/3] relative flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent p-8">
				<div className="text-5xl group-hover:scale-110 transition-transform duration-500">
					{icon}
				</div>
			</div>

			<div className="p-5 flex flex-col items-center text-center flex-grow">
				<h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">
					{title}
				</h3>
				<p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-tight flex-grow">
					{description}
				</p>

				{isComingSoon ? (
					<button
						disabled
						className="w-full py-2.5 rounded-xl bg-gray-800 text-gray-500 font-bold uppercase text-xs tracking-widest cursor-not-allowed mt-auto"
					>
						Coming Soon
					</button>
				) : (
					<div className="w-full py-2.5 rounded-xl bg-cyan-500 group-hover:bg-cyan-400 text-white font-bold uppercase text-xs tracking-widest transition-colors text-center mt-auto">
						Play
					</div>
				)}
			</div>
		</div>
	);

	const containerClasses =
		'relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 h-full flex flex-col';

	if (isComingSoon) {
		return <div className={containerClasses}>{TileContent}</div>;
	}

	return (
		<Link to={path} className={containerClasses}>
			{TileContent}
		</Link>
	);
}
