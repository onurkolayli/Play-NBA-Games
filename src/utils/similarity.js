// Calculate similarity between two players
export function calculateSimilarity(player1, player2) {
	let score = 0;

	// Team history (40% weight)
	const sharedTeams = player1.teams.filter((team) =>
		player2.teams.includes(team)
	).length;
	const teamSimilarity =
		sharedTeams / Math.max(player1.teams.length, player2.teams.length);
	score += teamSimilarity * 40;

	// Position (20% weight)
	if (player1.position === player2.position) {
		score += 20;
	} else if (
		(player1.position.includes('G') && player2.position.includes('G')) ||
		(player1.position.includes('F') && player2.position.includes('F')) ||
		(player1.position.includes('C') && player2.position.includes('C'))
	) {
		score += 10;
	}

	// Draft year/era (15% weight)
	const yearDiff = Math.abs(player1.draftYear - player2.draftYear);
	if (yearDiff === 0) {
		score += 15;
	} else if (yearDiff <= 2) {
		score += 10;
	} else if (yearDiff <= 5) {
		score += 5;
	}

	// Origin (15% weight)
	if (player1.origin === player2.origin) {
		score += 15;
	}

	// Accolades (10% weight)
	const accolades1 = player1.accolades || [];
	const accolades2 = player2.accolades || [];

	const sharedAccolades = accolades1.filter((acc) =>
		accolades2.includes(acc)
	).length;

	if (accolades1.length > 0 && accolades2.length > 0) {
		const accoladeSimilarity =
			sharedAccolades / Math.max(accolades1.length, accolades2.length);
		score += accoladeSimilarity * 10;
	}

	return score;
}

// Calculate rankings for all players
export function calculateRankings(players, secretPlayer) {
	const similarities = players.map((player) => ({
		player: player,
		similarity:
			player.name === secretPlayer.name
				? 100
				: calculateSimilarity(player, secretPlayer),
	}));

	similarities.sort((a, b) => b.similarity - a.similarity);

	const rankings = {};
	similarities.forEach((item, index) => {
		rankings[item.player.name] = index + 1;
	});

	return rankings;
}

// Get rank class for styling
export function getRankClass(rank) {
	if (rank === 1) return 'rank-1';
	if (rank <= 10) return 'rank-excellent';
	if (rank <= 30) return 'rank-good';
	if (rank <= 50) return 'rank-medium';
	if (rank <= 70) return 'rank-poor';
	if (rank <= 90) return 'rank-bad';
	return 'rank-worst';
}

// Get rank color for Tailwind
export function getRankColor(rank) {
	if (rank === 1)
		return 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]';
	if (rank <= 10) return 'bg-green-500 text-white';
	if (rank <= 30) return 'bg-lime-500 text-white';
	if (rank <= 50) return 'bg-yellow-400 text-black';
	if (rank <= 70) return 'bg-orange-400 text-white';
	if (rank <= 100) return 'bg-orange-600 text-white';
	if (rank <= 500) return 'bg-red-500 text-white';
	return 'bg-gray-700 text-gray-300';
}
