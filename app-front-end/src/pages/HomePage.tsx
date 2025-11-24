import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Olá, {user?.name}! 👋
                            </h1>
                            <p className="text-gray-600">Bem-vindo ao seu painel</p>
                        </div>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Menu Principal */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <button
                        onClick={() => navigate('/loan/simulation')}
                        className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                        <div className="text-6xl mb-4">💰</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Simular Empréstimo
                        </h2>
                        <p className="text-gray-600">
                            Simule seu empréstimo e veja as melhores condições
                        </p>
                    </button>

                    <button
                        onClick={() => navigate('/analytics')}
                        className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                        <div className="text-6xl mb-4">📊</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Analytics Tradicional
                        </h2>
                        <p className="text-gray-600">
                            Visualize métricas básicas de uso
                        </p>
                    </button>
                </div>

                {/* Data Product */}
                <button
                    onClick={() => navigate('/intelligence')}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                    <div className="text-6xl mb-4">🧠</div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Data Product Intelligence
                    </h2>
                    <p className="text-purple-100 text-lg">
                        Análise profunda de jornadas, fricções e oportunidades
                    </p>
                </button>
            </div>
        </div>
    );
}
