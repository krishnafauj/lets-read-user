import { Variants } from "framer-motion";

export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const heroAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const hoverScale: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
};

export const hoverGlow: Variants = {
  rest: { boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: { boxShadow: "0px 10px 30px rgba(0, 190, 170, 0.3)", transition: { duration: 0.3 } },
};
