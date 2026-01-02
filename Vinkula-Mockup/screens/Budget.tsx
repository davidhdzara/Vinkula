import React, { useState } from 'react';

const Budget: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('Octubre 2023');

  // Datos simulados para las categorías
  const categories = [
    { id: 1, name: 'Vivienda', icon: 'home', spent: 1200000, limit: 1500000, color: 'bg-blue-500' },
    { id: 2, name: 'Alimentación', icon: 'restaurant', spent: 850000, limit: 1000000, color: 'bg-green-500' },
    { id: 3, name: 'Transporte', icon: 'directions_car', spent: 320000, limit: 400000, color: 'bg-yellow-500' },
    { id: 4, name: 'Ocio', icon: 'movie', spent: 280000, limit: 300000, color: 'bg-purple-500' },
    { id: 5, name: 'Compras', icon: 'shopping_bag', spent: 450000, limit: 400000, color: 'bg-red-500' }, // Over budget
  ];

  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const totalLimit = categories.reduce((acc, cat) => acc + cat.limit, 0);
  const percentTotal = Math.min((totalSpent / totalLimit) * 100, 100);

  return (
    <div className="flex flex-col gap-6 px-4 pt-2">
      {/* Selector de Mes */}
      <div className="flex items-center justify-between px-2">
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">chevron_left</span>
        </button>
        <span className="text-lg font-bold text-gray-900 dark:text-white">{currentMonth}</span>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">chevron_right</span>
        </button>
      </div>

      {/* Tarjeta de Resumen Principal */}
      <div className="relative overflow-hidden rounded-2xl bg-[#137fec] p-6 text-white shadow-lg shadow-blue-500/20">
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-medium text-blue-100 mb-1">Presupuesto Total</p>
              <h2 className="text-3xl font-bold">${totalLimit.toLocaleString()}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-100">Disponible</p>
              <p className="text-lg font-bold">${(totalLimit - totalSpent).toLocaleString()}</p>
            </div>
          </div>
          
          {/* Barra de Progreso General */}
          <div className="w-full bg-blue-900/30 h-3 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentTotal}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs font-medium text-blue-100">
            <span>Gastado: ${totalSpent.toLocaleString()}</span>
            <span>{Math.round(percentTotal)}%</span>
          </div>
        </div>

         {/* Elementos Decorativos */}
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
         <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Lista de Categorías */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categorías</h3>
          <button className="text-sm font-semibold text-[#137fec] hover:text-[#137fec]/80">Editar</button>
        </div>

        <div className="flex flex-col gap-3">
          {categories.map((cat) => {
            const percent = Math.min((cat.spent / cat.limit) * 100, 100);
            const isOverBudget = cat.spent > cat.limit;

            return (
              <div key={cat.id} className="bg-white dark:bg-[#1c2630] p-4 rounded-xl shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isOverBudget ? 'bg-red-100 text-red-600' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}>
                    <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h4>
                      <span className={`text-sm font-bold ${isOverBudget ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                        ${cat.spent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>Límite: ${cat.limit.toLocaleString()}</span>
                      <span>{Math.round((cat.spent / cat.limit) * 100)}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Barra de Progreso por Categoría */}
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : cat.color}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Botón para Añadir */}
      <button className="flex items-center justify-center gap-2 w-full py-4 mb-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <span className="material-symbols-outlined">add</span>
        <span className="font-medium">Crear nuevo presupuesto</span>
      </button>
    </div>
  );
};

export default Budget;
