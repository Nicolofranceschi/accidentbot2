
import { TextInputRow, Button, ButtonOverlay, ZoneContainer } from "./styled";
import { toast } from "react-toastify";
import { getUserDocument , CurrentUser } from '../../firebase';
import { motion, useMotionValue } from "framer-motion";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { patch ,get} from "../../utility/Fetch";
import { UserContext } from "../../App";
import { Input } from "../../components/Lib";
import { useWindowSize } from "../../utility/useWindowSize";
import { ZoneLIneDeleteduser } from "../../components/ZoneLineDeleteduser";

export function Addzoneuser() {

  const [user,setUser] = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const scrollY = useMotionValue(0);
  const length = user.zones.length;
  const { width } = useWindowSize();
  
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
      <TextInputRow onSubmit={handleSubmit(onSubmit)}>
      
        <Input name="zone" ref={register} placeholder="Inserisci un zona" />
        <Button>
          <ButtonOverlay type="submit">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </ButtonOverlay>
        </Button>
      </TextInputRow>
     
      <ZoneContainer whileTap={{ cursor: "grabbing" }}>
        <motion.div
          style={{
            width,
            height: length * 70,
            y: scrollY
          }}
          drag="y"
          dragConstraints={{
            top: -length * 70,
            bottom: 0
          }}
        >
          {user.zones.map((item) => <ZoneLIneDeleteduser  key={item} {...{item , user,setUser}}/> )}
        </motion.div>
      </ZoneContainer>  
    </>
  );
}

