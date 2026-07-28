import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { MostWantedSection } from '@/components/home/MostWantedSection';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { CollectionsSection } from '@/components/home/CollectionsSection';
import { PackagesSection } from '@/components/home/PackagesSection';
import { ContactSection } from '@/components/home/ContactSection';
import { WhatsappFAB } from '@/components/ui/WhatsappFAB';
import { ScrollObserver } from '@/components/ui/ScrollObserver';

export default function Home() {
  return (
    <>
      <ScrollObserver />
      <Navbar />
      <main>
        <HeroSection />
        <MostWantedSection />
        <NewArrivalsSection />
        <CollectionsSection />
        <PackagesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsappFAB />
    </>
  );
}
