import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { ChickenToFried } from './Game';
import ChickenToFriedBoard from './Board';


const ChickenToFriedClient = Client({
    game: ChickenToFried,
    board: ChickenToFriedBoard,
    multiplayer: Local(),
});

const App = () => (
    <div>
        <ChickenToFriedClient playerID="0"/>
        <br/>
        <ChickenToFriedClient playerID="1"/>
    </div>
);

export default App;