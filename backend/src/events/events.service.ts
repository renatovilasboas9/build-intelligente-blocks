import { Injectable } from '@nestjs/common';

export interface Event {
    id: string;
    userId: string;
    type: string;
    timestamp: Date;
    metadata: any;
    journeyName?: string;
    abVariant?: string;
}

@Injectable()
export class EventsService {
    private events: Event[] = [];
    private eventIdCounter = 1;

    captureEvent(
        userId: string,
        type: string,
        metadata: any = {},
        journeyName?: string,
        abVariant?: string
    ): Event {
        const event: Event = {
            id: `evt_${this.eventIdCounter++}`,
            userId,
            type,
            timestamp: new Date(),
            metadata,
            journeyName,
            abVariant
        };

        this.events.push(event);
        console.log(`📊 Evento capturado: ${type} - User: ${userId}`);

        return event;
    }

    getEventsByUser(userId: string): Event[] {
        return this.events.filter(e => e.userId === userId);
    }

    getAllEvents(): Event[] {
        return this.events;
    }

    getEventsByType(type: string): Event[] {
        return this.events.filter(e => e.type === type);
    }

    getFrictionEvents(): Event[] {
        const frictionTypes = [
            'login_failed',
            'password_incorrect',
            'device_verification_required',
            'loan_simulation_latency_high',
            'loan_contract_rejected',
            'friction_dropoff'
        ];

        return this.events.filter(e => frictionTypes.includes(e.type));
    }

    getABTestEvents(): Event[] {
        return this.events.filter(e =>
            e.type.startsWith('ab_') || e.abVariant
        );
    }

    clearEvents(): void {
        this.events = [];
        this.eventIdCounter = 1;
        console.log('🗑️  Eventos limpos');
    }
}
