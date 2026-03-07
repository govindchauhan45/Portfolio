import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Videos } from './components/Videos';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { MatrixBackground } from './components/MatrixBackground';
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import Loading3D from './components/Loading3D';
import ChatWidget from './components/ChatWidget';
import Navbar from './components/Navbar';
import BrainBackground from './components/BrainBackground';

function App() {
  return (
    <main className="bg-background min-h-screen selection:bg-primary selection:text-black">
      <Loading3D />
      <Navbar />
      <BrainBackground />
      <ParticleBackground />
      <MatrixBackground />
      <CursorGlow />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.03),transparent_50%)] z-10" />
      <div className="relative z-10">
        <Hero />
        <Videos />
        <Projects />
        <Skills />
        <Contact />

        <ChatWidget />

        <footer className="py-6 text-center text-gray-600 font-mono text-sm border-t border-gray-900 mt-12">
          <p>SYSTEM STATUS: ONLINE | © 2026</p>
        </footer>
      </div>
    </main>
  )
}

export default App
