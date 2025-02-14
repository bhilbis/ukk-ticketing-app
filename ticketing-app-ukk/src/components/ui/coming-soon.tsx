import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ComingSoon = ({ title = "Coming Soon", description = "Fitur ini sedang dalam pengembangan. Nantikan segera!", showButton = true }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="text-lg font-semibold text-gray-800"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          🚀 Coming Soon...
        </motion.span>
        {showButton && <Button className="mt-4">Lihat Menu Lainnya</Button>}
      </motion.div>
    </div>
  );
};

export default ComingSoon;
