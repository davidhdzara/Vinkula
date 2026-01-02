import React, { useState } from 'react';

interface RegisterProps {
  onRegister: () => void;
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !acceptedTerms) return;
    
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false);
      onRegister();
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8f9fa] dark:bg-[#101922] text-[#111418] dark:text-gray-100 font-display transition-colors items-center justify-center p-6">
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-20 w-20 bg-[#137fec] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
            <span className="material-symbols-outlined text-[40px] text-white">account_balance_wallet</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Crear Cuenta</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">Únete para gestionar tus finanzas con seguridad.</p>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-sm">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            {/* Usuario */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 ml-1">Usuario</label>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[20px]">person</span>
                    <input 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Elige un nombre de usuario"
                        className="w-full rounded-xl bg-white dark:bg-[#1c2630] border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                        required
                    />
                </div>
            </div>

            {/* Correo */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 ml-1">Correo Electrónico</label>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[20px]">mail</span>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        className="w-full rounded-xl bg-white dark:bg-[#1c2630] border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                        required
                    />
                </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 ml-1">Contraseña</label>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[20px]">lock</span>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Crea tu contraseña"
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
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 ml-1">Confirmar Contraseña</label>
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-gray-400 text-[20px]">lock_reset</span>
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repite tu contraseña"
                        className="w-full rounded-xl bg-white dark:bg-[#1c2630] border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-12 text-sm outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex items-center"
                    >
                        <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                </div>
            </div>

            {/* Checkbox Terms */}
            <div className="flex items-start gap-2 mt-2">
                <div className="relative flex items-center">
                    <input 
                        type="checkbox" 
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1c2630] transition-all checked:border-[#137fec] checked:bg-[#137fec]"
                    />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </span>
                </div>
                <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none leading-snug">
                    He leído y acepto los <span className="text-[#137fec] font-semibold hover:underline">Términos y Condiciones</span> y la <span className="text-[#137fec] font-semibold hover:underline">Política de Privacidad</span>.
                </label>
            </div>

            <button 
                type="submit" 
                disabled={isLoading || !acceptedTerms}
                className="w-full bg-[#137fec] hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <span>Registrarse</span>
                )}
            </button>
        </form>

        <div className="mt-8 text-center">
             <p className="text-sm text-gray-500 dark:text-gray-400">
                ¿Ya tienes una cuenta? <button onClick={onLogin} className="font-bold text-[#137fec] hover:underline">Inicia Sesión</button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
