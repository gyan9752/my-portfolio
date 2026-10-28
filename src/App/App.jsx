import { useCallback, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Cursor from '../components/Cursor/Cursor';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Projects from '../components/Projects/Projects';
import Stack from '../components/Stack/Stack';
import Journey from '../components/Journey/Journey';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import ProjectOverlay from '../components/ProjectOverlay/ProjectOverlay';
import BookingModal from '../components/BookingModal/BookingModal';
import Intro from '../components/Intro/Intro';
import AdminPortal from '../components/Admin/AdminPortal';
import { getVisitor, syncPendingVisitor } from '../services/api';
import './App.css';

const checkIsAdmin = () => {
  const p = window.location.pathname.toLowerCase();
  const h = window.location.hash.toLowerCase();
  const s = new URLSearchParams(window.location.search);
  return (
    p.startsWith('/gadmin') ||
    p.startsWith('/admin') ||
    h === '#gadmin' ||
    h === '#admin' ||
    s.has('gadmin') ||
    s.has('admin')
  );
};

export default function App() {
  const [isAdminPath, setIsAdminPath] = useState(checkIsAdmin);
  const [ready, setReady] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  // Intro gate: shown until a visitor has entered name + email (add ?intro to the URL to replay it)
  const [entered, setEntered] = useState(
    () => checkIsAdmin() || (!!getVisitor() && !new URLSearchParams(window.location.search).has('intro'))
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminPath(checkIsAdmin());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    syncPendingVisitor();
  }, []);

  // Lock page scroll while the loader or a project overlay or booking modal is on screen
  useEffect(() => {
    document.body.style.overflow = !ready || activeProject || isBookingOpen ? 'hidden' : '';
  }, [ready, activeProject, isBookingOpen]);

  const handleReady = useCallback(() => setReady(true), []);

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (isAdminPath) {
    return <AdminPortal />;
  }

  if (!entered) return <Intro onDone={() => setEntered(true)} />;

  return (
    <div className="app">
      <Loader onDone={handleReady} />
      <Cursor />
      <ScrollProgress />
      <Navbar ready={ready} go={go} onOpenBooking={() => setIsBookingOpen(true)} />

      <main>
        <Hero ready={ready} go={go} onOpenBooking={() => setIsBookingOpen(true)} />
        <About />
        <Projects onOpen={setActiveProject} />
        <Stack />
        <Journey />
        <Contact />
      </main>

      <Footer go={go} />
      <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
