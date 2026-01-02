import React from 'react';

const Shared: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-4 pt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-[#111418] dark:text-white">Finanzas Compartidas</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona gastos con tu pareja, amigos o familia.</p>
      </div>

      {/* Tarjeta de Grupo Principal */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg">
            <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex -space-x-3">
                    <img className="h-10 w-10 rounded-full border-2 border-white dark:border-[#101922]" src="https://picsum.photos/100" alt="User 1" />
                    <img className="h-10 w-10 rounded-full border-2 border-white dark:border-[#101922]" src="https://picsum.photos/101" alt="User 2" />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white dark:border-[#101922] bg-white/20 text-xs font-bold backdrop-blur-sm">
                        +2
                    </div>
                </div>
                <span className="rounded-lg bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                    Casa & Servicios
                </span>
            </div>
            
            <div className="relative z-10">
                <p className="text-sm font-medium text-purple-100 opacity-90">Gastos del mes</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h1 className="text-3xl font-bold">$ 2.450.000</h1>
                    <span className="text-sm font-medium text-purple-200">/ $ 3.000.000</span>
                </div>
                <div className="mt-4 w-full bg-black/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full rounded-full w-[81%]"></div>
                </div>
                <p className="mt-2 text-xs text-purple-100 text-right">Debes: $ 320.000</p>
            </div>

             {/* Decoración */}
             <div className="absolute top-0 right-0 h-full w-1/2 bg-white/5 skew-x-12"></div>
        </div>
      </section>

      {/* Actividad Reciente */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#111418] dark:text-white">Actividad Reciente</h3>
          <button className="text-sm font-semibold text-purple-600 dark:text-purple-400">Ver todo</button>
        </div>
        
        <div className="flex flex-col gap-3">
             <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1c2630] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <div className="flex-1">
                    <p className="text-[#111418] dark:text-white font-semibold">Supermercado Éxito</p>
                    <p className="text-xs text-gray-500">Pagado por <span className="font-bold">Ana</span></p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-[#111418] dark:text-white">$ 450.000</p>
                    <p className="text-xs text-gray-400">Hoy, 10:30 AM</p>
                </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1c2630] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    <span className="material-symbols-outlined">bolt</span>
                </div>
                <div className="flex-1">
                    <p className="text-[#111418] dark:text-white font-semibold">Factura de Luz</p>
                    <p className="text-xs text-gray-500">Pagado por <span className="font-bold">Tú</span></p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-[#111418] dark:text-white">$ 120.000</p>
                    <p className="text-xs text-gray-400">Ayer</p>
                </div>
            </div>
        </div>
      </section>

      {/* Botón Flotante para Dividir Gasto */}
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111418] dark:bg-white py-4 text-white dark:text-[#111418] font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
        <span className="material-symbols-outlined">call_split</span>
        <span>Dividir nuevo gasto</span>
      </button>
    </div>
  );
};

export default Shared;
