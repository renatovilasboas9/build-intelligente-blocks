import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJourney } from '../contexts/JourneyContext';
import { api } from '../lib/api';
import { eventBus } from '../lib/eventBus';

export default function LoginPage() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { activeJourney } = useJourney();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            eventBus.emit('auth:login:start', { cpf });

            const result = await api.login(cpf, password, activeJourney || undefined);

            if (result.requiresDeviceVerification) {
                eventBus.emit('auth:device:verification:required', { user: result.user });
                navigate('/device-verification', { state: { user: result.user, cpf } });
            } else {
                setAuth(result.user, result.token);
                eventBus.emit('auth:login:success', { user: result.user, token: result.token });
                navigate('/home');
            }
        } catch (err: any) {
            setError(err.message);
            eventBus.emit('auth:login:failed', { error: err.message });
            eventBus.emit('friction:detected', { type: 'login_failed', metadata: { cpf, error: err.message } });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
                    <p className="text-gray-600">Faça login para continuar</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CPF
                        </label>
                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="11111111111"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Demo: Use CPF 11111111111, 22222222222 ou 33333333333</p>
                    <p>Senha: qualquer valor</p>
                </div>
            </div>
        </div>
    );
}
