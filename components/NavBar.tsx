import React from 'react';
import { Screen } from '../types';

interface NavBarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: Screen.Home, icon: 'home', label: 'Inicio' },
    { id: Screen.Budget, icon: 'pie_chart', label: 'Presupuesto' },
    { id: Screen.Shared, icon: 'groups', label: 'Compartidos' },
    { id: Screen.Statistics, icon: 'bar_chart', label: 'Estadísticas' },
    { id: Screen.Settings, icon: 'settings', label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1c2630] border-t border-gray-100 dark:border-gray-800 pb-safe z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between px-6 py-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group flex flex-col items-center justify-center gap-1 w-16"
            >
              <span 
                className={`material-symbols-outlined text-[26px] transition-colors duration-200 ${
                  isActive 
                    ? 'text-[#137fec]' 
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                }`}
                style={{ 
                  fontVariationSettings: "'FILL' 1, 'wght' 400"
                }}
              >
                {item.icon}
              </span>
              <span 
                className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive 
                    ? 'text-[#137fec] font-semibold' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
