import React, { useState, useEffect } from 'react';
import { DeckContainer } from './components/layout/DeckContainer';
import { PresenterConsole } from './components/presenter/PresenterConsole';

export const App: React.FC = () => {
  const [isPresenterMode, setIsPresenterMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('mode') === 'notes' || params.get('presenter') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const checkMode = () => {
      const params = new URLSearchParams(window.location.search);
      setIsPresenterMode(params.get('mode') === 'notes' || params.get('presenter') === 'true');
    };

    window.addEventListener('popstate', checkMode);
    return () => window.removeEventListener('popstate', checkMode);
  }, []);

  if (isPresenterMode) {
    return <PresenterConsole />;
  }

  return <DeckContainer />;
};

export default App;
