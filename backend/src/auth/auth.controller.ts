import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { cpf: string; password: string; journeyName?: string }) {
        const { cpf, password, journeyName } = body;

        if (!cpf || !password) {
            throw new HttpException('CPF e senha são obrigatórios', HttpStatus.BAD_REQUEST);
        }

        return this.authService.login(cpf, password, journeyName);
    }

    @Post('verify-device')
    async verifyDevice(@Body() body: { cpf: string; code: string; journeyName?: string }) {
        const { cpf, code, journeyName } = body;

        if (!cpf || !code) {
            throw new HttpException('CPF e código são obrigatórios', HttpStatus.BAD_REQUEST);
        }

        return this.authService.verifyDevice(cpf, code, journeyName);
    }
}
