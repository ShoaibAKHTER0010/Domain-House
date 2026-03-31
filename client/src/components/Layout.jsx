import { Outlet } from 'react-router-dom'
import { Background } from './Background'
import { CursorGlow } from './CursorGlow'
import { ScrollProgress } from './ScrollProgress'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/**
 * Shared shell: animated global background, nav, footer, scroll UI.
 */
export function Layout() {
  return (
    <>
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <div className="relative z-10">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
