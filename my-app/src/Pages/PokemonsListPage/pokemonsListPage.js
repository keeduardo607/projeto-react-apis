import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Box, Image, Stack, Card, CardFooter, ButtonGroup, Heading, Center, Text } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import { TituloPokedex } from "./PokemonsListPageStyled";

const PokemonsListPage = () => {
  const { pokedex, removeFromPokedex } = useAppContext();
  const navigate = useNavigate();
  const [pokemonDetails, setPokemonDetails] = useState({});

  //console.log('Pokedex', pokedex);

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
      const detailsPromises = pokedex.map((pokemon) => fetchPokemonDetails(pokemon.name));
      const details = await Promise.all(detailsPromises);
      setPokemonDetails(Object.fromEntries(pokedex.map((pokemon, index) => [pokemon.name, details[index]])));
    };

    updatePokemonDetails();
  }, [pokedex]);

  const handleDetailsClick = (pokemonName) => {
    navigate(`/details/${pokemonName}`);
  };

  const handleDeleteClick = (pokemonName) => {
    removeFromPokedex(pokemonName);
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
    <Box p="4" bg={'gray'}>
      <TituloPokedex>Meus Pokémons</TituloPokedex>
      <Stack direction="row" spacing={4} flexWrap="wrap">
        {pokedex.map((pokemon) => {
          const details = pokemonDetails[pokemon.name];
          if (!details) {
            return null;
          }

          const types = details.types;

          return (
            <Card
              key={pokemon.name}
              borderRadius="8px"
              borderWidth="2px"
              borderColor="#00b894"
              bg={'#00b894'}
              margin="0"
              hover={{ transform: "rotateY(10deg)", transition: "transform 0.3s" }}
              w="300px"
              flexDirection="column" 
              justifyContent="space-between"
            >
              <Center>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
                  alt={pokemon.name}
                  w="60%"
                  objectFit="cover"
                />
              </Center>
              <Center>
                <Heading                 
                 FontSize="4x1" 
                 as='h1' 
                 textTransform="capitalize " 
                 color='white'
                   noOfLines={1}>
                  {pokemon.name}
                </Heading>
              </Center>
              <Center>
                <Stack mt="6" spacing="3" textAlign="center">
                  {types.map((type) => (
                    <Text
                      key={type.type.name}
                      bg={typeColors[type.type.name]}
                      fontSize="lg"
                      color="white"
                      p="2"
                      borderRadius="md"
                      textTransform="capitalize"
                    >
                      {type.type.name}
                    </Text>
                  ))}
                </Stack>
              </Center >
              <CardFooter bg={'white'} borderRadius="8px" borderWidth="2px" marginTop={'20px'}>
                <ButtonGroup spacing="12">
                  <Button
                    onClick={() => handleDetailsClick(pokemon.name)}
                    variant="solid"
                    colorScheme="orange"
                  >
                    Detalhes
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(pokemon.name)}
                    style={{ color: 'white', backgroundColor: 'red' }}
                  >
                    Excluir
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default PokemonsListPage;
