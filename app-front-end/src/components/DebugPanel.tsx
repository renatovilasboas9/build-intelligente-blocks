import { useState } from 'react';
import { useJourney } from '../contexts/JourneyContext';
import { useAuth } from '../contexts/AuthContext';

const DEMO_USERS = [
    { name: 'Carla', cpf: '11111111111', journeys: ['carla_default', 'carla_personalized'] },
    { name: 'Jorge', cpf: '22222222222', journeys: ['jorge_high_latency', 'jorge_password_issue'] },
    { name: 'Marcos', cpf: '33333333333', journeys: ['marcos_rejected'] }
];

export default function DebugPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const { activeJourney, setActiveJourney, eventLog } = useJourney();
    const { user } = useAuth();

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition"
            >
                🔧 Debug Panel
            </button>

            {isOpen && (
                <div className="fixed top-16 right-4 z-50 bg-white rounded-lg shadow-2xl p-6 w-96 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Debug Panel</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Usuário Atual */}
                    <div className="mb-4 p-3 bg-blue-50 rounded">
                        <p className="text-sm font-semibold text-blue-900">Usuário Atual:</p>
                        <p className="text-sm text-blue-700">{user?.name || 'Não autenticado'}</p>
                    </div>

                    {/* Seletor de Jornada */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Jornada Ativa:
                        </label>
                        <select
                            value={activeJourney || ''}
                            onChange={(e) => setActiveJourney(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Selecione uma jornada</option>
                            {DEMO_USERS.flatMap(u =>
                                u.journeys.map(j => (
                                    <option key={j} value={j}>{j}</option>
                                ))
                            )}
                        </select>
                    </div>

                    {/* Usuários de Demo */}
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Usuários de Demo:</p>
                        <div className="space-y-2">
                            {DEMO_USERS.map(u => (
                                <div key={u.cpf} className="p-2 bg-gray-50 rounded text-xs">
                                    <p className="font-semibold">{u.name}</p>
                                    <p className="text-gray-600">CPF: {u.cpf}</p>
                                    <p className="text-gray-500">Jornadas: {u.journeys.length}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Log de Eventos */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                            Eventos Capturados ({eventLog.length}):
                        </p>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {eventLog.slice(-10).reverse().map((event, idx) => (
                                <div key={idx} className="p-2 bg-gray-50 rounded text-xs">
                                    <p className="font-mono text-purple-600">{event.type}</p>
                                    <p className="text-gray-500">
                                        {event.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
