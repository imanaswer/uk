import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Journey from '@/components/Journey';
import Courses from '@/components/Courses';
import Programmes from '@/components/Programmes';
import Why from '@/components/Why';
import Campus from '@/components/Campus';
import Network from '@/components/Network';
import Stories from '@/components/Stories';
import Software from '@/components/Software';
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
        <Programmes />
        <Why />
        <Campus />
        <Network />
        <Stories />
        <Software />
        <Enquire />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
