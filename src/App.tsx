import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Solutions } from './components/Solutions';
import { Advantages } from './components/Advantages';
import { TechStack } from './components/TechStack';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Pricing } from './components/Pricing';
import { WhyCheaper } from './components/WhyCheaper';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#06080c] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Solutions />
          <Advantages />
          <TechStack />
          <Process />
          <Projects />
          <Pricing />
          <WhyCheaper />
          <ContactForm />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  );
}