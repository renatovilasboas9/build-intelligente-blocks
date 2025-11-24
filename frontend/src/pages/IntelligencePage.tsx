import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function IntelligencePage() {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadMetrics();
    }, []);

    const loadMetrics = async () => {
        try {
            const data = await api.getMetrics();
            setMetrics(data);
        } catch (error) {
            console.error('Erro ao carregar métricas:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Carregando inteligência...</div>
            </div>
        );
    }

    const frictionChartData = metrics?.frictionPoints?.map((fp: any) => ({
        name: fp.type.replace(/_/g, ' '),
        count: fp.count,
        impact: fp.estimatedImpact
    })) || [];

    const abComparisonData = [
        {
            name: 'Variante A',
            conversions: metrics?.abTestResults?.variantA?.conversions || 0,
            revenue: metrics?.abTestResults?.variantA?.revenue || 0
        },
        {
            name: 'Variante B',
            conversions: metrics?.abTestResults?.variantB?.conversions || 0,
            revenue: metrics?.abTestResults?.variantB?.revenue || 0
        }
    ];

    const revenueData = [
        { name: 'Capturada', value: metrics?.revenueCapture || 0 },
        { name: 'Perdida', value: metrics?.revenueLost || 0 }
    ];

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            🧠 Data Product Intelligence
                        </h1>
                        <p className="text-gray-400">Análise profunda de jornadas e fricções</p>
                    </div>
                    <button
                        onClick={() => navigate('/home')}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                        Voltar
                    </button>
                </div>

                {/* Destaque de Valor */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-xl p-6 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        💡 Diferencial do Data Product
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4 text-white">
                        <div>
                            <p className="text-purple-200 text-sm">✓ Identifica fricções específicas</p>
                        </div>
                        <div>
                            <p className="text-purple-200 text-sm">✓ Calcula impacto financeiro real</p>
                        </div>
                        <div>
                            <p className="text-purple-200 text-sm">✓ Oferece recomendações acionáveis</p>
                        </div>
                    </div>
                </div>

                {/* KPIs Principais */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Usuários Analisados</p>
                        <p className="text-4xl font-bold text-white">{metrics?.totalUsers || 0}</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Taxa de Conversão</p>
                        <p className="text-4xl font-bold text-green-400">{metrics?.conversionRate || 0}%</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Receita Capturada</p>
                        <p className="text-3xl font-bold text-green-400">
                            R$ {(metrics?.revenueCapture || 0).toLocaleString('pt-BR')}
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Receita Perdida</p>
                        <p className="text-3xl font-bold text-red-400">
                            R$ {(metrics?.revenueLost || 0).toLocaleString('pt-BR')}
                        </p>
                    </div>
                </div>

                {/* Friction Points */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4">🔥 Friction Points Identificados</h3>
                    {frictionChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={frictionChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                                    labelStyle={{ color: '#F3F4F6' }}
                                />
                                <Legend />
                                <Bar dataKey="count" fill="#EF4444" name="Ocorrências" />
                                <Bar dataKey="impact" fill="#F59E0B" name="Impacto (R$)" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-400 text-center py-8">Nenhuma fricção detectada ainda</p>
                    )}
                </div>

                {/* A/B Test Results */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <h3 className="text-2xl font-bold text-white mb-4">🧪 Resultados do Teste A/B</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={abComparisonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                                    labelStyle={{ color: '#F3F4F6' }}
                                />
                                <Legend />
                                <Bar dataKey="conversions" fill="#3B82F6" name="Conversões" />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-4 bg-gray-700 rounded">
                            <p className="text-white font-semibold">
                                Vencedor: Variante {metrics?.abTestResults?.winner || 'N/A'}
                            </p>
                            <p className="text-gray-300 text-sm">
                                Melhoria: {metrics?.abTestResults?.improvement || 0}% na conversão
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                        <h3 className="text-2xl font-bold text-white mb-4">💰 Distribuição de Receita</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={revenueData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: R$ ${value.toLocaleString('pt-BR')}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {revenueData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-4 bg-gray-700 rounded">
                            <p className="text-white font-semibold">
                                Potencial Total: R$ {(metrics?.totalRevenuePotential || 0).toLocaleString('pt-BR')}
                            </p>
                            <p className="text-gray-300 text-sm">
                                Eficiência de Captura: {metrics?.revenueCapture && metrics?.totalRevenuePotential
                                    ? Math.round((metrics.revenueCapture / metrics.totalRevenuePotential) * 100)
                                    : 0}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recomendações */}
                <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">💡 Recomendações Acionáveis</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white font-semibold mb-2">🚀 Otimizar Performance</p>
                            <p className="text-green-100 text-sm">
                                Reduzir latência da API de simulação pode aumentar conversão em 15%
                            </p>
                            <p className="text-white font-bold mt-2">Impacto: +R$ 50.000/mês</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white font-semibold mb-2">🎯 Personalização</p>
                            <p className="text-green-100 text-sm">
                                Implementar fluxo personalizado para usuários premium
                            </p>
                            <p className="text-white font-bold mt-2">Impacto: +R$ 45.000/mês</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white font-semibold mb-2">🔐 Melhorar Autenticação</p>
                            <p className="text-green-100 text-sm">
                                Adicionar biometria reduz fricção de login em 40%
                            </p>
                            <p className="text-white font-bold mt-2">Impacto: +R$ 15.000/mês</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white font-semibold mb-2">📊 Revisar Política de Risco</p>
                            <p className="text-green-100 text-sm">
                                Ajustar critérios pode aumentar aprovações em 25%
                            </p>
                            <p className="text-white font-bold mt-2">Impacto: +R$ 80.000/mês</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
