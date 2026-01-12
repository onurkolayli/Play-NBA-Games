import { motion } from 'framer-motion';

export function LoadingIndicator() {
	return (
		<div className="flex flex-col items-center justify-center py-12">
			<motion.div
				className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
			/>
			<p className="mt-4 text-gray-300 text-sm font-medium">
				Loading NBA Players...
			</p>
		</div>
	);
}
