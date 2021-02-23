import { Client } from 'boardgame.io/react';
import { ChickenToFried } from './Game';
import ChickenToFriedBoard from './Board';

const App = Client({
    game: ChickenToFried,
    board: ChickenToFriedBoard,
});

export default App;