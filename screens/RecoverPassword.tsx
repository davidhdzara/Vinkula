import React, { useState } from 'react';

interface RecoverPasswordProps {
  onBack: () => void;
}

const RecoverPassword: React.FC<RecoverPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulación de envío
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-[#f8f9fa] dark:bg-[#101922] text-[#111418] dark:text-gray-100 font-display transition-colors items-center justify-center p-6">
         <div className="flex flex-col items-center max-w-sm text-center animate-fade-in-up">
            <div className="h-20 w-20 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 mb-6">
                <span className="material-symbols-outlined text-[40px] text-white">check_circle</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Correo Enviado!</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
               Hemos enviado las instrucciones para restablecer tu contraseña a <span className="font-semibold text-gray-900 dark:text-white">{email}</span>.
            </p>
            <button 
                onClick={onBack}
                className="w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            >
                Volver al inicio de sesión
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f9fa] dark:bg-[#101922] text-[#111418] dark:text-gray-100 font-display transition-colors items-center justify-center p-6">
      
      {/* Icon Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-20 w-20 bg-[#137fec] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
            <span className="material-symbols-outlined text-[40px] text-white">lock_reset</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Recuperar Contraseña</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs leading-relaxed">
            Ingresa tu correo electrónico o nombre de usuario asociado a la cuenta para recibir instrucciones sobre cómo restablecer tu contraseña.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">Correo electrónico o Usuario</label>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[20px]">mail</span>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full rounded-xl bg-white dark:bg-[#1c2630] border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                        required
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <span>Enviar</span>
                )}
            </button>
        </form>

        <div className="mt-8 flex justify-center">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Volver al inicio de sesión</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
