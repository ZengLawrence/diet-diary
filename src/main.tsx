import { StrictMode } from 'react'
import App from './App'

import('react-dom/client').then(({ createRoot }) => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}).catch((error) => {
  console.error('Failed to load ReactDOM:', error);
  const fallbackContainer = document.getElementById('root');
    if (fallbackContainer) {
        fallbackContainer.textContent = 'Sorry, the application could not load. Please refresh your browser.';
    }
});
