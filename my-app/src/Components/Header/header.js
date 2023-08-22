import React from "react";
import { StyledImageHeader, LeftButton, RightButton, ButtonVoltar, VerPokemons, ButtonAdicionarRemover, StyledContainerHeader } from "./headerStyled";
import ImageHeader from "../../Images/image 1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isPokemonInPokedex, currentPokemonName, addToPokedex, removeFromPokedex } = useAppContext();

  console.log("isPokemonInPokedex", isPokemonInPokedex);

  const handleAddRemove = () => {
    if (isPokemonInPokedex) {
      removeFromPokedex(currentPokemonName);
    } else {
      addToPokedex({ name: currentPokemonName });
    }
  };

  return (
    <StyledContainerHeader>
      <LeftButton>
        {location.pathname !== "/" && (
          <ButtonVoltar onClick={() => navigate(-1)}>Voltar</ButtonVoltar>
        )}
      </LeftButton>
      <StyledImageHeader src={ImageHeader} alt="Imagem Cabeçalho" />
      <RightButton>
  {location.pathname === "/" ? (
    <VerPokemons onClick={() => navigate("/pokemons-list-page")}>
      Ver meus pokemons
    </VerPokemons>
  ) : (
    <>
      {location.pathname.startsWith("/details/") && (
        <ButtonAdicionarRemover
          onClick={handleAddRemove}
          isPokemonInPokedex={isPokemonInPokedex}
        >
          {isPokemonInPokedex ? "Remover da Pokedex" : "Adicionar à Pokedex"}
        </ButtonAdicionarRemover>
      )}
    </>
  )}
</RightButton>
    </StyledContainerHeader>
  );
};

export default Header;
