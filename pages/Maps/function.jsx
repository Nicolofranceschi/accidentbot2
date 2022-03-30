import * as turf from '@turf/turf'
import {allOverlays} from "./index"

export function calcIntersection({newOverlay,setAlertConfig,setPoint12}) {

  const arrLOcation= [newOverlay?.getPath()?.getArray()?.map(p => Object.values(p.toJSON()))];
  const B = turf.multiPolygon(arrLOcation);
  
  const result = allOverlays.reduce((accumulator,element)=> {

    const temp = new Array(element)
    const A = turf.multiPolygon(temp);
    const result = turf.intersect(A,B);
    
    if (result===null) return accumulator ;
    else return accumulator+1;
  },0);
      
  if (result > 0) {
    newOverlay.setOptions({ strokeWeight: 2.0, fillColor: 'red' });
    setAlertConfig({ severity: 'error', message: 'La zona creata si interseca con altre' });
    setPoint12(null);
    return true;
  } else {
    newOverlay.setOptions({ strokeWeight: 2.0, fillColor: 'green' });
    setAlertConfig({ severity: 'success', message: 'Zona selezionata con successo' });
    setPoint12(newOverlay);
    return false;
  }
}