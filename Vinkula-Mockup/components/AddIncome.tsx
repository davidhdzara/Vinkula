import React, { useState } from 'react';

interface AddIncomeProps {
    onClose: () => void;
    onSave: (amount: number, category: string, note: string) => void;
}

const AddIncome: React.FC<AddIncomeProps> = ({ onClose, onSave }) => {
    const [amount, setAmount] = useState('0');
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [note, setNote] = useState('');

    const categories = [
        { id: 1, name: 'Salario', icon: 'payments', color: 'bg-green-100', text: 'text-green-600', activeBg: 'bg-[#4caf50]' },
        { id: 2, name: 'Negocios', icon: 'store', color: 'bg-blue-100', text: 'text-blue-600', activeBg: 'bg-white' },
        { id: 3, name: 'Regalos', icon: 'card_giftcard', color: 'bg-pink-100', text: 'text-pink-600', activeBg: 'bg-white' },
        { id: 4, name: 'Préstamos', icon: 'credit_card', color: 'bg-indigo-100', text: 'text-indigo-600', activeBg: 'bg-white' },
        { id: 5, name: 'Otros', icon: 'more_horiz', color: 'bg-gray-100', text: 'text-gray-600', activeBg: 'bg-white' },
    ];

    const handleKeyPress = (val: string) => {
        if (val === 'backspace') {
            setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        } else {
            setAmount(prev => {
                if (prev === '0' && val !== ',') return val;
                if (val === ',' && prev.includes(',')) return prev;
                return prev + val;
            });
        }
    };

    const formatCurrency = (val: string) => {
        // Simple formatter for display
        const numberVal = parseInt(val.replace(/,/g, ''));
        if (isNaN(numberVal)) return '0';
        return new Intl.NumberFormat('es-CO').format(numberVal);
    };

    const handleSave = () => {
        const numericAmount = parseFloat(amount.replace(/,/g, '.')); // Handle comma as decimal if needed or just strip format
        const categoryName = categories.find(c => c.id === selectedCategory)?.name || 'Varios';
        onSave(numericAmount, categoryName, note);
    };

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#f6f7f8] dark:bg-[#101922] animate-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#f6f7f8] dark:bg-[#101922]">
                <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-gray-900 dark:text-white">close</span>
                </button>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Nuevo Ingreso</h2>
                <div className="w-10"></div> {/* Spacer for centering */}
            </div>

            {/* Amount Display */}
            <div className="flex flex-col items-center justify-center py-6">
                <span className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1">Monto</span>
                <div className="flex items-center gap-1">
                    <span className="text-3xl text-gray-400 font-bold">$</span>
                    <span className="text-5xl font-bold text-[#111418] dark:text-white tracking-tight">
                        {formatCurrency(amount)}
                    </span>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 px-6 flex flex-col gap-6 overflow-y-auto no-scrollbar">

                {/* Categories */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoría</span>
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all whitespace-nowrap shadow-sm border ${isActive
                                            ? 'bg-[#4caf50] border-[#4caf50] text-white'
                                            : 'bg-white dark:bg-[#1c2630] border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-700 dark:text-gray-200'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                                    <span className="text-sm font-bold">{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selectors Row */}
                <div className="flex gap-4">
                    <div className="flex-1 bg-white dark:bg-[#1c2630] p-3 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                                <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] text-gray-400 font-bold">Cuenta</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Nequi</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">expand_more</span>
                    </div>

                    <div className="flex-1 bg-white dark:bg-[#1c2630] p-3 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] text-gray-400 font-bold">Fecha</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Hoy</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">expand_more</span>
                    </div>
                </div>

                {/* Note Input */}
                <div className="bg-white dark:bg-[#1c2630] p-4 rounded-2xl shadow-sm flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">edit_note</span>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="¿De qué es el ingreso? (Opcional)"
                        className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 font-medium"
                    />
                </div>
            </div>

            {/* Keypad Section */}
            <div className="bg-white dark:bg-[#1c2630] rounded-t-[2rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-6 pb-8 z-10">
                <div className="grid grid-cols-3 gap-y-6 gap-x-12 mb-6 px-4">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeyPress(num)}
                            className="text-2xl font-medium text-gray-900 dark:text-white hover:text-[#4caf50] transition-colors active:scale-90"
                        >
                            {num}
                        </button>
                    ))}
                    <button onClick={() => handleKeyPress(',')} className="text-2xl font-medium text-gray-900 dark:text-white hover:text-[#4caf50] transition-colors pb-2">,</button>
                    <button onClick={() => handleKeyPress('0')} className="text-2xl font-medium text-gray-900 dark:text-white hover:text-[#4caf50] transition-colors">0</button>
                    <button onClick={() => handleKeyPress('backspace')} className="flex items-center justify-center text-gray-900 dark:text-white hover:text-red-500 transition-colors active:scale-90">
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>backspace</span>
                    </button>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-[#4caf50] hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <span>Guardar Ingreso</span>
                    <span className="material-symbols-outlined text-[20px]">check</span>
                </button>
            </div>
        </div>
    );
};

export default AddIncome;
