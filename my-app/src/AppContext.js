import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [buttonText, setButtonText] = useState("Ver meus pokemons");
  const [pokedex, setPokedex] = useState([]); 
  const [isPokemonInPokedex, setIsPokemonInPokedex] = useState(false);
  const [currentPokemonName, setCurrentPokemonName] = useState(""); 

  const addToPokedex = (pokemon) => {
    if (!pokedex.some(p => p.name === pokemon.name)) {
      setPokedex((prevPokedex) => [...prevPokedex, pokemon]);
    }
  };

  const removeFromPokedex = (pokemonName) => {
    setPokedex(prevPokedex => prevPokedex.filter(pokemon => pokemon.name !== pokemonName));
  };

  useEffect(() => {
    if (window.location.pathname === "/pokemons-list-page") {
      setButtonText("Voltar");
    } else {
      setButtonText("Ver meus pokemons");
    }
  }, []);

  useEffect(() => {
    setIsPokemonInPokedex(pokedex.some(pokemon => pokemon.name === currentPokemonName));
  }, [pokedex, currentPokemonName]);

  return (
    <AppContext.Provider value={{ buttonText, setButtonText, addToPokedex, pokedex, removeFromPokedex, isPokemonInPokedex, currentPokemonName, setCurrentPokemonName }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useAppContext };
