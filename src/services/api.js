import nbaPlayers from '../data/NBACOM_Players.json';

// Fetch NBA players from local JSON
export async function fetchNBAPlayers() {
	// Map NBACOM format to application format
	return nbaPlayers.map((player) => ({
		id: player.PERSON_ID,
		name: `${player.PLAYER_FIRST_NAME} ${player.PLAYER_LAST_NAME}`,
		teams: [`${player.TEAM_CITY} ${player.TEAM_NAME}`], // App expects an array of teams
		position: player.POSITION,
		draftYear: player.DRAFT_YEAR,
		origin: player.COUNTRY,
		country: player.COUNTRY,
		teamAbbreviation: player.TEAM_ABBREVIATION,
		college: player.COLLEGE,
		accolades: [], // Not present in this dataset
	}));
}
