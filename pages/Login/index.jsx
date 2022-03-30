
import { Input, Button } from "../../components/Lib";
import { Logo } from "../../components/Logo";
import GoogleLogo from "../../components/GoogleLogo";
import { Container, Label, StyledLink, GoogleButton, InputProps, LoginForm } from "./styled";
import { useForm } from "react-hook-form";
import { auth , signInWithGoogle} from "../../firebase";
import { toast } from "react-toastify";
import { Carousel } from "./Carousel";

function Login () {
  
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async ({ email, password }) => {
    try{

      await auth.signInWithEmailAndPassword(email, password);

    }catch (error) {
      toast.error(error.message);
    }
  }

  const Google = async () => { await signInWithGoogle(); }
  
  return (
    <>
    <Container>
      <Logo />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Label>
          <span>Email</span>
          <Input {...InputProps} name="email" ref={register} />
        </Label>
        <Label>
          <span>Password</span>
          <Input {...InputProps} name="password" ref={register} />
        </Label>
        <StyledLink to="/">Password dimenticata?</StyledLink>
        <Button type="submit" margin="5vh 0 0 0" padding="15px 0">Accedi</Button>
        <GoogleButton type="button" onClick={Google} >
        <GoogleLogo/>
        Accedi con Google
      </GoogleButton>
      </LoginForm>
    </Container>
    <Carousel />
  </>
  );
}
export default Login;