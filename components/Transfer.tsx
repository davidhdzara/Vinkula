import React, { useState } from 'react';

interface TransferProps {
  onClose: () => void;
}

const Transfer: React.FC<TransferProps> = ({ onClose }) => {
  const [amount, setAmount] = useState('200.000');
  const [note, setNote] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simple format handling for visual demo
    let val = e.target.value.replace(/\D/g, '');
    if (val) {
        val = new Intl.NumberFormat('es-CO').format(parseInt(val));
    }
    setAmount(val);
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#f6f7f8] dark:bg-[#101922] animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-[#1c2630] shadow-sm relative z-20">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-900 dark:text-white font-bold">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Transferencia</h2>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-900 dark:text-white font-bold">more_vert</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        
        {/* Accounts Section */}
        <div className="relative flex flex-col gap-4">
            {/* From Account */}
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 pl-1">Desde</span>
                <div className="bg-white dark:bg-[#1c2630] p-4 rounded-2xl shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black">
                             {/* Bancolombia-like styling */}
                            <div className="h-6 w-1 bg-black rotate-45"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">Bancolombia Ahorros</span>
                            <span className="text-xs text-gray-500 font-medium">Disponible: $ 2.500.000</span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">expand_more</span>
                </div>
            </div>

            {/* Direction Arrow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 mt-3">
                <div className="h-8 w-8 bg-[#137fec] rounded-full flex items-center justify-center border-4 border-[#f6f7f8] dark:border-[#101922] shadow-sm">
                    <span className="material-symbols-outlined text-white text-[16px] font-bold">arrow_downward</span>
                </div>
            </div>

            {/* To Account */}
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 pl-1">Hacia</span>
                <div className="bg-white dark:bg-[#1c2630] p-4 rounded-2xl shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3a0ca3] text-white">
                            <span className="text-xs font-bold">N</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">Nequi - Bolsillo Viaje</span>
                            <span className="text-xs text-gray-500 font-medium">Cuenta propia</span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">expand_more</span>
                </div>
            </div>
        </div>

        {/* Amount Section */}
        <div className="bg-white dark:bg-[#1c2630] rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center gap-2">
            <span className="text-sm font-medium text-gray-500">Monto a transferir</span>
            <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$</span>
                <input 
                    type="text" 
                    value={amount}
                    onChange={handleAmountChange}
                    className="text-4xl font-bold text-[#111418] dark:text-white bg-transparent outline-none w-48 text-center placeholder-gray-300"
                    placeholder="0"
                />
            </div>
            <div className="w-24 h-0.5 bg-gray-100 dark:bg-gray-700 mt-2"></div>
        </div>

        {/* Date Section */}
        <div className="bg-white dark:bg-[#1c2630] p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#137fec]">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Fecha</span>
            </div>
            <div className="flex items-center gap-2 text-[#137fec] cursor-pointer hover:text-blue-600">
                <span className="text-sm font-bold">Hoy</span>
                <span className="material-symbols-outlined text-[16px]">edit</span>
            </div>
        </div>

        {/* Note Section */}
        <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 pl-1">Nota (Opcional)</span>
            <div className="bg-white dark:bg-[#1c2630] p-4 rounded-2xl shadow-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">edit_note</span>
                <input 
                    type="text" 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ej: Ahorro mensual"
                    className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 font-medium"
                />
            </div>
        </div>

      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-[#1c2630] p-6 pb-8 border-t border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-sm text-gray-500">Costo de transacción</span>
            <span className="text-sm font-bold text-green-600">$ 0</span>
        </div>
        <button 
            onClick={onClose}
            className="w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
        >
            Transferir $ {amount || '0'}
        </button>
      </div>
    </div>
  );
};

export default Transfer;
