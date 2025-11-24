import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JourneyProvider } from './contexts/JourneyContext';
import LoginPage from './pages/LoginPage';
import DeviceVerificationPage from './pages/DeviceVerificationPage';
import HomePage from './pages/HomePage';
import LoanSimulationPage from './pages/LoanSimulationPage';
import LoanConfirmationPage from './pages/LoanConfirmationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import IntelligencePage from './pages/IntelligencePage';
import DebugPanel from './components/DebugPanel';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <JourneyProvider>
                    <div className="min-h-screen bg-gray-50">
                        <DebugPanel />
                        <Routes>
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/device-verification" element={<DeviceVerificationPage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/loan/simulation" element={<LoanSimulationPage />} />
                            <Route path="/loan/confirmation" element={<LoanConfirmationPage />} />
                            <Route path="/analytics" element={<AnalyticsPage />} />
                            <Route path="/intelligence" element={<IntelligencePage />} />
                        </Routes>
                    </div>
                </JourneyProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
