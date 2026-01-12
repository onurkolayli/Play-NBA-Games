import { useState, useEffect } from 'react';
import { fetchNBAPlayers } from '../services/api';

export function useNBAPlayers() {
	const [players, setPlayers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadPlayers() {
			try {
				// Fetch from local JSON (simulated async)
				const fetchedPlayers = await fetchNBAPlayers();
				setPlayers(fetchedPlayers);
				setLoading(false);
			} catch (err) {
				console.error('Failed to load players:', err);
				setError('Failed to load player data. Please try refreshing the page.');
				setLoading(false);
			}
		}

		loadPlayers();
	}, []);

	return { players, loading, error };
}
