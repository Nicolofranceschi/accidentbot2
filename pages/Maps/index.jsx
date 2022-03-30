import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { BottomPopup, MapsContainer, Container , Svg , Buttonacc , Buttonpen } from "./styled";
import { drawingManagerConfig, mapConfig } from "./config";
import { get} from '../../utility/Fetch';
import {calcIntersection } from "./function"
import {Addzonemaps} from "../../components/Addzonemaps"
import { ToastContainer } from "react-toastify";
import { SmallLogo } from "../../components/SmallLogo";
import { UserContext } from "../../App";
import { useWindowSize } from "../../utility/useWindowSize";
import { styled } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const Alertnif = styled(Alert)({
  borderRadius: "3em 3em 0 0 ",
});

export let allOverlays = [];

let infoWindow;

let google = null;
const createMap = container => new google.maps.Map(container, mapConfig({ lat: 44.494, lng: 11.342 }));
const createDrawingManager = () => new google.maps.drawing.DrawingManager(drawingManagerConfig(google));

export default function Maps() {
  const [user] = useContext(UserContext);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const [point12,setPoint12] = useState(null);
  const [{ message, severity }, setAlertConfig] = useState({
    message: 'Seleziona una zona',
    severity: 'info'
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { height } = useWindowSize();
  const [closedPopupHeight, setClosedPopupHeight]= useState(130);
  const openPopupHeight = - height + closedPopupHeight;

  async function savePolygon(newOverlay) {

    calcIntersection({...{ newOverlay, setAlertConfig, setPoint12 }});
  
    drawingManagerRef.current.setMap(null);
    setButtonDisabled(true);
    
    setClosedPopupHeight(250);

    newOverlay.getPaths().forEach(function (path) {
      google.maps.event.addListener(path, 'insert_at', () => calcIntersection({...{ newOverlay,setAlertConfig,setPoint12 }}));
      google.maps.event.addListener(path, 'remove_at', () => calcIntersection({...{ newOverlay,setAlertConfig},setPoint12 }));
      google.maps.event.addListener(path, 'set_at', () => calcIntersection({...{ newOverlay,setAlertConfig},setPoint12 }));
      // TODO: rimuovi questi listener ON CONFIRMATION
    });}

  const processPolygon = useCallback(async poly => await savePolygon(poly), []);

  useEffect(() => {
    google = window?.google;
    let stop = null;
    const fetchZones = async () => {
      const zones = await get('zones');
      mapRef.current = createMap(mapContainerRef.current);
      allOverlays=[];
      drawingManagerRef.current = createDrawingManager();
      zones.forEach(({ location: paths , _id , name  }) => {
        const poly = new google.maps.Polygon({ paths, title: name  });
        user.zones?.forEach((userzones) =>{ if (_id === userzones) { poly.setOptions({ strokeWeight: 2, fillColor: 'blue' });}})
        const location = poly?.getPath()?.getArray()?.map(p => Object.values(p.toJSON()));
        allOverlays.push(location);
        poly.setMap(mapRef.current);
        poly.addListener("click", showArrays);
        infoWindow = new google.maps.InfoWindow();
      });
      stop = drawingManagerRef.current.addListener('polygoncomplete', processPolygon);
    }
    fetchZones();
    return () => google.maps.event.removeListener(stop);
  }, [processPolygon, user.zones]);


  function showArrays(event) {
    infoWindow.setContent("Zone");
    infoWindow.setPosition(event.latLng);
    infoWindow.open(mapRef.current);
  }

  return (
    <>
      <SmallLogo/>
      <Buttonacc to="/">
      <Svg viewBox="0 0 156 147" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.10577 116.884C5.64558 119.084 6.79248 121.113 8.43141 122.767C10.0703 124.42 12.1437 125.64 14.4435 126.304L15.843 132.076H15.7264V146.67H140.126V132.076H36.5867C36.6888 131.402 36.6704 130.716 36.5323 130.047L35.0084 123.75L115.534 106.559L117.058 112.856C117.464 114.527 118.56 115.978 120.105 116.89C121.651 117.803 123.519 118.102 125.299 117.723L132.009 116.285C132.891 116.098 133.725 115.749 134.463 115.258C135.201 114.768 135.829 114.145 136.311 113.427C136.792 112.709 137.118 111.908 137.27 111.072C137.422 110.235 137.396 109.378 137.195 108.551L135.244 100.502C138.711 97.4668 140.453 92.8698 139.326 88.2217L134.738 69.3228C134.182 67.0459 132.974 64.9547 131.245 63.2742C129.516 61.5937 127.331 60.3876 124.926 59.7858L108.995 35.1369C106.646 31.5154 103.144 28.6777 98.9844 27.0241C94.8245 25.3706 90.2163 24.9847 85.8102 25.921L24.6366 38.9824C20.2257 39.9201 16.2415 42.1377 13.2493 45.3205C10.2571 48.5033 8.4089 52.4896 7.96696 56.7138L4.95804 85.4051C3.07081 86.9259 1.66097 88.9007 0.880114 91.1172C0.099263 93.3337 -0.0230613 95.708 0.526294 97.9849L5.10577 116.884ZM28.5862 111.864C27.2645 112.146 25.8964 112.182 24.5601 111.968C23.2237 111.755 21.9452 111.296 20.7976 110.619C19.65 109.942 18.6558 109.059 17.8718 108.021C17.0877 106.983 16.5291 105.811 16.2279 104.57C15.9267 103.33 15.8888 102.046 16.1163 100.792C16.3438 99.5375 16.8323 98.3377 17.5539 97.2607C18.2756 96.1837 19.2161 95.2506 20.322 94.5147C21.4278 93.7789 22.6773 93.2546 23.999 92.972C26.6683 92.4011 29.47 92.8487 31.7876 94.2165C34.1053 95.5842 35.7491 97.76 36.3574 100.265C36.9657 102.77 36.4887 105.4 35.0313 107.575C33.5739 109.75 31.2556 111.293 28.5862 111.864ZM115.837 93.2419C114.493 93.5888 113.088 93.6765 111.706 93.4998C110.325 93.3231 108.996 92.8857 107.799 92.2139C106.603 91.5421 105.564 90.6499 104.745 89.591C103.926 88.5322 103.344 87.3286 103.034 86.0529C102.724 84.7772 102.692 83.4558 102.941 82.1684C103.19 80.881 103.714 79.6542 104.482 78.562C105.25 77.4698 106.245 76.5349 107.408 75.8135C108.572 75.0922 109.878 74.5994 111.25 74.3649C113.867 73.9175 116.566 74.4351 118.786 75.8097C121.007 77.1843 122.576 79.3099 123.167 81.7436C123.759 84.1773 123.327 86.7313 121.961 88.8734C120.595 91.0154 118.402 92.5803 115.837 93.2419ZM28.0809 53.2113L89.2623 40.1426C90.4882 39.8826 91.7702 39.9899 92.9277 40.4493C94.0853 40.9088 95.0603 41.6972 95.7156 42.7038L108.039 61.7705L103.638 62.7118L25.5307 79.3998L21.1145 80.3411L23.4392 58.144C23.5644 56.9689 24.0798 55.8605 24.9127 54.9754C25.7457 54.0902 26.8539 53.4731 28.0809 53.2113ZM127.725 15.3259L116.801 0.732178L112.914 22.6228L132.351 51.8103L155.676 59.1072L140.126 40.5804L155.676 33.7724L140.126 26.9644L155.676 0.732178L127.725 15.3259Z" fill="#FFFBFB"/>
      </Svg>
      </Buttonacc>
      <Buttonpen onClick={() => drawingManagerRef.current.setMap(mapRef.current)} disabled={buttonDisabled}>
        <Svg viewBox="0 0 259 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M49.502 4.96674C49.8209 5.28991 50 5.72762 50 6.18395C50 6.64027 49.8209 7.07798 49.502 7.40115L45.9418 11.0011L39.1148 4.10469L42.6751 0.504791C42.9951 0.181573 43.4292 0 43.8817 0C44.3343 0 44.7683 0.181573 45.0884 0.504791L49.502 4.96329V4.96674ZM43.5284 13.4355L36.7015 6.53911L13.4457 30.035C13.2578 30.2248 13.1164 30.4562 13.0326 30.7109L10.2848 39.0348C10.235 39.1865 10.2279 39.3493 10.2644 39.5049C10.3008 39.6604 10.3794 39.8027 10.4913 39.9158C10.6033 40.0288 10.7441 40.1082 10.8981 40.145C11.0521 40.1819 11.2132 40.1747 11.3635 40.1244L19.6035 37.3486C19.8553 37.265 20.0844 37.1234 20.2726 36.9348L43.5284 13.4389V13.4355Z" fill="#F7F7F7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 44.8277C0 46.1995 0.539447 47.5151 1.49967 48.4851C2.45989 49.4551 3.76223 50 5.12018 50H42.6682C44.0262 50 45.3285 49.4551 46.2887 48.4851C47.2489 47.5151 47.7884 46.1995 47.7884 44.8277V24.1386C47.7884 23.6814 47.6086 23.2428 47.2885 22.9195C46.9684 22.5962 46.5343 22.4145 46.0817 22.4145C45.629 22.4145 45.1949 22.5962 44.8748 22.9195C44.5547 23.2428 44.3749 23.6814 44.3749 24.1386V44.8277C44.3749 45.285 44.1951 45.7235 43.875 46.0468C43.555 46.3702 43.1209 46.5518 42.6682 46.5518H5.12018C4.66753 46.5518 4.23342 46.3702 3.91335 46.0468C3.59327 45.7235 3.41346 45.285 3.41346 44.8277V6.89772C3.41346 6.44046 3.59327 6.00193 3.91335 5.67861C4.23342 5.35528 4.66753 5.17363 5.12018 5.17363H27.3076C27.7603 5.17363 28.1944 4.99199 28.5145 4.66866C28.8346 4.34533 29.0144 3.9068 29.0144 3.44954C29.0144 2.99228 28.8346 2.55375 28.5145 2.23042C28.1944 1.90709 27.7603 1.72545 27.3076 1.72545H5.12018C3.76223 1.72545 2.45989 2.27038 1.49967 3.24037C0.539447 4.21036 0 5.52595 0 6.89772V44.8277Z" fill="#F7F7F7"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M63.9609 44V9.875H73.5938C76.5625 9.875 79.1875 10.5312 81.4688 11.8438C83.75 13.1562 85.5078 15.0234 86.7422 17.4453C87.9922 19.8672 88.625 22.6484 88.6406 25.7891V27.9688C88.6406 31.1875 88.0156 34.0078 86.7656 36.4297C85.5312 38.8516 83.7578 40.7109 81.4453 42.0078C79.1484 43.3047 76.4688 43.9688 73.4062 44H63.9609ZM68.4609 13.5781V40.3203H73.1953C76.6641 40.3203 79.3594 39.2422 81.2812 37.0859C83.2188 34.9297 84.1875 31.8594 84.1875 27.875V25.8828C84.1875 22.0078 83.2734 19 81.4453 16.8594C79.6328 14.7031 77.0547 13.6094 73.7109 13.5781H68.4609ZM100.289 44H95.7891V9.875H100.289V44ZM118.594 28.7891C114.734 27.6797 111.922 26.3203 110.156 24.7109C108.406 23.0859 107.531 21.0859 107.531 18.7109C107.531 16.0234 108.602 13.8047 110.742 12.0547C112.898 10.2891 115.695 9.40625 119.133 9.40625C121.477 9.40625 123.562 9.85937 125.391 10.7656C127.234 11.6719 128.656 12.9219 129.656 14.5156C130.672 16.1094 131.18 17.8516 131.18 19.7422H126.656C126.656 17.6797 126 16.0625 124.688 14.8906C123.375 13.7031 121.523 13.1094 119.133 13.1094C116.914 13.1094 115.18 13.6016 113.93 14.5859C112.695 15.5547 112.078 16.9062 112.078 18.6406C112.078 20.0312 112.664 21.2109 113.836 22.1797C115.023 23.1328 117.031 24.0078 119.859 24.8047C122.703 25.6016 124.922 26.4844 126.516 27.4531C128.125 28.4062 129.312 29.5234 130.078 30.8047C130.859 32.0859 131.25 33.5938 131.25 35.3281C131.25 38.0938 130.172 40.3125 128.016 41.9844C125.859 43.6406 122.977 44.4688 119.367 44.4688C117.023 44.4688 114.836 44.0234 112.805 43.1328C110.773 42.2266 109.203 40.9922 108.094 39.4297C107 37.8672 106.453 36.0938 106.453 34.1094H110.977C110.977 36.1719 111.734 37.8047 113.25 39.0078C114.781 40.1953 116.82 40.7891 119.367 40.7891C121.742 40.7891 123.562 40.3047 124.828 39.3359C126.094 38.3672 126.727 37.0469 126.727 35.375C126.727 33.7031 126.141 32.4141 124.969 31.5078C123.797 30.5859 121.672 29.6797 118.594 28.7891ZM156.328 28.2266H141.539V40.3203H158.719V44H137.039V9.875H158.484V13.5781H141.539V24.5469H156.328V28.2266ZM189.516 39.5234C188.359 41.1797 186.742 42.4219 184.664 43.25C182.602 44.0625 180.195 44.4688 177.445 44.4688C174.664 44.4688 172.195 43.8203 170.039 42.5234C167.883 41.2109 166.211 39.3516 165.023 36.9453C163.852 34.5391 163.25 31.75 163.219 28.5781V25.6016C163.219 20.4609 164.414 16.4766 166.805 13.6484C169.211 10.8203 172.586 9.40625 176.93 9.40625C180.492 9.40625 183.359 10.3203 185.531 12.1484C187.703 13.9609 189.031 16.5391 189.516 19.8828H185.016C184.172 15.3672 181.484 13.1094 176.953 13.1094C173.938 13.1094 171.648 14.1719 170.086 16.2969C168.539 18.4062 167.758 21.4688 167.742 25.4844V28.2734C167.742 32.1016 168.617 35.1484 170.367 37.4141C172.117 39.6641 174.484 40.7891 177.469 40.7891C179.156 40.7891 180.633 40.6016 181.898 40.2266C183.164 39.8516 184.211 39.2188 185.039 38.3281V30.6641H177.141V27.0078H189.516V39.5234ZM223.266 44H218.742L201.562 17.7031V44H197.039V9.875H201.562L218.789 36.2891V9.875H223.266V44ZM250.523 35.0938H236.227L233.016 44H228.375L241.406 9.875H245.344L258.398 44H253.781L250.523 35.0938ZM237.586 31.3906H249.188L243.375 15.4297L237.586 31.3906Z" fill="white"/>
        </Svg>
      </Buttonpen>

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
        <MapsContainer ref={mapContainerRef} />
        <BottomPopup
          drag="y"
          dragConstraints={{ top: openPopupHeight, bottom: 0 }}
          dragElastic={0}
          dragTransition={{ bounceStiffness: 1300, bounceDamping: 20 }}
          bottom={openPopupHeight}
          marginBottom={closedPopupHeight}
        >
          <Alertnif {...{ severity }}>{message}</Alertnif>
          <Addzonemaps {...{ mapRef, drawingManagerRef, setButtonDisabled, point12, setClosedPopupHeight, setAlertConfig, severity }}/>
        </BottomPopup>
      </Container>
    </>
  );
}
