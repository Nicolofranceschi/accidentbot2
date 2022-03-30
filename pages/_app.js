import '../styles/globals.css'
import { useEffect, useState, createContext } from 'react';
import { auth, getUserDocument  , Logout } from './firebase';
import Login from './pages/Login';
import {Loading} from './components/Loading';
import { toast , ToastContainer } from "react-toastify";
import { get } from './utility/Fetch';



export const UserContext = createContext(null);

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    auth.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        try {
          const data = await getUserDocument(firebaseUser.uid);
          const databaseData = await get(`users/${firebaseUser.uid}`);
          if (databaseData===null) throw new Error ('Non esiste utente');
          setUser({ ...databaseData, ...data });
        } catch (error) {
          toast.error(error.message); 
          await Logout();
        }
      }
      setLoading(false);
    });
  }, []);

  return user ? (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  ) : !loading ? <Login user={user} /> : <Loading />;
}


export default App
