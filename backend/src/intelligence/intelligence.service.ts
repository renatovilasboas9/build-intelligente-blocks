import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { findUserByCpf } from '../../../configs/demoUsers';
import { getJourneyConfig } from '../../../configs/demoJourneys';

@Injectable()
export class IntelligenceService {
    constructor(private readonly eventsService: EventsService) { }

    getMetrics() {
        const allEvents = this.eventsService.getAllEvents();
        const frictionEvents = this.eventsService.getFrictionEvents();

        // Calcular usuários únicos
        const uniqueUsers = new Set(allEvents.map(e => e.userId)).size;

        // Calcular conversões
        const conversions = allEvents.filter(e => e.type === 'loan_contract_approved').length;
        const conversionRate = uniqueUsers > 0 ? (conversions / uniqueUsers) * 100 : 0;

        // Calcular receita
        const revenueEvents = allEvents.filter(e => e.type === 'loan_contract_approved');
        const revenueCapture = revenueEvents.reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);

        // Calcular receita perdida
        const lostRevenueEvents = allEvents.filter(e => e.type === 'loan_contract_rejected');
        const revenueLost = lostRevenueEvents.reduce((sum, e) => sum + (e.metadata.potentialRevenue || 0), 0);

        // Friction points
        const frictionPoints = this.analyzeFrictionPoints(frictionEvents);

        // A/B Test metrics
        const abMetrics = this.calculateABMetrics();

        return {
            totalUsers: uniqueUsers,
            totalEvents: allEvents.length,
            conversions,
            conversionRate: Math.round(conversionRate * 100) / 100,
            revenueCapture: Math.round(revenueCapture * 100) / 100,
            revenueLost: Math.round(revenueLost * 100) / 100,
            totalRevenuePotential: Math.round((revenueCapture + revenueLost) * 100) / 100,
            frictionPoints,
            abTestResults: abMetrics,
            timestamp: new Date()
        };
    }

    getRecommendations(cpf: string) {
        const user = findUserByCpf(cpf);

        if (!user) {
            return {
                success: false,
                message: 'Usuário não encontrado'
            };
        }

        const userEvents = this.eventsService.getEventsByUser(user.id);
        const frictionEvents = userEvents.filter(e =>
            ['login_failed', 'loan_simulation_latency_high', 'loan_contract_rejected'].includes(e.type)
        );

        const recommendations = [];

        // Analisar fricções e gerar recomendações
        if (frictionEvents.some(e => e.type === 'login_failed')) {
            recommendations.push({
                type: 'reduce_auth_friction',
                priority: 'high',
                action: 'Implementar autenticação biométrica',
                impact: 'Redução de 40% em falhas de login',
                estimatedRevenue: 15000
            });
        }

        if (frictionEvents.some(e => e.type === 'loan_simulation_latency_high')) {
            recommendations.push({
                type: 'optimize_performance',
                priority: 'critical',
                action: 'Otimizar API de simulação',
                impact: 'Redução de 60% no tempo de resposta',
                estimatedRevenue: 50000
            });
        }

        if (frictionEvents.some(e => e.type === 'loan_contract_rejected')) {
            recommendations.push({
                type: 'improve_approval_rate',
                priority: 'high',
                action: 'Revisar política de risco',
                impact: 'Aumento de 25% em aprovações',
                estimatedRevenue: 80000
            });
        }

        // Recomendações de personalização baseadas no perfil
        if (user.profile === 'premium' || userEvents.length > 5) {
            recommendations.push({
                type: 'personalization',
                priority: 'medium',
                action: 'Ativar fluxo personalizado',
                impact: 'Aumento de 35% na conversão',
                estimatedRevenue: 45000,
                details: {
                    showPremiumOffer: true,
                    reduceSteps: true,
                    prefillForm: true,
                    highlightCTA: true
                }
            });
        }

        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                profile: user.profile
            },
            frictionCount: frictionEvents.length,
            recommendations,
            timestamp: new Date()
        };
    }

    getUserJourney(userId: string) {
        const events = this.eventsService.getEventsByUser(userId);

        return {
            userId,
            totalEvents: events.length,
            events: events.map(e => ({
                id: e.id,
                type: e.type,
                timestamp: e.timestamp,
                metadata: e.metadata,
                journeyName: e.journeyName,
                abVariant: e.abVariant
            })),
            timeline: this.buildTimeline(events)
        };
    }

    getABTestResults() {
        return this.calculateABMetrics();
    }

    getFrictionPoints() {
        const frictionEvents = this.eventsService.getFrictionEvents();
        return this.analyzeFrictionPoints(frictionEvents);
    }

    private analyzeFrictionPoints(frictionEvents: any[]) {
        const frictionByType = frictionEvents.reduce((acc, event) => {
            const type = event.type;
            if (!acc[type]) {
                acc[type] = {
                    type,
                    count: 0,
                    users: new Set(),
                    totalImpact: 0
                };
            }
            acc[type].count++;
            acc[type].users.add(event.userId);

            // Estimar impacto financeiro
            if (type === 'loan_contract_rejected') {
                acc[type].totalImpact += event.metadata.potentialRevenue || 0;
            } else if (type === 'loan_simulation_latency_high') {
                acc[type].totalImpact += 5000; // Estimativa de perda por latência
            } else {
                acc[type].totalImpact += 2000; // Estimativa genérica
            }

            return acc;
        }, {});

        return Object.values(frictionByType).map((fp: any) => ({
            type: fp.type,
            count: fp.count,
            affectedUsers: fp.users.size,
            estimatedImpact: Math.round(fp.totalImpact * 100) / 100
        }));
    }

    private calculateABMetrics() {
        const abEvents = this.eventsService.getABTestEvents();

        const variantA = abEvents.filter(e => e.abVariant === 'A');
        const variantB = abEvents.filter(e => e.abVariant === 'B');

        const conversionsA = variantA.filter(e => e.type === 'ab_conversion').length;
        const conversionsB = variantB.filter(e => e.type === 'ab_conversion').length;

        const usersA = new Set(variantA.map(e => e.userId)).size;
        const usersB = new Set(variantB.map(e => e.userId)).size;

        const conversionRateA = usersA > 0 ? (conversionsA / usersA) * 100 : 0;
        const conversionRateB = usersB > 0 ? (conversionsB / usersB) * 100 : 0;

        const revenueA = variantA
            .filter(e => e.type === 'ab_conversion')
            .reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);

        const revenueB = variantB
            .filter(e => e.type === 'ab_conversion')
            .reduce((sum, e) => sum + (e.metadata.revenue || 0), 0);

        return {
            variantA: {
                users: usersA,
                conversions: conversionsA,
                conversionRate: Math.round(conversionRateA * 100) / 100,
                revenue: Math.round(revenueA * 100) / 100
            },
            variantB: {
                users: usersB,
                conversions: conversionsB,
                conversionRate: Math.round(conversionRateB * 100) / 100,
                revenue: Math.round(revenueB * 100) / 100
            },
            winner: conversionRateB > conversionRateA ? 'B' : 'A',
            improvement: Math.round(Math.abs(conversionRateB - conversionRateA) * 100) / 100
        };
    }

    private buildTimeline(events: any[]) {
        const timeline = [];
        let currentStep = '';

        for (const event of events) {
            if (event.type.includes('login')) {
                currentStep = 'Login';
            } else if (event.type.includes('simulation')) {
                currentStep = 'Simulação';
            } else if (event.type.includes('contract')) {
                currentStep = 'Contratação';
            }

            timeline.push({
                step: currentStep,
                event: event.type,
                timestamp: event.timestamp,
                success: !event.type.includes('failed') && !event.type.includes('rejected')
            });
        }

        return timeline;
    }
}
