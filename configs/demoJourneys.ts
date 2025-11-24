export interface JourneyConfig {
    login: {
        failFirstAttempt?: boolean;
        requireDeviceVerification?: boolean;
    };
    simulation: {
        delayMs?: number;
        forceError?: boolean;
        emitFrictionEventIfDelayAboveMs?: number;
    };
    contract: {
        status: 'APPROVED' | 'REJECTED';
        rejectionReason?: string;
    };
    abTest: {
        variant: 'A' | 'B';
    };
    personalization?: {
        showPremiumOffer?: boolean;
        reduceSteps?: boolean;
        prefillForm?: boolean;
        highlightCTA?: boolean;
    };
}

export const demoJourneys: Record<string, JourneyConfig> = {
    // Carla - Fluxo padrão sem fricções
    carla_default: {
        login: {
            failFirstAttempt: false,
            requireDeviceVerification: false
        },
        simulation: {
            delayMs: 500,
            forceError: false,
            emitFrictionEventIfDelayAboveMs: 2000
        },
        contract: {
            status: 'APPROVED'
        },
        abTest: {
            variant: 'A'
        }
    },

    // Carla Personalizada - Experiência otimizada
    carla_personalized: {
        login: {
            failFirstAttempt: false,
            requireDeviceVerification: false
        },
        simulation: {
            delayMs: 300,
            forceError: false,
            emitFrictionEventIfDelayAboveMs: 2000
        },
        contract: {
            status: 'APPROVED'
        },
        abTest: {
            variant: 'B'
        },
        personalization: {
            showPremiumOffer: true,
            reduceSteps: true,
            prefillForm: true,
            highlightCTA: true
        }
    },

    // Jorge - Alta latência
    jorge_high_latency: {
        login: {
            failFirstAttempt: false,
            requireDeviceVerification: true
        },
        simulation: {
            delayMs: 3500,
            forceError: false,
            emitFrictionEventIfDelayAboveMs: 2000
        },
        contract: {
            status: 'APPROVED'
        },
        abTest: {
            variant: 'A'
        }
    },

    // Jorge - Problema de senha
    jorge_password_issue: {
        login: {
            failFirstAttempt: true,
            requireDeviceVerification: true
        },
        simulation: {
            delayMs: 500,
            forceError: false,
            emitFrictionEventIfDelayAboveMs: 2000
        },
        contract: {
            status: 'APPROVED'
        },
        abTest: {
            variant: 'A'
        }
    },

    // Marcos - Contrato rejeitado
    marcos_rejected: {
        login: {
            failFirstAttempt: false,
            requireDeviceVerification: false
        },
        simulation: {
            delayMs: 500,
            forceError: false,
            emitFrictionEventIfDelayAboveMs: 2000
        },
        contract: {
            status: 'REJECTED',
            rejectionReason: 'RISK_POLICY'
        },
        abTest: {
            variant: 'A'
        }
    }
};

export function getJourneyConfig(journeyName: string): JourneyConfig | undefined {
    return demoJourneys[journeyName];
}

export function getAllJourneyNames(): string[] {
    return Object.keys(demoJourneys);
}
