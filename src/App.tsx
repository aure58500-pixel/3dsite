import { Cursor } from './components/Cursor'
import { FilmGrain } from './components/FilmGrain'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Loader } from './components/Loader'
import { useLenis } from './animations/useLenis'
import { SceneLoader } from './scene/SceneLoader'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Projects } from './sections/Projects'
import { Services } from './sections/Services'
import { Stats } from './sections/Stats'

export default function App() {
  useLenis()

  return (
    <>
      <SceneLoader />
      <Header />
      <main id="contenu" className="relative z-10">
        <Hero />
        <Manifesto />
        <Projects />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <FilmGrain />
      <Cursor />
      <Loader />
    </>
  )
}
