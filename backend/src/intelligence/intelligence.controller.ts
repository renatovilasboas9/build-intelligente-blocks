import { Controller, Get, Query } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';

@Controller('intelligence')
export class IntelligenceController {
    constructor(private readonly intelligenceService: IntelligenceService) { }

    @Get('metrics')
    getMetrics() {
        return this.intelligenceService.getMetrics();
    }

    @Get('recommendations')
    getRecommendations(@Query('cpf') cpf: string) {
        return this.intelligenceService.getRecommendations(cpf);
    }

    @Get('journey/:userId')
    getJourney(@Query('userId') userId: string) {
        return this.intelligenceService.getUserJourney(userId);
    }

    @Get('ab-results')
    getABResults() {
        return this.intelligenceService.getABTestResults();
    }

    @Get('friction-points')
    getFrictionPoints() {
        return this.intelligenceService.getFrictionPoints();
    }
}
