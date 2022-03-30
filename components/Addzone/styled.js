import styled from 'styled-components';

export const TextInput = styled.input `
  padding-right: 20px;
  padding-left: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 47px;
  width: 227px;
  background-color: rgba(245,245,245,1);
  border-radius: 10px;
  border: none;
  background: white;
`;

export const Container = styled.div `
  display: flex;
  flex-direction: row;
  height: 20vh;
  width: 100vw;
`;

export const ButtonOverlay = styled.button `
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;

export const Button = styled.div `
  width: 47px;
  height: 47px;
  background-color: #E6E6E6;
  border-radius: 10px;
  flex-direction: column;
  display: flex;
  margin-left: 18px;
  border: none;
`;

export const TextInputRow = styled.form `
  height: 47px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
`;

export const Svgmap = styled.svg`
  top : 0;
  right: 0px;
  z-index: 10;
  padding-right: 20px;
  height: 10vh;
  width: 50px;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  stroke: white;
  &:hover {
  height: 10vh;
  width: 55px;
  
  }
  `;