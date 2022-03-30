import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Form, Accordion } from "./styled";
import { Flex } from "../../components/Lib";
import { Anagrafica1, Anagrafica2, Animation, Impresa, Log } from "./Registercomponents";
import Scelta from "./User-admin";
import { auth, generateUserDocument, signInWithGoogle , Logout} from "../../firebase";
import { post } from "../../utility/Fetch";

export default function SignupForm() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(0);
  const [le, setLe] = useState(0);

  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email, password, ...data }) => {
    if (le===0){
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        
        generateUserDocument(user,{ ...data, role });
        
        next();
        post("users", { uid: user.uid });
       
    } catch (error) {
      Logout();
      toast.error(error.message);
    }
  }
  else {
    try {
      const { user } = await signInWithGoogle();
      
      generateUserDocument(user,{ ...data, role });
     
      next();
      post("users", { uid: user.uid });
     
  } catch (error) {
    Logout();
    toast.error(error.message);
  }}};

  const back = (e) => {
    e?.preventDefault();
    setStep((step) => step - 1);
  };
  const next = (e) => {
    e?.preventDefault();
    setStep((step) => step + 1);
  };

  return (
    <Flex flexDirection="column" width="70vw" height="90vh" margin="0 auto">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Accordion show={step === 0}>
          <Scelta {...{ register, next, role, setRole }} />
        </Accordion>
        <Accordion show={step === 1}>
          <Log {...{ register, back, next, setLe, le }} />
        </Accordion>
        <Accordion show={step === 2}>
          <Anagrafica1 {...{ register, back, next  }} />
        </Accordion>
        <Accordion show={step === 3}>
          <Anagrafica2 {...{ register, back, next , role }} />
        </Accordion>
        <Accordion show={step === 4 && role === 1 }>
          <Impresa {...{ register, back  }} />
        </Accordion>
        {step === 5 && <Animation />}
      </Form>
    </Flex>
  );
}
