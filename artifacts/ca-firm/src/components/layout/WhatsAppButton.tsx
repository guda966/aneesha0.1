import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 4C13.507 4 5 12.507 5 23c0 3.617 1.001 7.002 2.74 9.9L4 44l11.44-3.677A18.928 18.928 0 0024 42c10.493 0 19-8.507 19-19S34.493 4 24 4z"
        fill="white"
      />
      <path
        d="M33.9 29.47c-.46-.23-2.718-1.34-3.14-1.492-.42-.154-.727-.23-1.032.23-.307.46-1.187 1.492-1.455 1.8-.267.307-.535.345-.995.115-2.716-1.358-4.5-2.425-6.29-5.498-.476-.816.477-.758 1.364-2.53.153-.307.077-.574-.038-.804-.115-.23-1.032-2.484-1.415-3.402-.374-.893-.755-.771-1.032-.786l-.88-.015c-.307 0-.804.115-1.224.574-.42.46-1.608 1.57-1.608 3.825s1.647 4.438 1.876 4.746c.229.307 3.234 4.94 7.839 6.932 2.916 1.258 4.06 1.365 5.52.893 1.032-.344 2.148-1.44 2.455-2.53.307-1.093.307-2.03.214-2.224-.09-.194-.42-.308-.88-.537z"
        fill="#25D366"
      />
    </svg>
  );
}

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            data-testid="scroll-to-top-button"
            className="w-11 h-11 bg-white border border-gray-200 text-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative"
          >
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
            <span className="absolute inset-[-4px] rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" style={{ animationDelay: "0.3s" }} />

            <a
              href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-xl hover:bg-[#20bd5a] hover:scale-110 transition-transform duration-200"
              aria-label="Chat on WhatsApp"
              data-testid="whatsapp-button"
            >
              <WhatsAppIcon />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
