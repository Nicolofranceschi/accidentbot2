import { Logout } from "../../firebase"
import { lazy, Suspense, useEffect, useState } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { Pop, Container, Svgpiu , Svgout ,Svgmap , Utente , TextAlert, Grid } from './styled';
import { SmallLogo } from "../SmallLogo";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Addzoneuser } from "../Addzoneuser"
import { Link } from "react-router-dom";
import { useWindowSize } from "../../utility/useWindowSize";
import { toast } from "react-toastify";
const Card = lazy(() => import('../Card'));

function getHeight(length, height) {
  const totalScroll = length * height / 2;
  return totalScroll;
}

export function Lists( { items, updateAlerts }) {
  const { width , height } = useWindowSize();
  const [,setUser] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const scrollY = useMotionValue(0);
  const scale = useTransform(scrollY, [0, 100], [0, 1]);
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const length = items.length;

  const variants = {
    open: {
      top: height/10*1,
    },
    closed: {
      top: height,
    },
  };

  useEffect(() => {
    scale.onChange(async () => {
      if (scale.current === 1) {
        updateAlerts();
        toast.success('Incidenti aggiornati');
      }
    });
  }, [scale, updateAlerts]);

  return (
    <div style={{ overflow: 'hidden', height: '100vh', position: 'relative' }}>
      <Utente
       variants={variants}
       initial={false}
       animate={open ? "open" : "closed"}
      >
        <Addzoneuser/>
      </Utente>
      <SmallLogo/>
      <Svgout className="w-6 h-6" fill="none" onClick={()=>{ Logout();setUser(); }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </Svgout>
      <Svgpiu className="w-6 h-6" fill="none"  onClick={() => setOpen(i => !i)}  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </Svgpiu>
      <Link to="/maps">
      <Svgmap className="w-6 h-6" fill="none" onClick={() => setOpen(i => !i)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
      </Svgmap>
      </Link>
     
      <Pop style={{ scale, opacity }}/>
      <Container whileTap={{ cursor: "grabbing" }}>
        <Grid
          style={{
            width,
            height: getHeight(width < 768 ? length : length / 2, height),
            y: scrollY
          }}
          drag="y"
          dragConstraints={{
            top: -getHeight(width < 768 ? length : length / 2, height),
            bottom: 0
          }}
        >
          { length > 0
            ? items.map(({ _id, ...item }) => (
              <Suspense key={_id} fallback={<div style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: '20px', opacity: 0.7 }} />}>
                <Card {...item} />
              </Suspense>
            ))
            : (<TextAlert>NON CI SONO INCIDENTI</TextAlert>)
          }
        </Grid>
      </Container>
    </div>
  );
}
