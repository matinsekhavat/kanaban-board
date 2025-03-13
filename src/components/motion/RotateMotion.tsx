import { motion } from "motion/react";

type RotateMotionProps = {
  children: React.ReactNode;
  initialRotate?: number;
  animateRotate?: number;
  exitRotate?: number;
  duration?: number;
  ease?: string;
  delay?: number;
};
function RotateMotion({
  children,
  initialRotate = -90,
  animateRotate = 0,
  exitRotate = 90,
  duration = 0.3,
  ease = "easeInOut",
  delay = 0,
}: RotateMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: initialRotate }}
      animate={{ opacity: 1, rotate: animateRotate }} // when reached Animate everything should be default
      exit={{ opacity: 0, rotate: exitRotate }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export default RotateMotion;
