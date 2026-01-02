import React, { useState } from 'react';
import NavBar from './components/NavBar';
import ChatBot from './components/ChatBot';
import Home from './screens/Home';
import Budget from './screens/Budget';
import Shared from './screens/Shared';
import Statistics from './screens/Statistics';
import Settings from './screens/Settings';
import Login from './screens/Login';
import Register from './screens/Register';
import RecoverPassword from './screens/RecoverPassword';
import { Screen } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);

  if (!isAuthenticated) {
    if (isRecovering) {
      return <RecoverPassword onBack={() => setIsRecovering(false)} />;
    }
    if (isRegistering) {
      return (
        <Register 
          onRegister={() => setIsAuthenticated(true)} 
          onLogin={() => setIsRegistering(false)} 
        />
      );
    }
    return (
      <Login 
        onLogin={() => setIsAuthenticated(true)} 
        onRegister={() => setIsRegistering(true)}
        onForgotPassword={() => setIsRecovering(true)}
      />
    );
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsRegistering(false);
    setIsRecovering(false);
    setCurrentScreen(Screen.Home);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Home:
        return <Home />;
      case Screen.Budget:
        return <Budget />;
      case Screen.Shared:
        return <Shared />;
      case Screen.Statistics:
        return <Statistics />;
      case Screen.Settings:
        return <Settings onLogout={handleLogout} />;
      default:
        return <Home />;
    }
  };

  const getTitle = () => {
    switch (currentScreen) {
      case Screen.Home: return 'Resumen';
      case Screen.Budget: return 'Presupuesto';
      case Screen.Shared: return 'Compartidos';
      case Screen.Statistics: return 'Estadísticas';
      case Screen.Settings: return 'Ajustes';
      default: return 'Finanzas';
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f7f8] dark:bg-[#101922] font-display text-[#111418] dark:text-gray-100 antialiased pb-24">
      {/* Top Header */}
      <header className="flex items-center justify-between p-4 bg-[#f6f7f8] dark:bg-[#101922] sticky top-0 z-20 transition-colors duration-200">
        <div className="flex items-center gap-3">
          {currentScreen === Screen.Home ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-orange-700 border-2 border-white dark:border-[#101922] shadow-sm overflow-hidden">
                  <img src="https://picsum.photos/100" alt="Profile" className="h-full w-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white dark:border-[#101922] rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Buenos días,</span>
                <h2 className="text-lg font-bold leading-tight text-[#111418] dark:text-white">Andrés</h2>
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-bold text-[#111418] dark:text-white">{getTitle()}</h1>
          )}
        </div>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#111418] dark:text-white relative">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-[#f6f7f8] dark:border-[#101922]"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {renderScreen()}
      </main>

      {/* Interactive Chatbot */}
      <ChatBot />

      {/* Navigation */}
      <NavBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
};

export default App;
