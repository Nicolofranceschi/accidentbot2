import { useCallback, useContext, useEffect, useState } from 'react';
import { getToken, messaging } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { Lists } from "../../components/Lists";
import { get} from "../../utility/Fetch";
import { Container } from './styled';
import { UserContext } from '../../App';
import { Addzone } from "../../components/Addzone"

export default function Home() {
  const [user] = useContext(UserContext);
  const [alerts, setAlerts] = useState([]);
  
  const fetchAlerts = useCallback(async () => {
    try {
      if(user.zones.length > 0){
        const zoneQuery = user.zones.reduce((acc, zone) => `${acc}zones=${zone}&`, "?");
        const data = await get(`alerts${zoneQuery.slice(0, -1)}`);
        setAlerts(data);
      }
    } catch (error) {
      toast.error(error);
    }
  }, [user.zones]);

  useEffect(() => (getToken()), [user.msgid]);

  useEffect(() => { 
    if (messaging!==null){
    const stop = messaging.onMessage(payload => {
      toast(payload.data.title);
      fetchAlerts();
    }, error => toast.error(error));
    return stop;}
  }, [fetchAlerts]);

  useEffect(() => { fetchAlerts() }, [fetchAlerts]);

  return (
    <Container>
      <ToastContainer
        position="top-right"
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        hideProgressBar
      />
      {user.zones.length > 0 ? <Lists items={alerts} updateAlerts={fetchAlerts} /> : <Addzone {...{ fetchAlerts }}/>}
    </Container>
  );
}