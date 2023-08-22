import { styled } from "styled-components";

export const ContainerHome = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  background-color: gray;
`

export const TituloHomePage = styled.h3`
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: gray;
  width: 100%;
  height: 15vh;
  font-size: 48px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: white;
`