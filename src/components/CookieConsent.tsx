"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "midec26_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-3xl mx-auto bg-surface/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium mb-1">
                  🍪 Cookies
                </p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  Usamos cookies y tecnologías de terceros (como Google AdSense)
                  para mejorar tu experiencia, analizar el tráfico y personalizar
                  el contenido. Al continuar navegando, aceptas el uso de cookies
                  según nuestra{" "}
                  <a
                    href="/politica-privacidad"
                    className="text-red-500 hover:underline"
                  >
                    Política de Privacidad
                  </a>
                  .
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={reject}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                >
                  Rechazar
                </button>
                <button
                  onClick={accept}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-[0_2px_8px_rgba(220,38,38,0.3)]"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
