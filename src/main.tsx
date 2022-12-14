import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import '@/styles/index.scss';
import GameContextProvider from '@/contexts/GameContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
)
