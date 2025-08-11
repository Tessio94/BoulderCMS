"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionClientWrapper = ({
  type,
  children,
  ...props
}: {
  type?: keyof typeof motion;
  children: React.ReactNode;
}) => {
  const localRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(localRef, { once: true, amount: 0.6 });

  const Component = type && motion[type] ? motion[type] : motion.div;

  return (
    <Component ref={localRef} {...props} animate={isInView ? "show" : "hidden"}>
      {children}
    </Component>
  );
};

export default MotionClientWrapper;
