import styled from "styled-components";
import { motion } from "framer-motion";
import Chip from '@material-ui/core/Chip';

export const Frame = styled(motion.div)`
  border-radius: 20px;
  background-color: white;
  position: relative;
`;

export const Mapsanima = styled(motion.div)`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 70%;
  z-index: 2;
  position: relative;
  border-Radius: 20px;
`;

export const Chips = styled(Chip)`
  bottom: -280px;
  margin: 20px 50px 0px 50px;
  padding: 20px;
  width: 70%;
  z-index: 0;
  position: relative;
  border-Radius: 20px,
`;