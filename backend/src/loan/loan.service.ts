import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { findUserByCpf, getUserDefaultJourney } from '../../../configs/demoUsers';
import { getJourneyConfig } from '../../../configs/demoJourneys';

@Injectable()
export class LoanService {
    private simulations: Map<string, any> = new Map();
    private simulationIdCounter = 1;

    constructor(private readonly eventsService: EventsService) { }

    async simulate(cpf: string, amount: number, installments: number, journeyName?: string) {
        const user = findUserByCpf(cpf);

        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }

        const activeJourney = journeyName || getUserDefaultJourney(cpf);
        const journeyConfig = getJourneyConfig(activeJourney);

        if (!journeyConfig) {
            throw new HttpException('Jornada não configurada', HttpStatus.BAD_REQUEST);
        }

        const startTime = Date.now();

        this.eventsService.captureEvent(
            user.id,
            'loan_simulation_start',
            { cpf, amount, installments },
            activeJourney,
            journeyConfig.abTest.variant
        );

        // Aplicar delay configurado
        if (journeyConfig.simulation.delayMs) {
            await this.delay(journeyConfig.simulation.delayMs);
        }

        const endTime = Date.now();
        const duration = endTime - startTime;

        // Emitir evento de fricção se latência alta
        if (
            journeyConfig.simulation.emitFrictionEventIfDelayAboveMs &&
            duration > journeyConfig.simulation.emitFrictionEventIfDelayAboveMs
        ) {
            this.eventsService.captureEvent(
                user.id,
                'loan_simulation_latency_high',
                { cpf, duration, threshold: journeyConfig.simulation.emitFrictionEventIfDelayAboveMs },
                activeJourney,
                journeyConfig.abTest.variant
            );
        }

        // Forçar erro se configurado
        if (journeyConfig.simulation.forceError) {
            this.eventsService.captureEvent(
                user.id,
                'loan_simulation_error',
                { cpf, reason: 'forced_error' },
                activeJourney,
                journeyConfig.abTest.variant
            );

            throw new HttpException('Erro na simulação', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Calcular simulação
        const interestRate = 0.0299; // 2.99% ao mês
        const installmentValue = this.calculateInstallment(amount, interestRate, installments);
        const totalAmount = installmentValue * installments;

        const simulationId = `sim_${this.simulationIdCounter++}`;
        const simulation = {
            id: simulationId,
            cpf,
            amount,
            installments,
            installmentValue,
            totalAmount,
            interestRate,
            createdAt: new Date()
        };

        this.simulations.set(simulationId, simulation);

        this.eventsService.captureEvent(
            user.id,
            'loan_simulation_complete',
            { ...simulation, duration },
            activeJourney,
            journeyConfig.abTest.variant
        );

        return {
            success: true,
            simulation
        };
    }

    async contract(cpf: string, simulationId: string, journeyName?: string) {
        const user = findUserByCpf(cpf);

        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }

        const simulation = this.simulations.get(simulationId);

        if (!simulation) {
            throw new HttpException('Simulação não encontrada', HttpStatus.NOT_FOUND);
        }

        const activeJourney = journeyName || getUserDefaultJourney(cpf);
        const journeyConfig = getJourneyConfig(activeJourney);

        if (!journeyConfig) {
            throw new HttpException('Jornada não configurada', HttpStatus.BAD_REQUEST);
        }

        this.eventsService.captureEvent(
            user.id,
            'loan_contract_start',
            { cpf, simulationId },
            activeJourney,
            journeyConfig.abTest.variant
        );

        // Aplicar comportamento configurado: aprovar ou rejeitar
        if (journeyConfig.contract.status === 'REJECTED') {
            this.eventsService.captureEvent(
                user.id,
                'loan_contract_rejected',
                {
                    cpf,
                    simulationId,
                    reason: journeyConfig.contract.rejectionReason,
                    potentialRevenue: simulation.totalAmount
                },
                activeJourney,
                journeyConfig.abTest.variant
            );

            return {
                success: false,
                status: 'REJECTED',
                reason: journeyConfig.contract.rejectionReason,
                message: 'Contrato não aprovado pela política de risco'
            };
        }

        // Contrato aprovado
        const contractId = `contract_${Date.now()}`;

        this.eventsService.captureEvent(
            user.id,
            'loan_contract_approved',
            {
                cpf,
                simulationId,
                contractId,
                revenue: simulation.totalAmount
            },
            activeJourney,
            journeyConfig.abTest.variant
        );

        // Registrar conversão para A/B test
        this.eventsService.captureEvent(
            user.id,
            'ab_conversion',
            {
                cpf,
                variant: journeyConfig.abTest.variant,
                revenue: simulation.totalAmount
            },
            activeJourney,
            journeyConfig.abTest.variant
        );

        return {
            success: true,
            status: 'APPROVED',
            contractId,
            simulation
        };
    }

    private calculateInstallment(principal: number, rate: number, periods: number): number {
        const x = Math.pow(1 + rate, periods);
        return (principal * x * rate) / (x - 1);
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
