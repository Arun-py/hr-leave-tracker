import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import ModulesSection from './ModulesSection';
import TechStackSection from './TechStackSection';
import WorkflowSection from './WorkflowSection';
import ScreenshotsSection from './ScreenshotsSection';
import CTASection from './CTASection';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <TechStackSection />
      <WorkflowSection />
      <ScreenshotsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
