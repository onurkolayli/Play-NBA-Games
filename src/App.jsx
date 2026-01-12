import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NBAContextoGame } from './components/NBAContextoGame';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/nba-contexto" element={<NBAContextoGame />} />
				{/* Future games routes will go here */}
			</Routes>
		</Router>
	);
}

export default App;
