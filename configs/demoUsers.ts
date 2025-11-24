export interface DemoUser {
    id: string;
    name: string;
    cpf: string;
    profile: 'standard' | 'premium';
    journeys: string[];
}

export const demoUsers: DemoUser[] = [
    {
        id: 'carla',
        name: 'Carla',
        cpf: '11111111111',
        profile: 'standard',
        journeys: ['carla_default', 'carla_personalized']
    },
    {
        id: 'jorge',
        name: 'Jorge',
        cpf: '22222222222',
        profile: 'standard',
        journeys: ['jorge_high_latency', 'jorge_password_issue']
    },
    {
        id: 'marcos',
        name: 'Marcos',
        cpf: '33333333333',
        profile: 'standard',
        journeys: ['marcos_rejected']
    },
    {
        id: 'carla_premium',
        name: 'CarlaPersonalizada',
        cpf: '11111111111',
        profile: 'premium',
        journeys: ['carla_personalized']
    }
];

export function findUserByCpf(cpf: string): DemoUser | undefined {
    return demoUsers.find(u => u.cpf === cpf);
}

export function getUserDefaultJourney(cpf: string): string | undefined {
    const user = findUserByCpf(cpf);
    return user?.journeys[0];
}
