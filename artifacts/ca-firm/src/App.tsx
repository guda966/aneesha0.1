import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Industries from "@/pages/Industries";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.33, 1, 0.68, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22, ease: "easeIn" } },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}

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
      <main className="flex-1 pt-24">
        <AnimatePresence mode="wait" initial={false}>
          <Switch key={location}>
            <Route path="/">
              <PageWrapper><Home /></PageWrapper>
            </Route>
            <Route path="/about">
              <PageWrapper><About /></PageWrapper>
            </Route>
            <Route path="/services">
              <PageWrapper><Services /></PageWrapper>
            </Route>
            <Route path="/industries">
              <PageWrapper><Industries /></PageWrapper>
            </Route>
            <Route path="/resources">
              <PageWrapper><Resources /></PageWrapper>
            </Route>
            <Route path="/contact">
              <PageWrapper><Contact /></PageWrapper>
            </Route>
            <Route>
              <PageWrapper><NotFound /></PageWrapper>
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
