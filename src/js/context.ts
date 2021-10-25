import React from 'react';
import { Game, init } from './stores/game-store';
export const Context = React.createContext<Game>(init());
