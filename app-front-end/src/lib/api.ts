const API_BASE_URL = 'http://localhost:3001';

export const api = {
    async login(cpf: string, password: string, journeyName?: string) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, password, journeyName })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro no login');
        }

        return response.json();
    },

    async verifyDevice(cpf: string, code: string, journeyName?: string) {
        const response = await fetch(`${API_BASE_URL}/auth/verify-device`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, code, journeyName })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro na verificação');
        }

        return response.json();
    },

    async simulateLoan(cpf: string, amount: number, installments: number, journeyName?: string) {
        const response = await fetch(`${API_BASE_URL}/loan/simulate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, amount, installments, journeyName })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro na simulação');
        }

        return response.json();
    },

    async contractLoan(cpf: string, simulationId: string, journeyName?: string) {
        const response = await fetch(`${API_BASE_URL}/loan/contract`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, simulationId, journeyName })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro na contratação');
        }

        return response.json();
    },

    async getMetrics() {
        const response = await fetch(`${API_BASE_URL}/intelligence/metrics`);
        return response.json();
    },

    async getRecommendations(cpf: string) {
        const response = await fetch(`${API_BASE_URL}/intelligence/recommendations?cpf=${cpf}`);
        return response.json();
    },

    async getUserJourney(userId: string) {
        const response = await fetch(`${API_BASE_URL}/intelligence/journey/${userId}`);
        return response.json();
    },

    async getABResults() {
        const response = await fetch(`${API_BASE_URL}/intelligence/ab-results`);
        return response.json();
    }
};
