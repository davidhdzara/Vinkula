import React from 'react';

const Statistics: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-4 pt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-[#111418] dark:text-white">Análisis Financiero</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tu comportamiento de gastos este mes.</p>
      </div>

      {/* Gráfico Principal (Simulado visualmente) */}
      <section className="bg-white dark:bg-[#1c2630] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Flujo de Caja</h3>
            <select className="bg-gray-50 dark:bg-white/5 border-none text-xs font-semibold text-gray-500 rounded-lg py-1 px-2 outline-none">
                <option>Últimos 6 meses</option>
                <option>Este año</option>
            </select>
        </div>
        
        {/* Barras del gráfico */}
        <div className="flex items-end justify-between gap-2 h-40 w-full px-2">
            {[40, 65, 45, 80, 55, 90].map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-md relative group h-full flex items-end overflow-hidden">
                        <div 
                            className={`w-full rounded-t-md transition-all duration-1000 ${i === 5 ? 'bg-[#137fec]' : 'bg-gray-300 dark:bg-gray-600'}`}
                            style={{ height: `${height}%` }}
                        ></div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                        {['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'][i]}
                    </span>
                </div>
            ))}
        </div>
      </section>

      {/* Resumen de IA */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 p-5 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10 flex gap-4">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                <span className="material-symbols-outlined">insights</span>
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">Insight Semanal</h4>
                <p className="text-sm text-indigo-100 leading-relaxed">
                    Tus gastos en <span className="font-bold text-white">Restaurantes</span> han disminuido un 15% comparado con el mes anterior. ¡Buen trabajo manteniendo el presupuesto!
                </p>
            </div>
          </div>
      </section>

      {/* Desglose */}
      <section className="flex flex-col gap-4 mb-4">
        <h3 className="text-lg font-bold text-[#111418] dark:text-white">Gastos por Categoría</h3>
        <div className="flex flex-col gap-3">
            {[
                { name: 'Vivienda', amount: '1.2M', percent: 45, color: 'bg-blue-500' },
                { name: 'Comida', amount: '850k', percent: 28, color: 'bg-green-500' },
                { name: 'Transporte', amount: '320k', percent: 12, color: 'bg-yellow-500' },
            ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">{item.name}</span>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#111418] dark:text-white">${item.amount}</span>
                        <span className="text-xs text-gray-400 w-8 text-right">{item.percent}%</span>
                    </div>
                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Statistics;
