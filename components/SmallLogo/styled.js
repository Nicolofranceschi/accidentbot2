import { motion } from 'framer-motion';
import styled from 'styled-components';


export const LogoSvg = styled(motion.svg)`
    top: 0;
    left: 0;
    z-index: 10;
    padding-left: 20px;
    height: 10vh;
    width: 150px;
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width:2;
`;