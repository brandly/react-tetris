import React from 'react';
import { Game, initialGame } from './stores/game-store';
export const Context = React.createContext<Game>(initialGame);
