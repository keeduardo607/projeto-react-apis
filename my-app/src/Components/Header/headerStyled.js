import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  background: #FFFFFF;
  height: 160px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const StyledImageHeader = styled.img`
  width: 307px;
  height: 113px;
  margin: 0 auto;
`;

export const ButtonAdicionarRemover = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isPokemonInPokedex ? "red" : "#33a4f5")};
  height: 10vh;
  width: 15vw;
  color: #FFFFFF;
  margin-top: 30px;
  padding: 4px 10px 4px 10px;
  border: 3px solid ${(props) => (props.isPokemonInPokedex ? "red" : "#33a4f5")};
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

export const ButtonVoltar = styled.button`
  background-color: #33a4f5;
  height: 10vh;
  width: 15vw;
  color: #FFFFFF;
  margin-top: 30px;
  border: 3px solid #33a4f5;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

export const VerPokemons = styled.button`
  background-color: #33a4f5;
  height: 10vh;
  width: 15vw;
  color: #FFFFFF;
  margin-top: 30px;
  border: 3px solid #33a4f5;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

export const LeftButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  margin-left: 150px;
`;

export const RightButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  margin-right: 150px;
`;