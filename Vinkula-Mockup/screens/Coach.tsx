import React from 'react';

const Coach: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-4 pt-2">
      <div className="flex flex-col items-center gap-4 py-4 animate-fade-in-up">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#137fec] to-[#63b3ed] shadow-lg shadow-blue-500/30">
          <span className="material-symbols-outlined text-[40px] text-white">smart_toy</span>
          <span className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-[#1c2630] ring-2 ring-transparent">
            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#111418] dark:text-white">Coach Financiero</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[280px] mx-auto leading-relaxed">
            Hola Andrés, he analizado tus movimientos recientes. Aquí tienes tu reporte inteligente de hoy.
          </p>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#111418] dark:text-white">Alertas Proactivas</h2>
          <span className="rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs font-bold text-red-600 dark:text-red-400">2 alertas</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-[#1c2630] p-4 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800 transition-all hover:shadow-md">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-xl"></div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-[#111418] dark:text-white">Límite de Presupuesto: Ocio</h3>
                  <span className="text-[10px] text-gray-400">Hace 2h</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">Estás al <span className="font-bold text-orange-600 dark:text-orange-400">92%</span> de tu presupuesto mensual.</p>
                <div className="mt-3 flex gap-3 border-t border-gray-50 dark:border-gray-800 pt-2">
                  <button className="flex items-center gap-1 text-xs font-semibold text-[#137fec] hover:text-[#137fec]/80 transition-colors">
                    <span>Ver gastos</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#137fec] text-[20px]">verified</span>
          <h2 className="text-lg font-bold text-[#111418] dark:text-white">Recomendación Personalizada</h2>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-[#137fec] to-[#1c64f2] p-5 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-xl"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <span className="material-symbols-outlined text-[18px]">savings</span>
              </div>
              <span className="text-xs font-bold text-blue-50 uppercase tracking-widest opacity-80">Oportunidad de Ahorro</span>
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight mb-2">Potencia tu Fondo de Emergencia</h3>
              <p className="text-sm text-blue-50/90 leading-relaxed font-light">
                ¡Buenas noticias! Noté que te sobraron <span className="font-bold text-white">$150.000</span> de tu presupuesto de transporte este mes.
              </p>
            </div>
            <button className="w-full rounded-lg bg-white py-3 text-center text-sm font-bold text-[#137fec] shadow-sm hover:bg-blue-50 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
              <span>Transferir $150.000</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coach;
