"use client";

import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const SideScroll = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [scrollBackTo, setScrollBackTo] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > window.innerHeight) {
        setStyle({ display: "flex" });
        setScrollBackTo(window.scrollY);
        setDirection("up");
      } else {
        if (direction === "up") {
          setStyle({ display: "none" });
        }
      }
    };

    const throttledScrollHandler = throttle(scrollHandler, 500);

    window.addEventListener("scroll", throttledScrollHandler);

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [direction]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (direction === "up") {
      window.scrollTo(0, 0);
      setDirection("down");
    } else {
      window.scrollTo(0, scrollBackTo);
      setDirection("up");
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className="fixed top-0 hidden h-screen w-6 cursor-pointer items-center justify-center border-none bg-gray-600 opacity-75 outline-none transition-all hover:bg-gray-500"
      style={style}
      onClick={handleClick}
    >
      <span>
        {direction === "down" ? (
          <MdKeyboardArrowUp className="h-5 w-5 animate-rotate" />
        ) : (
          <MdKeyboardArrowDown className="h-5 w-5 animate-rotate" />
        )}
      </span>
    </button>
  );
};

export default SideScroll;
