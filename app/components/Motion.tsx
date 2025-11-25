"use client";
import React from "react";
import { motion } from "framer-motion";

// Pequeños wrappers cliente para usar motion.* desde componentes server
export function MotionH1(props: React.ComponentProps<typeof motion.h1>) {
  const defaults = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  } as Partial<React.ComponentProps<typeof motion.h1>>;

  return <motion.h1 {...defaults} {...props} />;
}

export function MotionArticle(props: React.ComponentProps<typeof motion.article>) {
  return <motion.article {...props} />;
}

export default MotionH1;
