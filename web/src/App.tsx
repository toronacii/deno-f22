import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./lib/auth_context.tsx";
import { ToastContainer } from "./lib/toast.tsx";
import { AuthGuard } from "./components/auth/AuthGuard.tsx";
import { EngineProvider } from "./engine/engine_context.tsx";

// Pages
import { LoginPage }              from "./pages/LoginPage.tsx";
import { RegisterPage }           from "./pages/RegisterPage.tsx";
import { AuthCallbackPage }       from "./pages/AuthCallbackPage.tsx";
import { ForgotPasswordPage }     from "./pages/ForgotPasswordPage.tsx";
import { ResetPasswordPage }      from "./pages/ResetPasswordPage.tsx";
import { OnboardingPage }         from "./pages/OnboardingPage.tsx";
import { AccountPage }            from "./pages/AccountPage.tsx";
import { DashboardPage }          from "./pages/DashboardPage.tsx";
import { TaxpayerWorkspacePage }  from "./pages/TaxpayerWorkspacePage.tsx";
import { FormEditorPage }         from "./pages/FormEditorPage.tsx";
import { PaymentCallbackPage }    from "./pages/PaymentCallbackPage.tsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <Routes>
            {/* Public */}
            <Route path="/login"            element={<LoginPage />} />
            <Route path="/register"         element={<RegisterPage />} />
            <Route path="/forgot-password"  element={<ForgotPasswordPage />} />
            <Route path="/reset-password"   element={<ResetPasswordPage />} />
            <Route path="/auth/callback"    element={<AuthCallbackPage />} />
            <Route path="/payment-callback" element={<PaymentCallbackPage />} />

            {/* Post-login: onboarding no requiere onboarding previo */}
            <Route path="/onboarding" element={
              <AuthGuard requireOnboarding={false}>
                <OnboardingPage />
              </AuthGuard>
            } />

            {/* Protected — cuenta */}
            <Route path="/account" element={
              <AuthGuard>
                <AccountPage />
              </AuthGuard>
            } />

            {/* Protected — nivel cuenta */}
            <Route path="/dashboard" element={
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            } />

            {/* Protected — nivel RUT */}
            <Route path="/rut/:rutId" element={
              <AuthGuard>
                <TaxpayerWorkspacePage />
              </AuthGuard>
            } />

            {/* Protected — nivel formulario (envuelve el motor F22) */}
            <Route path="/rut/:rutId/forms/:formId" element={
              <AuthGuard>
                <EngineProvider>
                  <FormEditorPage />
                </EngineProvider>
              </AuthGuard>
            } />

            {/* Default */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
