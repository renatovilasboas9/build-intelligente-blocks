import { createContext, useContext, useState, ReactNode } from 'react';
import { eventBus } from '../lib/eventBus';

interface JourneyContextType {
    activeJourney: string | null;
    setActiveJourney: (journey: string) => void;
    eventLog: Array<{ type: string; data: any; timestamp: Date }>;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function JourneyProvider({ children }: { children: ReactNode }) {
    const [activeJourney, setActiveJourneyState] = useState<string | null>(null);
    const [eventLog, setEventLog] = useState<Array<{ type: string; data: any; timestamp: Date }>>([]);

    const setActiveJourney = (journey: string) => {
        setActiveJourneyState(journey);
        eventBus.emit('journey:changed', { journeyName: journey });
    };

    // Capturar todos os eventos para o log
    eventBus.on('*', (type, data) => {
        setEventLog(prev => [...prev, { type: type as string, data, timestamp: new Date() }]);
    });

    return (
        <JourneyContext.Provider
            value={{
                activeJourney,
                setActiveJourney,
                eventLog
            }}
        >
            {children}
        </JourneyContext.Provider>
    );
}

export function useJourney() {
    const context = useContext(JourneyContext);
    if (!context) {
        throw new Error('useJourney must be used within JourneyProvider');
    }
    return context;
}
