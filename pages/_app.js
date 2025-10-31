// pages/_app.js
import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion' // optional: used by pages for smooth transitions

export default function App({ Component, pageProps }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} />
    </AnimatePresence>
  )
}
