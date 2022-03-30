import {useEffect, useState} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Buttoncopia,  Zone , Copia , Delete ,ZoneText, ZoneTitle , Zonecode , Buttoncestiono } from "./styled";
import { get, del } from "../../utility/Fetch";
import { toast } from "react-toastify";
import { getUserDocument , CurrentUser } from '../../firebase';

export function ZoneLIneDeleteduser ({item,user,setUser}) {

  const id = user._id;

  const [nameofzone,setNameofzone] = useState("zone");

  const getname = async (item) => {
    const response = await get(`zones/name/${item}`);
      setNameofzone(response?.name);
  }

  useEffect(() => getname(item) , [item])

  const deletezone =  async (item) => {
    try{ 
      const firebaseUser = CurrentUser();
      const response = await del("users",{item,id});
      toast(response.message);
      const dataset = await getUserDocument(firebaseUser.uid);
      const databaseData = await get(`users/${firebaseUser.uid}`);
      if (databaseData===null) throw new Error ('Abbiamo un problema')
      setUser({ ...databaseData, ...dataset });
      
    }catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <Zone >
      <Buttoncestiono onClick={()=>{deletezone(item,user);}} >
      <Delete className="w-6 h-6" fill="none" stroke="#cd0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </Delete>
        </Buttoncestiono>
        <CopyToClipboard text={item} onCopy={()=>toast.success("Zona copiata !")}>
        <Buttoncopia>
        <Copia xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="#527ef5" viewBox="0 0 24 24" >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </Copia>
        </Buttoncopia>
        </CopyToClipboard>
        <ZoneText>
        <ZoneTitle>{nameofzone}</ZoneTitle>
        <Zonecode>{item}</Zonecode>
      </ZoneText> 
    </Zone>
    );
}