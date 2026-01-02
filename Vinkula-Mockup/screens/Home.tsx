import React, { useState } from 'react';
import AddExpense from '../components/AddExpense';
import Transfer from '../components/Transfer';
import AccountDetails from '../components/AccountDetails';

const Home: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<{name: string, balance: string} | null>(null);

  const handleOpenExpense = () => {
    setShowAddModal(false);
    setShowExpenseModal(true);
  };

  const handleOpenTransfer = () => {
    setShowAddModal(false);
    setShowTransferModal(true);
  };

  const handleSaveExpense = (amount: number, category: string, note: string) => {
    // Logic to save transaction would go here
    console.log("Saved:", amount, category, note);
    setShowExpenseModal(false);
  };

  const handleAccountClick = (name: string, balance: string) => {
    setSelectedAccount({ name, balance });
  };

  if (selectedAccount) {
    return (
        <AccountDetails 
            accountName={selectedAccount.name}
            balance={selectedAccount.balance}
            onBack={() => setSelectedAccount(null)}
        />
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 pt-2 pb-6">
      {/* Balance Card */}
      <section>
        <div className="relative flex flex-col justify-between h-48 rounded-[2rem] p-6 bg-[#137fec] shadow-xl shadow-blue-500/30 text-white overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium opacity-90">Balance Total</span>
              <span className="material-symbols-outlined text-[18px] opacity-90 cursor-pointer">visibility</span>
            </div>
            <div className="rounded-lg bg-white/20 backdrop-blur-sm px-2.5 py-1 text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+3.1%</span>
            </div>
          </div>

          <div className="mt-2 z-10">
            <h1 className="text-4xl font-bold tracking-tight">$ 16.000.000</h1>
          </div>

          <div className="mt-auto z-10">
             <span className="inline-block rounded-lg bg-[#0b5cbe]/40 px-3 py-1.5 text-[10px] font-medium backdrop-blur-sm tracking-wide">
                COP - Peso Colombiano
             </span>
          </div>

          {/* Subtle decoration */}
          <div className="absolute -right-6 -bottom-16 size-48 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        </div>
      </section>

      {/* Action Buttons */}
      <section>
        <div className="flex justify-between gap-2">
          {[
            { icon: 'add', label: 'Añadir', action: () => setShowAddModal(true) },
            { icon: 'swap_horiz', label: 'Transferir', action: () => setShowTransferModal(true) },
            { icon: 'bar_chart', label: 'Análisis' },
            { icon: 'savings', label: 'Metas' }
          ].map((action, idx) => (
            <button 
                key={idx} 
                onClick={action.action}
                className="flex flex-col items-center gap-2 w-1/4 group"
            >
              <div className="flex size-16 items-center justify-center rounded-[1.25rem] bg-white dark:bg-[#1c2630] shadow-sm border border-gray-100 dark:border-gray-800 group-active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[#137fec] text-[28px] font-bold">{action.icon}</span>
              </div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-[#137fec] transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Accounts List */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-bold text-[#111418] dark:text-white">Tus Cuentas</h3>
          <button className="text-sm font-bold text-[#137fec] hover:text-[#137fec]/80 transition-colors">Ver todo</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Dinero en Efectivo */}
          <div 
            onClick={() => handleAccountClick('Dinero en Efectivo', '$ 550.000')}
            className="flex items-center justify-between p-4 rounded-[1.25rem] bg-white dark:bg-[#1c2630] shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <span className="material-symbols-outlined text-[24px]">payments</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#111418] dark:text-white text-sm font-bold group-hover:text-[#137fec] transition-colors">Dinero en Efectivo</p>
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 font-medium">Billetera manual</span>
                    <span className="material-symbols-outlined text-[12px] text-gray-400">edit</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[#111418] dark:text-white text-sm font-bold">$ 550.000</p>
              <p className="text-[10px] text-gray-400 font-medium">Actualizado hoy</p>
            </div>
          </div>

          {/* Cuenta Ahorros */}
          <div 
            onClick={() => handleAccountClick('Cuenta Ahorros', '$ 5.200.000')}
            className="flex items-center justify-between p-4 rounded-[1.25rem] bg-white dark:bg-[#1c2630] shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-600 dark:bg-white/5 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                 <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#111418] dark:text-white text-sm font-bold group-hover:text-[#137fec] transition-colors">Cuenta Ahorros</p>
                <p className="text-xs text-gray-500 font-medium">Bancolombia • ****1234</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[#111418] dark:text-white text-sm font-bold">$ 5.200.000</p>
              <p className="text-[10px] text-gray-400 font-medium">hace 5 min</p>
            </div>
          </div>

          {/* Billetera Digital */}
          <div 
            onClick={() => handleAccountClick('Billetera Digital', '$ 850.000')}
            className="flex items-center justify-between p-4 rounded-[1.25rem] bg-white dark:bg-[#1c2630] shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#394a5a] text-white">
                 <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#111418] dark:text-white text-sm font-bold group-hover:text-[#137fec] transition-colors">Billetera Digital</p>
                <p className="text-xs text-gray-500 font-medium">Nequi • ****9988</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[#111418] dark:text-white text-sm font-bold">$ 850.000</p>
              <p className="text-[10px] text-gray-400 font-medium">hace 1 min</p>
            </div>
          </div>

           {/* Tarjeta Crédito */}
           <div 
             onClick={() => handleAccountClick('Tarjeta Crédito', '-$ 1.200.000')}
             className="flex items-center justify-between p-4 rounded-[1.25rem] bg-white dark:bg-[#1c2630] shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all cursor-pointer group"
           >
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#1c2630] text-white">
                 <span className="material-symbols-outlined text-[24px]">credit_card</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#111418] dark:text-white text-sm font-bold group-hover:text-[#137fec] transition-colors">Tarjeta Crédito</p>
                <p className="text-xs text-gray-500 font-medium">Davivienda • ****4550</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[#ff5252] text-sm font-bold">-$ 1.200.000</p>
              <p className="text-[10px] text-gray-400 font-medium">hace 1 hora</p>
            </div>
          </div>
        </div>

        {/* Conectar Nueva Cuenta */}
        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-[1.25rem] border-2 border-dashed border-gray-300 dark:border-gray-700 bg-transparent py-4 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add</span>
            <span className="text-sm font-bold">Conectar Nueva Cuenta</span>
        </button>
      </section>

      {/* Add Menu Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setShowAddModal(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-sm bg-white dark:bg-[#1c2630] rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-center mb-8 relative">
                    <h3 className="text-lg font-bold text-[#111418] dark:text-white">Añadir Transacción</h3>
                    <button 
                        onClick={() => setShowAddModal(false)}
                        className="absolute right-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Options List */}
                <div className="flex flex-col gap-4">
                    {/* Add Expense */}
                    <button 
                        onClick={handleOpenExpense}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1c2630] border border-transparent hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-100 dark:hover:border-gray-700 transition-all group shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-[#ff5252]">
                                <span className="material-symbols-outlined">trending_down</span>
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-[#111418] dark:text-white text-sm">Añadir Gasto</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Comida, transporte, facturas...</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-400">chevron_right</span>
                    </button>

                    {/* Add Income */}
                    <button className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1c2630] border border-transparent hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-100 dark:hover:border-gray-700 transition-all group shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-[#4caf50]">
                                <span className="material-symbols-outlined">trending_up</span>
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-[#111418] dark:text-white text-sm">Añadir Ingreso</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Salario, ventas, regalos...</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-400">chevron_right</span>
                    </button>

                    {/* Transfer */}
                    <button 
                        onClick={handleOpenTransfer}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1c2630] border border-transparent hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-100 dark:hover:border-gray-700 transition-all group shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#137fec]">
                                <span className="material-symbols-outlined">swap_horiz</span>
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-[#111418] dark:text-white text-sm">Transferir Efectivo</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Entre cuentas o bolsillos</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-300 group-hover:text-gray-400">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Expense Full Screen Modal */}
      {showExpenseModal && (
        <AddExpense 
            onClose={() => setShowExpenseModal(false)} 
            onSave={handleSaveExpense}
        />
      )}

      {/* Transfer Full Screen Modal */}
      {showTransferModal && (
        <Transfer 
            onClose={() => setShowTransferModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
