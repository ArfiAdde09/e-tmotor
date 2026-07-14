import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await login(email, password);
        setIsLoading(false);

        if (result.success) {
            const role = result.role === 'admin' ? 'admin' : 'customer';
            navigate(`/${role}/dashboard`);
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
            <div className="bg-dark-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">E-TMotor</h1>
                    <p className="text-gray-400 mt-2">Masuk ke akun Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {isLoading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                        Daftar
                    </Link>
                </p>
            </div>
        </div>
    );
}