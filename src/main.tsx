import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

const App = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
);
