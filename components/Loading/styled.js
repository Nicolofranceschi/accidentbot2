import { motion } from 'framer-motion';
import styled from 'styled-components';


export const LogoSvg = styled(motion.svg)`
  margin:auto;
  overflow: visible;
  stroke: #fff;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
  position: absolute;
  right: 50%;
  top: 25%;
  transform: translateY(50%);
  transform: translateX(50%);
`;