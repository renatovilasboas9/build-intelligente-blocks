import mitt from 'mitt';

export type Events = {
    'auth:login:start': { cpf: string };
    'auth:login:success': { user: any; token?: string };
    'auth:login:failed': { error: string };
    'auth:device:verification:required': { user: any };
    'auth:device:verification:success': { user: any; token: string };
    'loan:simulation:start': { cpf: string; amount: number; installments: number };
    'loan:simulation:complete': { simulation: any };
    'loan:simulation:error': { error: string };
    'loan:contract:start': { simulationId: string };
    'loan:contract:approved': { contract: any };
    'loan:contract:rejected': { reason: string };
    'friction:detected': { type: string; metadata: any };
    'ab:variant:assigned': { variant: string };
    'ab:conversion': { variant: string; revenue: number };
    'journey:changed': { journeyName: string };
};

export const eventBus = mitt<Events>();

// Log de eventos para debug
if (import.meta.env.DEV) {
    eventBus.on('*', (type, data) => {
        console.log(`🔔 Event: ${type}`, data);
    });
}
