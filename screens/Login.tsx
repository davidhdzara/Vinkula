import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    // Simulamos una petición de red
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f9fa] dark:bg-[#101922] text-[#111418] dark:text-gray-100 font-display transition-colors items-center justify-center p-6">
      
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-20 w-20 bg-[#137fec] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
            <span className="material-symbols-outlined text-[40px] text-white">account_balance_wallet</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bienvenido de nuevo</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">Gestiona tus finanzas con seguridad y control.</p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-sm">
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">Usuario</label>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[20px]">person</span>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu usuario"
                        className="w-full rounded-xl bg-white dark:bg-[#1c2630] border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-300 ml-1">Contraseña</label>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[20px]">lock</span>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        className="w-full rounded-xl bg-white dark:bg-[#1c2630] border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-12 text-sm outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex items-center"
                    >
                        <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                </div>
                <div className="flex justify-end">
                    <button 
                        type="button" 
                        onClick={onForgotPassword}
                        className="text-xs font-bold text-[#137fec] hover:text-blue-600 transition-colors"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <span>Iniciar Sesión</span>
                )}
            </button>
        </form>

        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="bg-[#f8f9fa] dark:bg-[#101922] px-4 text-gray-400 font-medium">O ingresa con</span>
            </div>
        </div>

        {/* Biometrics */}
        <div className="flex flex-col items-center gap-6">
            <button className="flex flex-col items-center gap-2 group">
                <div className="h-16 w-16 bg-white dark:bg-[#1c2630] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-[#137fec] group-hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-4xl text-[#137fec]">face</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Reconocimiento Facial</span>
            </button>

            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                <span className="text-sm font-medium">Usar huella dactilar</span>
            </button>
        </div>

        <div className="mt-10 text-center">
             <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿No tienes una cuenta? <button onClick={onRegister} className="font-bold text-[#137fec] hover:underline">Regístrate</button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
