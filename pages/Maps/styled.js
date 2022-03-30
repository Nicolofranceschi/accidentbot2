import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from '../../components/Lib';


export const MapsContainer = styled.div `
  height: 90vh;
  width: 100vw;
  top:5vh;
  border-radius: 3rem 3rem 0 0;
`;

export const BottomPopup = styled(motion.div)`
  width: 100vw;
  height: 90vh;
  background: white;
  position: absolute;
  border-radius: 3rem 3rem 0 0;
  z-index: 50;
  margin-top: ${({ marginBottom }) => marginBottom ? `${-marginBottom}px` : 0};
  bottom: ${({ bottom }) => bottom ? `${bottom}px` : 0};
`;

export const Container = styled(Flex)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
`;

export const Buttonpen = styled.button`
  top: 10vh;
  right: 5px;
  padding: 0 20px;
  background-color: white;
  border-radius: 3em;
  height: 35px;
  width: 130px;
  border-radius: 20px;
  position: absolute;
  z-index: 20;
  svg { stroke: black; }
  :disabled { display: none; }
  :focus { 
    height: 55px;
    width: 155px; }
`;

export const Buttonacc = styled(Link)`
  top : 0;
  right: 0px;
  padding-right: 20px;
  height: 10vh;
  width:40px;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  stroke: white;
  z-index: 200;
  &:hover {
    height: 10vh;
    width: 55px;
  }
`;

export const Svg = styled.svg`
  height: 100%;
  width: 100%;
`;
