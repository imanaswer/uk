import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Journey from '@/components/Journey';
import Courses from '@/components/Courses';
import Why from '@/components/Why';
import Network from '@/components/Network';
import Stories from '@/components/Stories';
import Enquire from '@/components/Enquire';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Journey />
        <Courses />
        <Why />
        <Network />
        <Stories />
        <Enquire />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
