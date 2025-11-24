import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) { }

    @Post('simulate')
    async simulate(@Body() body: {
        cpf: string;
        amount: number;
        installments: number;
        journeyName?: string;
    }) {
        const { cpf, amount, installments, journeyName } = body;

        if (!cpf || !amount || !installments) {
            throw new HttpException('Dados incompletos', HttpStatus.BAD_REQUEST);
        }

        return this.loanService.simulate(cpf, amount, installments, journeyName);
    }

    @Post('contract')
    async contract(@Body() body: {
        cpf: string;
        simulationId: string;
        journeyName?: string;
    }) {
        const { cpf, simulationId, journeyName } = body;

        if (!cpf || !simulationId) {
            throw new HttpException('Dados incompletos', HttpStatus.BAD_REQUEST);
        }

        return this.loanService.contract(cpf, simulationId, journeyName);
    }
}
