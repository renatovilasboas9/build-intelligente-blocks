import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados fake para demonstração
const pageviewsData = [
    { page: 'Login', views: 1250 },
    { page: 'Home', views: 980 },
    { page: 'Simulação', views: 750 },
    { page: 'Confirmação', views: 420 }
];

const sessionsData = [
    { day: 'Seg', sessions: 450 },
    { day: 'Ter', sessions: 520 },
    { day: 'Qua', sessions: 480 },
    { day: 'Qui', sessions: 610 },
    { day: 'Sex', sessions: 590 },
    { day: 'Sáb', sessions: 320 },
    { day: 'Dom', sessions: 280 }
];

export default function AnalyticsPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Analytics Tradicional</h1>
                        <p className="text-gray-600">Métricas superficiais de uso</p>
                    </div>
                    <button
                        onClick={() => navigate('/home')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Voltar
                    </button>
                </div>

                {/* Alerta de Limitação */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Limitações do Analytics Tradicional
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>• Mostra APENAS "o quê" aconteceu, não explica "por quê"</p>
                                <p>• Não identifica fricções específicas na jornada</p>
                                <p>• Não calcula impacto financeiro de problemas</p>
                                <p>• Não oferece recomendações acionáveis</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards de Métricas */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm mb-1">Total de Sessões</p>
                        <p className="text-3xl font-bold text-gray-800">3,250</p>
                        <p className="text-green-600 text-sm mt-2">↑ 12% vs mês anterior</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm mb-1">Tempo Médio</p>
                        <p className="text-3xl font-bold text-gray-800">4:32</p>
                        <p className="text-gray-500 text-sm mt-2">minutos por sessão</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm mb-1">Bounce Rate</p>
                        <p className="text-3xl font-bold text-gray-800">42%</p>
                        <p className="text-red-600 text-sm mt-2">↑ 5% vs mês anterior</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm mb-1">Taxa de Conversão</p>
                        <p className="text-3xl font-bold text-gray-800">18%</p>
                        <p className="text-gray-500 text-sm mt-2">simulações → contratos</p>
                    </div>
                </div>

                {/* Gráficos */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Pageviews por Tela</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={pageviewsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="page" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="views" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Sessões por Dia</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={sessionsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sessions" stroke="#8B5CF6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Funil Superficial */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Funil de Conversão</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-700">Login</span>
                                <span className="font-semibold">1,250 (100%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-700">Home</span>
                                <span className="font-semibold">980 (78%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-700">Simulação</span>
                                <span className="font-semibold">750 (60%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-700">Contratação</span>
                                <span className="font-semibold">420 (34%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className="bg-green-600 h-4 rounded-full" style={{ width: '34%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA para Data Product */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Quer entender o "POR QUÊ" por trás desses números?
                    </h2>
                    <p className="text-purple-100 mb-6">
                        O Data Product oferece análise profunda de fricções, impacto financeiro e recomendações acionáveis
                    </p>
                    <button
                        onClick={() => navigate('/intelligence')}
                        className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                    >
                        Ver Data Product Intelligence →
                    </button>
                </div>
            </div>
        </div>
    );
}
