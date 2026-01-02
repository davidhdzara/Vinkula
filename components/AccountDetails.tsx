import React from 'react';

interface AccountDetailsProps {
  accountName: string;
  balance: string;
  onBack: () => void;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ accountName, balance, onBack }) => {
  const transactions = [
    {
      dateGroup: 'HOY',
      items: [
        { id: 1, title: 'Éxito Supermercado', subtitle: 'Comestibles • 14:30', amount: '- $ 245.000', type: 'expense', icon: 'shopping_cart', iconColor: 'text-orange-600', iconBg: 'bg-orange-100' },
        { id: 2, title: 'Transferencia de Nequi', subtitle: 'Ingreso • 09:15', amount: '+ $ 50.000', type: 'income', icon: 'account_balance_wallet', iconColor: 'text-green-600', iconBg: 'bg-green-100' },
      ]
    },
    {
      dateGroup: 'AYER',
      items: [
        { id: 3, title: 'Netflix Mensual', subtitle: 'Suscripciones', amount: '- $ 16.900', type: 'expense', icon: 'movie', iconColor: 'text-red-600', iconBg: 'bg-red-100' },
        { id: 4, title: 'Estación Terpel', subtitle: 'Transporte', amount: '- $ 80.000', type: 'expense', icon: 'local_gas_station', iconColor: 'text-blue-600', iconBg: 'bg-blue-100' },
      ]
    },
    {
      dateGroup: '25 DE SEPTIEMBRE',
      items: [
        { id: 5, title: 'Pago de Nómina', subtitle: 'Salario', amount: '+ $ 3.500.000', type: 'income', icon: 'payments', iconColor: 'text-purple-600', iconBg: 'bg-purple-100' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[50] flex flex-col bg-[#f8f9fa] dark:bg-[#101922] animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#f8f9fa] dark:bg-[#101922] sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-900 dark:text-white font-bold">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">{accountName}</h2>
            <span className="text-[10px] text-gray-500 font-medium">Bancolombia • 1234</span>
        </div>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-gray-900 dark:text-white font-bold">more_horiz</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {/* Hero Section */}
        <div className="flex flex-col items-center pt-2 pb-6">
            <div className="relative mb-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-[#1c2630] shadow-sm border border-gray-100 dark:border-gray-800">
                    {/* Bank Logo Simulation */}
                     <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
                        <div className="h-5 w-0.5 bg-black rotate-45"></div>
                        <div className="h-5 w-0.5 bg-black -rotate-45 absolute"></div>
                     </div>
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-[#f8f9fa] dark:border-[#101922] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
                </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{balance}</h1>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Saldo Disponible</span>

            {/* Quick Actions */}
            <div className="flex items-center gap-8 mt-8">
                <button className="flex flex-col items-center gap-2 group">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#137fec] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">add</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Ingreso</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#137fec] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[24px] rotate-[-45deg]">send</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Transferir</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#137fec] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">search</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Buscar</span>
                </button>
            </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-4 py-2 sticky top-[60px] z-10 bg-[#f8f9fa] dark:bg-[#101922] pb-4">
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-white dark:bg-[#1c2630] border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 shadow-sm font-medium"
                    />
                </div>
                <button className="h-10 px-4 rounded-xl bg-white dark:bg-[#1c2630] text-gray-700 dark:text-gray-200 text-xs font-bold shadow-sm flex items-center gap-1 whitespace-nowrap">
                    Septiembre <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                <button className="h-10 w-10 rounded-xl bg-white dark:bg-[#1c2630] text-gray-700 dark:text-gray-200 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>
            </div>
        </div>

        {/* Transactions List */}
        <div className="flex flex-col gap-6 px-4">
            {transactions.map((group, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">{group.dateGroup}</h3>
                    <div className="bg-white dark:bg-[#1c2630] rounded-2xl shadow-sm border border-transparent dark:border-gray-800 overflow-hidden">
                        {group.items.map((item, itemIdx) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-b-0 border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</span>
                                        <span className="text-xs text-gray-400 font-medium">{item.subtitle}</span>
                                    </div>
                                </div>
                                <span className={`text-sm font-bold ${item.type === 'income' ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                                    {item.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        
        {/* Footer Link */}
        <div className="py-6 text-center">
            <button className="text-sm font-bold text-[#137fec] hover:underline">Ver más transacciones</button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-[#7c4dff] to-[#137fec] text-white shadow-lg shadow-purple-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20">
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>
    </div>
  );
};

export default AccountDetails;
