import { AnimateSharedLayout } from "framer-motion";
import { List, Listcontainer, Underline,  BackNextButtons } from "./styled"

export const screens = [
  {
    title: "User",
    color: "#ff0055"
  },
  {
    title: "Admin",
    color: "#0099ff"
  }
];

export default function Scelta({ next, role, setRole }) {
  return (
    <>
      <AnimateSharedLayout>
        <Listcontainer style={{ transform: "translateZ(0)" }}>
          {screens.map(({ title, color }, i) => (
            <List
              animate={{ color: i === role ? color : "#333" , fontSize: i === role ? "64px" : "32px" }}
              transition={{ duration: 0.5 }}
              key={i}
              onClick={() => setRole(i)}
            >
              {i === role && (
                <Underline
                  className="underline"
                  style={{ backgroundColor: color }}
                />
              )}
              {title}
            </List>
          ))}
        </Listcontainer>
      </AnimateSharedLayout>
      <BackNextButtons {...{ next }} />
    </>
  );
}
