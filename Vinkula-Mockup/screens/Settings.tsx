import React from 'react';

interface SettingsProps {
  onLogout?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const sections = [
    { title: 'Cuenta', items: ['Perfil', 'Seguridad', 'Notificaciones'] },
    { title: 'Preferencias', items: ['Moneda', 'Tema', 'Idioma'] },
    { title: 'Soporte', items: ['Ayuda', 'Términos y Condiciones'] },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 pt-4">
      <div className="flex items-center gap-4 mb-2">
         <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
            <img src="https://picsum.photos/100" alt="Profile" className="h-full w-full object-cover" />
         </div>
         <div>
            <h2 className="text-xl font-bold text-[#111418] dark:text-white">Andrés Gómez</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">andres.gomez@email.com</p>
            <button className="text-xs font-semibold text-[#137fec] mt-1 hover:text-blue-400 transition-colors">Editar perfil</button>
         </div>
      </div>

      <div className="flex flex-col gap-6">
        {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-2">{section.title}</h3>
                <div className="bg-white dark:bg-[#1c2630] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                    {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="group flex items-center justify-between p-4 border-b last:border-b-0 border-gray-50 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <span className="text-sm font-medium text-[#111418] dark:text-white">{item}</span>
                            <span className="material-symbols-outlined text-gray-400 text-[20px] group-hover:text-[#137fec] transition-colors">chevron_right</span>
                        </div>
                    ))}
                </div>
            </div>
        ))}

        <button 
            onClick={onLogout}
            className="mt-2 w-full py-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors active:scale-[0.98]"
        >
            Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Settings;
