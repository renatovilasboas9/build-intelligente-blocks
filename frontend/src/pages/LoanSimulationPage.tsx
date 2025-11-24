import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJourney } from '../contexts/JourneyContext';
import { api } from '../lib/api';
import { eventBus } from '../lib/eventBus';

export default function LoanSimulationPage() {
    const [amount, setAmount] = useState(10000);
    const [installments, setInstallments] = useState(12);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [simulation, setSimulation] = useState<any>(null);

    const navigate = useNavigate();
    const { user } = useAuth();
    const { activeJourney } = useJourney();

    const handleSimulate = async () => {
        if (!user) return;

        setError('');
        setLoading(true);
        const startTime = Date.now();

        try {
            eventBus.emit('loan:simulation:start', { cpf: user.cpf, amount, installments });

            const result = await api.simulateLoan(user.cpf, amount, installments, activeJourney || undefined);

            const duration = Date.now() - startTime;

            if (duration > 2000) {
                eventBus.emit('friction:detected', {
                    type: 'simulation_latency',
                    metadata: { duration, threshold: 2000 }
                });
            }

            setSimulation(result.simulation);
            eventBus.emit('loan:simulation:complete', { simulation: result.simulation });
        } catch (err: any) {
            setError(err.message);
            eventBus.emit('loan:simulation:error', { error: err.message });
            eventBus.emit('friction:detected', { type: 'simulation_error', metadata: { error: err.message } });
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        navigate('/loan/confirmation', { state: { simulation } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <button
                    onClick={() => navigate('/home')}
                    className="mb-6 text-white hover:underline"
                >
                    ← Voltar
                </button>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Simulação de Empréstimo
                    </h1>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Valor Desejado: R$ {amount.toLocaleString('pt-BR')}
                            </label>
                            <input
                                type="range"
                                min="1000"
                                max="50000"
                                step="1000"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>R$ 1.000</span>
                                <span>R$ 50.000</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Parcelas: {installments}x
                            </label>
                            <input
                                type="range"
                                min="6"
                                max="48"
                                step="6"
                                value={installments}
                                onChange={(e) => setInstallments(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>6x</span>
                                <span>48x</span>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {simulation && (
                            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                                <h3 className="font-bold text-green-900 mb-4">Resultado da Simulação</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Valor do empréstimo:</span>
                                        <span className="font-semibold">
                                            R$ {simulation.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Parcelas:</span>
                                        <span className="font-semibold">{simulation.installments}x</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Valor da parcela:</span>
                                        <span className="font-semibold text-lg text-green-700">
                                            R$ {simulation.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Total a pagar:</span>
                                        <span className="font-semibold">
                                            R$ {simulation.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Taxa de juros:</span>
                                        <span className="font-semibold">2,99% a.m.</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={handleSimulate}
                                disabled={loading}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Simulando...' : 'Simular'}
                            </button>

                            {simulation && (
                                <button
                                    onClick={handleContinue}
                                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                                >
                                    Continuar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
