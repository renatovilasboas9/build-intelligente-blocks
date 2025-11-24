import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJourney } from '../contexts/JourneyContext';
import { api } from '../lib/api';
import { eventBus } from '../lib/eventBus';

export default function LoanConfirmationPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { activeJourney } = useJourney();

    const { simulation } = location.state || {};

    const handleConfirm = async () => {
        if (!user || !simulation) return;

        setLoading(true);

        try {
            eventBus.emit('loan:contract:start', { simulationId: simulation.id });

            const response = await api.contractLoan(user.cpf, simulation.id, activeJourney || undefined);

            setResult(response);

            if (response.status === 'APPROVED') {
                eventBus.emit('loan:contract:approved', { contract: response });
                eventBus.emit('ab:conversion', {
                    variant: activeJourney?.includes('personalized') ? 'B' : 'A',
                    revenue: simulation.totalAmount
                });
            } else {
                eventBus.emit('loan:contract:rejected', { reason: response.reason });
                eventBus.emit('friction:detected', {
                    type: 'contract_rejected',
                    metadata: { reason: response.reason, potentialRevenue: simulation.totalAmount }
                });
            }
        } catch (err: any) {
            setResult({ success: false, message: err.message });
            eventBus.emit('friction:detected', { type: 'contract_error', metadata: { error: err.message } });
        } finally {
            setLoading(false);
        }
    };

    if (!simulation) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <p className="text-gray-600 mb-4">Nenhuma simulação encontrada</p>
                    <button
                        onClick={() => navigate('/loan/simulation')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Fazer Simulação
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <button
                    onClick={() => navigate('/loan/simulation')}
                    className="mb-6 text-white hover:underline"
                >
                    ← Voltar
                </button>

                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Confirmação de Contrato
                    </h1>

                    {!result ? (
                        <>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                <h3 className="font-bold text-blue-900 mb-4">Resumo do Empréstimo</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Valor:</span>
                                        <span className="font-semibold">
                                            R$ {simulation.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Parcelas:</span>
                                        <span className="font-semibold">
                                            {simulation.installments}x de R$ {simulation.installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Total:</span>
                                        <span className="font-semibold text-lg">
                                            R$ {simulation.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processando...' : 'Confirmar Contratação'}
                            </button>
                        </>
                    ) : (
                        <div className={`p-6 rounded-lg ${result.status === 'APPROVED' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <div className="text-center">
                                <div className="text-6xl mb-4">
                                    {result.status === 'APPROVED' ? '✅' : '❌'}
                                </div>
                                <h2 className={`text-2xl font-bold mb-2 ${result.status === 'APPROVED' ? 'text-green-900' : 'text-red-900'}`}>
                                    {result.status === 'APPROVED' ? 'Contrato Aprovado!' : 'Contrato Não Aprovado'}
                                </h2>
                                <p className={`mb-6 ${result.status === 'APPROVED' ? 'text-green-700' : 'text-red-700'}`}>
                                    {result.status === 'APPROVED'
                                        ? 'Seu empréstimo foi aprovado com sucesso!'
                                        : result.message || 'Não foi possível aprovar seu contrato no momento.'}
                                </p>

                                {result.status === 'APPROVED' && (
                                    <div className="bg-white rounded-lg p-4 mb-6">
                                        <p className="text-sm text-gray-600 mb-1">Número do Contrato</p>
                                        <p className="font-mono font-bold text-lg text-gray-800">{result.contractId}</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => navigate('/home')}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Voltar ao Início
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
