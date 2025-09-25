import { useState } from 'react';
import CitizenLogin from '@/components/auth/CitizenLogin';
import ForgotLoginId from '@/components/auth/ForgotLoginId';

const Auth = () => {
  const [currentView, setCurrentView] = useState<'login' | 'forgot'>('login');

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-6 text-sm">
            <span>🏠 Home</span>
            <span>Register a Complaint</span>
            <span>Track your Complaint</span>
            <span>Report & Check Suspect</span>
            <span>Cyber Volunteers</span>
            <span>Learning Corner</span>
            <span>Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-muted py-2">
        <div className="container mx-auto px-4">
          <span className="text-sm text-muted-foreground">
            Home &gt; {currentView === 'login' ? 'Login' : 'Forgot User Name'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Information */}
            <div className="bg-card rounded-lg shadow-card p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-security mb-2">
                  —— CHECK LIST FOR COMPLAINANT ——
                </h2>
                <p className="text-destructive font-medium">
                  Please keep this information ready before filing your complaint:
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-bold mb-2">Mandatory Information</h3>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Incident Date and Time.</li>
                    <li>Incident details (minimum 200 characters) without any special characters (#@^*"-|).</li>
                    <li>Soft copy of any national Id ( Voter Id, Driving license, Passport, PAN Card, Aadhar Card) of complainant in .jpeg, .jpg, .png format (file size should not more than 5 MB).</li>
                    <li className="font-medium">In case of financial fraud, please keep following information ready:</li>
                    <ul className="list-none ml-4 space-y-1">
                      <li>i) Name of the Bank/ Wallet/Merchant</li>
                      <li>ii) 12-digit Transaction id/UTR No.</li>
                      <li>iii) Date of transaction</li>
                      <li>iv) Fraud amount</li>
                    </ul>
                    <li>Soft copy of all the relevant evidences related to the cyber crime (not more than 10 MB each)</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Optional/Desirable Information:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Suspected website URLs/ Social Media handles (wherever applicable)</li>
                    <li>Suspect Details (if available)</li>
                    <ul className="list-none ml-4 space-y-1">
                      <li>i) Mobile No</li>
                      <li>ii) Email id</li>
                      <li>iii) Bank Account No</li>
                      <li>iv) Address</li>
                      <li>v) Soft copy of photograph of suspect in .jpeg, .jpg, .png format (not more than 5 MB)</li>
                      <li>vi) Any other document through which suspect can be identified.</li>
                    </ul>
                  </ol>
                </div>
              </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="bg-card rounded-lg shadow-card p-6">
              {currentView === 'login' ? (
                <CitizenLogin onForgotLogin={() => setCurrentView('forgot')} />
              ) : (
                <ForgotLoginId onBack={() => setCurrentView('login')} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;