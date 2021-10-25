import React from 'react';
import { Game, init } from './models/Game';
export const Context = React.createContext<Game>(init());
