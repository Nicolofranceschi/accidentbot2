
import Lottie from 'react-lottie';
import animationData from './lotties.json';
import { BackNextButtons, Labelblack , GoogleButton} from "./styled";
import { Button, Flex, Input } from "../../components/Lib";
import GoogleLogo from "../../components/GoogleLogo";

const inputProps = {
  width: '100%',
  margin: "45px 0 0 0"
}

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export const Log = ({ register, back, next , setLe  }) =>{
  return(
  <>
    <Flex flexDirection="column" width="100%">
      <Labelblack>
        <span>Email</span>
        <Input type="text" {...inputProps} ref={register} name="email" />
      </Labelblack>
      <Labelblack>
        <span>Password</span>
        <Input type="text" {...inputProps} ref={register} name="password" />
      </Labelblack>
      <GoogleButton type="button" onClick={() => {
        setLe(1);
        next();
      }}>
        <GoogleLogo />
        Registrati con Google
      </GoogleButton>
    </Flex>
    <BackNextButtons {...{ back, next }} />
  </>
);

} 

export const Anagrafica1 = ({ register, back, next  }) => (
  <>
    <Flex flexDirection="column" width="100%">
      <Labelblack>
        <span>Nome</span>
        <Input type="text" {...inputProps} ref={register} name="name" />
      </Labelblack>
      <Labelblack>
        <span>Cognome</span>
        <Input type="text" {...inputProps} ref={register} name="lastname" />
      </Labelblack>
      <Labelblack>
        <span>Telefono</span>
        <Input type="text" {...inputProps} ref={register} name="phone" />
      </Labelblack>
    </Flex>
    <BackNextButtons {...{ back, next }} />
    
  </>
);

export const Anagrafica2 = ({ register, back, next , role }) => (
  <>
    <Flex flexDirection="column" width="100%">
      <Labelblack>
        <span>Citta</span>
        <Input type="text" {...inputProps} ref={register} name="city" />
      </Labelblack>
      <Labelblack>
        <span>Via</span>
        <Input type="text" {...inputProps} ref={register} name="address" />
      </Labelblack>
      <Labelblack>
        <span>CAP</span>
        <Input type="text" {...inputProps} ref={register} name="cap" />
      </Labelblack>
    </Flex>
    {role===1 ?  
    <BackNextButtons {...{ back, next }} />:
    <BackNextButtons {...{ back }}>
    <Button type="submit" padding="15px 30px" margin="10px">Completa</Button>
    </BackNextButtons>}
    
  </>
);

export const Impresa = ({ register, back }) => (
  <Flex flexDirection="column" width="100%">
    <Labelblack>
      <span>Ragione Sociale</span>
      <Input type="text" {...inputProps} ref={register} name="ragione_sociale" />
    </Labelblack>
    <Labelblack>
      <span>Sede legale</span>
      <Input type="text" {...inputProps} ref={register} name="location" />
    </Labelblack>
    <Labelblack>
      <span>Partita Iva</span>
      <Input type="text" {...inputProps} ref={register} name="piva" />
    </Labelblack>
    <Labelblack>
      <span>Codice Interscambio</span>
      <Input type="text" {...inputProps} ref={register} name="codice_interscambio" />
    </Labelblack>
    <BackNextButtons {...{ back }}>
        <Button type="submit" padding="15px 30px" margin="10px">Completa</Button>
    </BackNextButtons>
  </Flex>
);

export const Animation = () => {
  const defaultEvent = {
    eventName: 'complete',
    callback: () => {
      console.log("loopComplete")
    },
  };

  return <Lottie options={defaultOptions} eventListeners={[defaultEvent]} height={200} width={200} />;
}