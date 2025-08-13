"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

type MotionElementTag = keyof typeof motion;

type MotionClientWrapperProps<T extends MotionElementTag> = {
	type?: T;
	children: React.ReactNode;
} & React.ComponentProps<(typeof motion)[T]>;

const MotionClientWrapper = <T extends MotionElementTag = "div">({
	type,
	children,
	...props
}: MotionClientWrapperProps<T>) => {
	const localRef = useRef<HTMLElement | null>(null);
	const isInView = useInView(localRef, { once: true, amount: 0.6 });

	const Component =
		type && (motion as any)[type] ? (motion as any)[type] : motion.div;

	return (
		<Component ref={localRef} {...props} animate={isInView ? "show" : "hidden"}>
			{children}
		</Component>
	);
};

export default MotionClientWrapper;
