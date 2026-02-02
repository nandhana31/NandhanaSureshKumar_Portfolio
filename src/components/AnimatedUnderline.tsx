'use client';
import { motion } from 'framer-motion';

export default function AnimatedUnderline() {
  return (
    <div className="flex justify-center items-center gap-2 my-6">
      <motion.div
        className="h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-teal-500 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-teal-500"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
      />
      <motion.div
        className="h-0.5 bg-gradient-to-r from-teal-500 to-transparent rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </div>
  );
}
