import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { Box, Text, Stack, Image, Center, Card, Grid } from "@chakra-ui/react";
import { TituloDetalhes } from "./pokemmonDetailPageStyled";

const PokemonDetailsPage = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const { setCurrentPokemonName } = useAppContext();

  //console.log('PokemonName', pokemonName);
  //console.log('PokemonData', pokemonData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemonData(response.data);
        setCurrentPokemonName(pokemonName);
      } catch (error) {
        console.error("Erro ao buscar detalhes do pokémon:", error);
      }
    };

    fetchData();
  }, [pokemonName, setCurrentPokemonName]);

  return (
    <Box p="4" bg="gray">
      <TituloDetalhes>Detalhes do Pokémon</TituloDetalhes>
      {pokemonData ? (
        <Card
          borderRadius="8px"
          borderWidth="2px"
          borderColor="#00b894"
          bg="white"
          margin="0"
          hover={{ transform: "rotateY(10deg)", transition: "transform 0.3s" }}
          w="1000px"
        >
          <Grid templateColumns="repeat(4, 1fr)" gap={4} p="4">
            <Center alignItems="flex-start">
              <Stack spacing={2}>
                <Image src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                <Text fontSize="xl" fontWeight="bold" textTransform="capitalize">
                  {pokemonData.name}
                </Text>
              </Stack>
            </Center>
            <Stack spacing="2">
              <Text fontSize="lg" fontWeight="bold">
                Habilidades:
              </Text>
              {pokemonData.abilities.map((ability) => (
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  p="2"
                  borderRadius="md"
                  textTransform="capitalize"
                  bg="gray"
                  key={ability.ability.name}
                >
                  {ability.ability.name}
                </Text>
              ))}
            </Stack>
            <Stack spacing="2">
              <Text fontSize="lg" fontWeight="bold">
                Estatísticas Básicas:
              </Text>
              {pokemonData.stats.map((stat) => (
                <Stack key={stat.stat.name} direction="row" alignItems="center">
                  <Text fontSize="lg" textTransform="capitalize">
                    {stat.stat.name}: {stat.base_stat}
                  </Text>
                  <div
                    style={{
                      backgroundColor: "#3498db",
                      height: "10px",
                      borderRadius: "5px",
                      width: `${(stat.base_stat / 255) * 100}%`,
                      marginLeft: "5px",
                    }}
                  ></div>
                </Stack>
              ))}
            </Stack>
            <Stack spacing="2">
              <Text fontSize="lg" fontWeight="bold">
                Movimentos:
              </Text>
              {pokemonData.moves.map((move) => (
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  p="2"
                  borderRadius="md"
                  textTransform="capitalize"
                  bg="gray"
                  key={move.move.name}
                >
                  {move.move.name}
                </Text>
              ))}
            </Stack>
          </Grid>
        </Card>
      ) : (
        <Center h="200px">
          <Text fontSize="xl">Carregando...</Text>
        </Center>
      )}
    </Box>
  );
};

export default PokemonDetailsPage;
