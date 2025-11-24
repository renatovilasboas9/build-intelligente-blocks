const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Mock das configurações
jest.mock('../../configs/demoUsers-js', () => ({
  findUserByCpf: jest.fn(),
  getUserDefaultJourney: jest.fn()
}));

jest.mock('../../configs/demoJourneys-js', () => ({
  getJourneyConfig: jest.fn()
}));

describe('Auth Routes', () => {
  let app;
  let demoUsers;
  let demoJourneys;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Importar mocks
    demoUsers = require('../../configs/demoUsers-js');
    demoJourneys = require('../../configs/demoJourneys-js');
    
    // Criar app de teste
    app = express();
    app.use(cors());
    app.use(express.json());
    
    // Adicionar rotas de auth (simplificado para teste)
    const loginAttempts = new Map();
    
    app.post('/auth/login', (req, res) => {
      const { cpf, password } = req.body;
      
      if (!cpf || !password) {
        return res.status(400).json({ message: 'CPF e senha são obrigatórios' });
      }
      
      const user = demoUsers.findUserByCpf(cpf);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      res.json({ success: true, user });
    });
  });

  describe('POST /auth/login', () => {
    it('deve retornar erro se CPF não for fornecido', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ password: '123456' });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('CPF e senha são obrigatórios');
    });

    it('deve retornar erro se senha não for fornecida', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ cpf: '11111111111' });
      
      expect(response.status).toBe(400);
    });

    it('deve retornar erro se usuário não existir', async () => {
      demoUsers.findUserByCpf.mockReturnValue(null);
      
      const response = await request(app)
        .post('/auth/login')
        .send({ cpf: '99999999999', password: '123456' });
      
      expect(response.status).toBe(404);
    });

    it('deve fazer login com sucesso', async () => {
      const mockUser = {
        id: 'carla',
        name: 'Carla',
        cpf: '11111111111',
        profile: 'standard'
      };
      
      demoUsers.findUserByCpf.mockReturnValue(mockUser);
      
      const response = await request(app)
        .post('/auth/login')
        .send({ cpf: '11111111111', password: '123456' });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toEqual(mockUser);
    });
  });
});
