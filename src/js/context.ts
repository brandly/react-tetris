import React from 'react';
import { Game, getInitialGame } from './stores/game-store';
export const Context = React.createContext<Game>(getInitialGame());
