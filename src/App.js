import React from 'react';
import Portfolio from './pages/Portfolio';
import { SocketProvider } from './components/Providers/socket';

const App = () => {

  return (
    <SocketProvider>
      <Portfolio />
    </SocketProvider>
  );
};

export default App;