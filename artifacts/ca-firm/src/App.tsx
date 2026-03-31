import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import NotFound from "@/pages/not-found";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

function ScrollReset() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollReset />
      <Header />
      <main className="pt-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex flex-col min-h-[calc(100vh-6rem)]"
          >
            <Switch>
              <Route path="/"><Home /></Route>
              <Route path="/about"><About /></Route>
              <Route path="/services"><Services /></Route>
              <Route path="/resources"><Resources /></Route>
              <Route path="/contact"><Contact /></Route>
              <Route><NotFound /></Route>
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
