import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJourney } from '../contexts/JourneyContext';
import { api } from '../lib/api';
import { eventBus } from '../lib/eventBus';

export default function DeviceVerificationPage() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();
    const { activeJourney } = useJourney();

    const { user, cpf } = location.state || {};

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await api.verifyDevice(cpf, code, activeJourney || undefined);

            setAuth(result.user, result.token);
            eventBus.emit('auth:device:verification:success', { user: result.user, token: result.token });
            navigate('/home');
        } catch (err: any) {
            setError(err.message);
            eventBus.emit('friction:detected', { type: 'device_verification_failed', metadata: { cpf, error: err.message } });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🔐</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Verificação de Dispositivo</h1>
                    <p className="text-gray-600">
                        Enviamos um código para o seu dispositivo cadastrado
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Código de Verificação
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="123456"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
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
                        {loading ? 'Verificando...' : 'Verificar'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Demo: Use qualquer código (ex: 123456)</p>
                </div>
            </div>
        </div>
    );
}
