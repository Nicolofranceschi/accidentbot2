import { Frame } from "./styled";
import TrafficMaps from "../TrafficMaps";
import { Data } from "./Data"
import { useWindowSize } from "../../utility/useWindowSize";

export default function Card({ location, reliability, roadType }) {
  const dim  = useWindowSize();
  const height = dim.height / 2;

  return (
    <Frame style={{ height }}>
      <TrafficMaps {...{ location }}  />
      <Data {...{ reliability, roadType }} />
    </Frame>
  );
}
