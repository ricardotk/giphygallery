import React, { useReducer } from 'react';

import gifsReducer from './reducers/gifs';
import Grid from './components/Grid';
import Search from './components/Search';
import GifsContext from './context/gifs-context';

const App = () => {
  const [gifs, dispatch] = useReducer(gifsReducer, []);

  return (
    <GifsContext.Provider value={{ gifs, dispatch }}>
      <Search />
      <Grid />
    </GifsContext.Provider>
  );
};

export default App;
