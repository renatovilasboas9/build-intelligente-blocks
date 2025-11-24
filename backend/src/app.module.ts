import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoanModule } from './loan/loan.module';
import { IntelligenceModule } from './intelligence/intelligence.module';
import { EventsModule } from './events/events.module';

@Module({
    imports: [
        AuthModule,
        LoanModule,
        IntelligenceModule,
        EventsModule
    ]
})
export class AppModule { }
