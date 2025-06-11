import { easeInOut, easeOut } from "framer-motion";

export const containerVariants = (delayChildren = 0) => ({
  // initial state
  hidden: {},
  // animate state
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: delayChildren,
    },
  },
});

export const listItemVariants = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

export const cardsVariants = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

export const cardsGalleryVariants = {
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4, easeInOut } },
};
