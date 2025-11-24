const demoUsers = [
  {
    id: 'carla',
    name: 'Carla',
    cpf: '11111111111',
    profile: 'standard',
    journeys: ['carla_default', 'carla_personalized']
  },
  {
    id: 'jorge',
    name: 'Jorge',
    cpf: '22222222222',
    profile: 'standard',
    journeys: ['jorge_high_latency', 'jorge_password_issue']
  },
  {
    id: 'marcos',
    name: 'Marcos',
    cpf: '33333333333',
    profile: 'standard',
    journeys: ['marcos_rejected']
  },
  {
    id: 'carla_premium',
    name: 'CarlaPersonalizada',
    cpf: '11111111111',
    profile: 'premium',
    journeys: ['carla_personalized']
  }
];

function findUserByCpf(cpf) {
  return demoUsers.find(u => u.cpf === cpf);
}

function getUserDefaultJourney(cpf) {
  const user = findUserByCpf(cpf);
  return user ? user.journeys[0] : undefined;
}

module.exports = {
  demoUsers,
  findUserByCpf,
  getUserDefaultJourney
};
