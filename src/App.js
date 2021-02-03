import { Client } from 'boardgame.io/react';
import { ChickenToFried, TicTacToe } from './Game';

const App = Client({ game: ChickenToFried });

export default App;