'use client';
import { useState, useEffect } from 'react';
import OpeningGate from '@/components/OpeningGate';
import ClientLayout from '@/components/ClientLayout';
import Hero from '@/components/Hero';
import Nimantran from '@/components/Nimantran';
import Countdown from '@/components/Countdown';
import LoveStory from '@/components/LoveStory';
import EventCards from '@/components/EventCards';
import RitualsAccordion from '@/components/RitualsAccordion';
import Gallery from '@/components/Gallery';
import RSVPForm from '@/components/RSVPForm';
import TravelStay from '@/components/TravelStay';
import WishesWall from '@/components/WishesWall';
import Footer from '@/components/Footer';

import FallingPetals from '@/components/FallingPetals';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling on body until gate is open
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && <OpeningGate onOpen={() => setIsOpen(true)} />}
      
      <div style={{ 
        opacity: isOpen ? 1 : 0, 
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'opacity 1s ease, visibility 1s ease'
      }}>
        <ClientLayout>
          <Hero />
          <Nimantran />
          <Countdown />
          <LoveStory />
          <EventCards />
          <RitualsAccordion />
          <Gallery />
          <RSVPForm />
          <TravelStay />
          <WishesWall />
          <Footer />
        </ClientLayout>
      </div>

      {/* Floating Petals Canvas */}
      {isOpen && <FallingPetals />}
    </>
  );
}
