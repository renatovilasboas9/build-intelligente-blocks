import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { findUserByCpf, getUserDefaultJourney } from '../../../configs/demoUsers';
import { getJourneyConfig } from '../../../configs/demoJourneys';

@Injectable()
export class AuthService {
    private loginAttempts: Map<string, number> = new Map();

    constructor(private readonly eventsService: EventsService) { }

    async login(cpf: string, password: string, journeyName?: string) {
        const user = findUserByCpf(cpf);

        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }

        // Determinar jornada ativa
        const activeJourney = journeyName || getUserDefaultJourney(cpf);
        const journeyConfig = getJourneyConfig(activeJourney);

        if (!journeyConfig) {
            throw new HttpException('Jornada não configurada', HttpStatus.BAD_REQUEST);
        }

        // Verificar se é primeira tentativa
        const attempts = this.loginAttempts.get(cpf) || 0;

        // Aplicar comportamento configurado: falhar primeira tentativa
        if (journeyConfig.login.failFirstAttempt && attempts === 0) {
            this.loginAttempts.set(cpf, attempts + 1);

            this.eventsService.captureEvent(
                user.id,
                'login_failed',
                { cpf, reason: 'password_incorrect', attempt: 1 },
                activeJourney
            );

            throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
        }

        // Login bem-sucedido
        this.loginAttempts.set(cpf, 0);

        this.eventsService.captureEvent(
            user.id,
            'login_success',
            { cpf, attempt: attempts + 1 },
            activeJourney
        );

        // Verificar se requer verificação de dispositivo
        if (journeyConfig.login.requireDeviceVerification) {
            this.eventsService.captureEvent(
                user.id,
                'device_verification_required',
                { cpf },
                activeJourney
            );

            return {
                success: true,
                requiresDeviceVerification: true,
                user: {
                    id: user.id,
                    name: user.name,
                    cpf: user.cpf,
                    profile: user.profile
                },
                journeyName: activeJourney
            };
        }

        return {
            success: true,
            requiresDeviceVerification: false,
            user: {
                id: user.id,
                name: user.name,
                cpf: user.cpf,
                profile: user.profile
            },
            journeyName: activeJourney,
            token: `token_${user.id}_${Date.now()}`
        };
    }

    async verifyDevice(cpf: string, code: string, journeyName?: string) {
        const user = findUserByCpf(cpf);

        if (!user) {
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
        }

        const activeJourney = journeyName || getUserDefaultJourney(cpf);

        // Simular verificação (qualquer código funciona)
        this.eventsService.captureEvent(
            user.id,
            'device_verification_success',
            { cpf, code },
            activeJourney
        );

        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                cpf: user.cpf,
                profile: user.profile
            },
            journeyName: activeJourney,
            token: `token_${user.id}_${Date.now()}`
        };
    }
}
