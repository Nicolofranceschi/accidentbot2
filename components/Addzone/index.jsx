import { Warning } from "../Warning";
import {Link} from "react-router-dom";
import { Container, TextInputRow, Button, ButtonOverlay, TextInput , Svgmap  } from "./styled";
import { toast } from "react-toastify";
import { getUserDocument , CurrentUser } from '../../firebase';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { patch ,get } from "../../utility/Fetch";
import { UserContext } from "../../App";

export function Addzone() {
  const [user,setUser] = useContext(UserContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try{ 
      const firebaseUser=CurrentUser();
      var url = `users/${user.uid}/addZone/${data.zone}`;
      const response = await patch(url);
      toast(response.message);
      const dataset = await getUserDocument(firebaseUser.uid);
      const databaseData = await get(`users/${firebaseUser.uid}`);
      if (databaseData===null) throw new Error ('Non esiste utente')
      setUser({ ...databaseData, ...dataset });
    }catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
    <Link to="/maps">
      <Svgmap className="w-6 h-6" fill="none"  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
      </Svgmap>
      </Link>
      <Warning/>
      <Container>
        <TextInputRow onSubmit={handleSubmit(onSubmit)}>
          <TextInput name="zone" ref={register} />
          <Button>
            <ButtonOverlay type="submit">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </ButtonOverlay>
          </Button>
        </TextInputRow>
      </Container>
    </>
  );
}
