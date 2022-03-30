import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Button, Flex } from "../../components/Lib";
import { motion } from "framer-motion";

export const Container = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  width: 80vw;
  height: 85vh;
  padding: 6vh 0 0;
  overflow: hidden;
  background-color: var(--black-light);
  margin: 0 auto;
  max-width: 400px;
`;

export const FormButtons = styled(Flex)`
  position: absolute;
  width: 100%;
  bottom: 60px;
  right: 0;
`;

export const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  position: relative;
  width: 100%;
  span {
    color: var(--white);
    position: absolute;
    top: 20px;
    font-size: 0.7rem;
  }
`;

export const Labelblack = styled.label`
  position: relative;
  width: 100%;
  span {
    color: var(--black);
    position: absolute;
    top: 25px;
    font-size: 0.8rem;
  }
`;

export const ArrowSvg = styled(motion.svg)`
  justify-content: center;
  overflow: visible;
  stroke: black;
  height: 100%;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
  width: 30px;
  height:30px;
`;

export const StyledLink = styled(Link)`
  align-self: flex-end;
  color: white;
  margin-top: 20px;
  color: var(--border-gray);
  font-size: 0.9rem;
`;

export const GoogleButton = styled.button`
  width: 100%;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  height: 6vh;
  font-weight: bold;
  background-color: var(--white);
  color: var(--text);
  justify-content: center;
  margin-top: 2vh;
  svg {
    height: 100%;
    margin-right: 15px;
    margin-left: -15px;
  }
`;

export const BottomPopup = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background: white;
  position: absolute;
  overflow: hidden;
  z-index: 2;
  margin-top: ${({ marginBottom }) => `${-marginBottom}px` };
  bottom: ${({ bottom }) => `${bottom}px` };
  border-radius: 3em 3em 0 0;
`;

export const BottomPopupLabel = styled(Flex)`
  justify-content: center;
  flex-direction: column;
  height:10vh;
  
`;


export const Buttoncontrol = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;


export const List = styled(motion.li)`
  font-family: Montserrat, sans-serif;
  list-style: none;
  user-select: none;
  font-size: ${({font}) => `${font}px` };;
  margin-left: 20px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
`;

export const Listcontainer = styled.ol`
  display: flex;
  justify-content: center;
  align-items: center;
  padding:10vh 0;
`;

export const Underline = styled(motion.div)`

 width: 100%;
  height: 8px;
  border-radius: 4px;
  background: black;
  position: absolute;
  bottom: -4px;
`;

export const Spiegazione = styled.p `

  text-align: justify;
  text-justify: inter-word;
  margin: 10px;

`;


export const InputProps = {
  width: '100%',
  margin: "45px 0 0 0"
}

export const PathProps = {
  variants: {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      opacity: 1,
      pathLength: 1,
    }
  },
  initial: "hidden",
  animate: "visible",
  transition: {
    default: { duration: 2, ease: "easeInOut" },
    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
  }
}

export const Accordion = styled.div`
  display: ${({ show = true }) => show ? 'block' : 'none'};
`;

export const BackNextButtons = ({ back, next, children }) => (
  <FormButtons>
    <Buttoncontrol>
      { back && <Button type="button" onClick={back} padding="15px 30px" margin="10px" color="var(--text)" button="0px">Back</Button>}
      { next && <Button type="button" onClick={next} padding="15px 30px" margin="10px" button="0px">Next</Button>}
      {children}
    </Buttoncontrol>
  </FormButtons>
);