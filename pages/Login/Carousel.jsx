import {useRef,forwardRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { wrap } from "./utility";
import "./style.css";
import { useWindowSize } from "../../utility/useWindowSize";
import {  BottomPopupLabel , ArrowSvg , PathProps } from "./styled";
import SignupForm from "./SignupForm";

export function Carousel() {
  const ref = useRef();
  const { height } = useWindowSize();
  const yOffset = height/10*9

  const page = 0;
  const cur = wrap(0, 1, page);

  return (
    <div className="carousel" style={{ transform: `translateY(${yOffset}px)` }}>
      <motion.div className="track">
        <Item ref={ref} key={cur} yOffset={yOffset} />
      </motion.div>
    </div>
  );
}

const Item = forwardRef(function ({ yOffset }, ref) {
  const variants = {
    top: {
      y: -yOffset
    },
    bottom: {
      y: 0
    }
  };
  const currentVariant = useRef("bottom");
  const inMotion = useRef(false);
  const animation = useAnimation();

  const handleOnClick = async () => {
    if (inMotion.current === false) {
      currentVariant.current =
        currentVariant.current === "top" ? "bottom" : "top";
      await animation.start(currentVariant.current);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="item"
      variants={variants}
      animate={animation}
      drag="y"
      dragConstraints={{ top:-yOffset, bottom: 0 }}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 1300, bounceDamping: 20 }}
      transition={{
        y: { type: "spring", stiffness: 500, damping: 50 }
      }}
    >
      <div className="item-upper" onClick={handleOnClick}>
        <div className="item-col">
        <BottomPopupLabel>
          <ArrowSvg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <motion.path {...PathProps} d="M5 15l7-7 7 7" />
          </ArrowSvg>
        </BottomPopupLabel>
        </div>
      </div>
      <div className="item-lower">
        <SignupForm />
      </div>
    </motion.div>
  );
});
