import styled from 'styled-components';
import { motion } from "framer-motion";

export const TextInput = styled.input `
  padding-right: 20px;
  padding-left: 20px;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 47px;
  width: 227px;
  background-color: #E6E6E6;
  border-radius: 10px;
  border-color:black;
  background: white;
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
  margin-top:20px;
  height: 10%;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
`;



export const ZoneContainer = styled(motion.div)`
  height: 80%;
  bottom:0;
  width: 100%;
  border-radius: 3em 3em 3em 3em;
  overflow: hidden;
  position: relative;
  cursor: grab;
`;


