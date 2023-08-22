import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header'
import PokedexPage from './Pages/PokedexPage/pokedexPage';
import PokemonDetailsPage from './Pages/PokemonDetailPage/pokemonDetailPage';
import PokemonsListPage from './Pages/PokemonsListPage/pokemonsListPage';
import { AppProvider } from './AppContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';

function App() {

  return (
    //Estilização Utilizando chakra-ui
    <ChakraProvider theme={theme}> 
    <Router>
      <AppProvider>
        <Header />
        <Routes>
          <Route path="/" element={<PokedexPage />} />
          <Route path="/details/:pokemonName" element={<PokemonDetailsPage />} />
          <Route path="/pokemons-list-page" element={<PokemonsListPage />} />
        </Routes>
      </AppProvider>
    </Router>
    </ChakraProvider>
  );
}

export default App;
