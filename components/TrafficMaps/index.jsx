import { useLayoutEffect, useRef, useState } from "react";
import { mapConfig } from "./config";
import { TrafficMapstyle, TextMap } from "./styled";
import { ExternalLink } from '../Lib';

let google = null;


export default function TrafficMaps({ location }) {
  const mapContainerRef = useRef(null);

  const [content, setContent] = useState("No find zone");
  const [locations, setLocations] = useState();

  useLayoutEffect(() => {
    google = window?.google;
    const map = new google.maps.Map(
      mapContainerRef.current,
      mapConfig(location, 13)
      );
    
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    const geocoder = new google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng),
    };
    setLocations(latlng)
    new google.maps.Marker({
      position: latlng,
      map,
      title: "Sinistri",
    });
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") setContent(results[0].formatted_address);
    });
  }, [location]);

  return (
    <>
      <TrafficMapstyle ref={mapContainerRef} />
      <ExternalLink href={`https://www.google.com/maps/search/${locations?.lat},${locations?.lng}`}>
        <TextMap>{content}</TextMap>
      </ExternalLink>
    </>
  );
}
