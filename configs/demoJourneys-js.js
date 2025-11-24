const demoJourneys = {
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

function getJourneyConfig(journeyName) {
  return demoJourneys[journeyName];
}

function getAllJourneyNames() {
  return Object.keys(demoJourneys);
}

module.exports = {
  demoJourneys,
  getJourneyConfig,
  getAllJourneyNames
};
