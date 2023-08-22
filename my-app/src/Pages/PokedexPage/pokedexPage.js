import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { Button, Card, CardBody, Image, Stack, CardFooter, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import { ContainerHome, TituloHome } from "./pokedexPageStyled";

const PokedexPage = () => {
  const { addToPokedex } = useAppContext();
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const navigate = useNavigate();

  //console.log('PokemonList', pokemonList);
  //console.log('PokemonDetails', pokemonDetails);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => {
        setPokemonList(response.data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar os pokémons:", error);
      });
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async (pokemonName) => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar os detalhes do pokémon:", error);
        return null;
      }
    };

    const updatePokemonDetails = async () => {
      const detailsPromises = pokemonList.map((pokemon) => fetchPokemonDetails(pokemon.name));
      const details = await Promise.all(detailsPromises);
      setPokemonDetails(Object.fromEntries(pokemonList.map((pokemon, index) => [pokemon.name, details[index]])));
    };

    updatePokemonDetails();
  }, [pokemonList]);

  const handleAddToPokedex = (pokemon) => {
    addToPokedex(pokemon); 
    navigate("/pokemons-list-page");
  };

  const handleDetailsClick = (pokemonName) => {
    navigate(`/details/${pokemonName}`);
  };

  const typeColors = {
    poison: "#A040A0",
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    flying: "#A890F0",
    normal: "#34495e",
    bug: "#7f8c8d"
  };



  return (
    <>
      <TituloHome>Todos os Pokémons</TituloHome>
      <ContainerHome>
        {pokemonList.map((pokemon) => {
          const details = pokemonDetails[pokemon.name];
          if (!details) {
            return null;
          }

          const types = details.types;

          return (
            <Card
              maxW="375px"
              maxH="400px"
              key={pokemon.name}
              borderRadius="8px"
              borderWidth="2px"
              borderColor="#00b894"
              margin="0"
              hover={{ transform: "rotateY(10deg)", transition: "transform 0.3s" }}
              flexDirection="column" 
              justifyContent="space-between"
            >
              <CardBody bg={'#00b894'}>
                <Image
                  margin={'auto'}
                  display={'block'}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
                  alt={pokemon.name}
                  w="auto" 
                  h="auto" 
                  objectFit="contain"
                />
                <Stack mt="6" spacing="3" textAlign="center">
                  <Heading 
                  FontSize="4x1" 
                  as='h1' 
                  textTransform="capitalize " 
                  color='white'
                   noOfLines={1}>
                    {pokemon.name}
                  </Heading>
                  {types.map((type) => (
                  <Text textTransform="capitalize" key={type.type.name} bg={typeColors[type.type.name]} fontSize="lg" color="white" p="2" borderRadius="md">
                    {type.type.name}
                  </Text>
                ))}
                </Stack>
              </CardBody>
              <CardFooter >
                <ButtonGroup spacing="12" >
                  <Button
                    onClick={() => handleDetailsClick(pokemon.name)}
                    variant="solid"
                    colorScheme="orange"
                  >
                    Detalhes
                  </Button>
                  <Button
                    onClick={() => handleAddToPokedex(pokemon)}
                    variant="solid"
                    colorScheme="blue"
                  >
                    Adicionar à Pokedex
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
      </ContainerHome>
    </>
  );
};

export default PokedexPage;
