
import {  TextInputRow, Button, ButtonOverlay, ZoneContainer } from "./styled";
import { toast } from "react-toastify";
import { getUserDocument , CurrentUser } from '../../firebase';
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { patch ,get,post  } from "../../utility/Fetch";
import { UserContext } from "../../App";
import { Input } from "../../components/Lib";
import { ZoneLIneDeleted } from "../../components/ZoneLineDeleted";


export  function Addzonemaps({ mapRef, drawingManagerRef, setButtonDisabled, point12, setClosedPopupHeight , setAlertConfig, severity }) {

  const [user,setUser] = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (severity==='success'){
    const location=point12?.getPath()?.getArray()?.map(p => p.toJSON());

    try{ 
      drawingManagerRef.current.setMap(mapRef.current);
      setButtonDisabled(false);

      const zone = await post('zones', {
        name: data.namezone,
        location
      });

      const firebaseUser = CurrentUser();
      var url = `users/${user.uid}/addZone/${zone}`;
      const response = await patch(url);
      toast(response.message);

      const dataset = await getUserDocument(firebaseUser.uid);
      const databaseData = await get(`users/${firebaseUser.uid}`);

      if (databaseData===null) throw new Error ('Non esiste utente');
      setUser({ ...databaseData, ...dataset });
      setClosedPopupHeight(130);
      setAlertConfig({ severity: 'info', message: 'Seleziona una zona'});
      reset();
    }catch (error) {
      toast.error(error.message);
    }
  
  }else if (severity==='error') toast.error("La tua zona interseca con le altre");
    else toast.error("Inserisci una zona valida");
} 

  return (
    <>
      <TextInputRow onSubmit={handleSubmit(onSubmit)}>
        <Input name="namezone" ref={register} placeholder="Nome zona"/>
        <Button>
          <ButtonOverlay type="submit">
            {point12!==null ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>

            ):(
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            ) }
          </ButtonOverlay>
        </Button>
      </TextInputRow>
     
      <ZoneContainer whileTap={{ cursor: "grabbing" }}>
        <div>
          {user.zones.map((item) =><ZoneLIneDeleted  key={item} {...{ item ,user,setUser,setAlertConfig,setClosedPopupHeight }}/>)}
        </div>
      </ZoneContainer>  
    </>
  );
}


