import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Shield, FileText, Upload, CheckCircle, AlertTriangle, Lock, Users, Calendar } from 'lucide-react';
import heroImage from '@/assets/hero-security.jpg';

const INCIDENT_TYPES = [
  { value: 'phishing', label: 'Phishing Attack', icon: AlertTriangle },
  { value: 'malware', label: 'Malware/Virus', icon: Shield },
  { value: 'unauthorized-access', label: 'Unauthorized Access', icon: Lock },
  { value: 'identity-theft', label: 'Identity Theft', icon: Users },
  { value: 'financial-fraud', label: 'Financial Fraud', icon: FileText },
  { value: 'ddos', label: 'DDoS Attack', icon: Shield },
  { value: 'other', label: 'Other', icon: AlertTriangle },
];

export default function CybercrimeReporting() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    incidentType: '',
    discoveryDate: '',
    startDate: '',
    description: '',
    affectedSystems: '',
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    financialLoss: '',
    evidenceFiles: [] as File[],
  });

  const steps = [
    'Incident Type',
    'Discovery Details', 
    'Impact Assessment',
    'Reporter Information',
    'Evidence Upload',
    'Review & Submit'
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ 
        ...prev, 
        evidenceFiles: [...prev.evidenceFiles, ...Array.from(files)] 
      }));
    }
  };

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <div className="relative bg-gradient-primary overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Cybersecurity protection" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Cybercrime Reporting Portal
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Report cybercrime incidents to the Computer Emergency Response Team (CERT) 
                with our secure, comprehensive reporting system.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setCurrentStep(1)}
                className="bg-white text-primary hover:bg-white/90 shadow-security"
              >
                Start Report
                <FileText className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Our streamlined process ensures your incident is properly documented and reported
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Document the Incident",
                description: "Provide detailed information about the cybercrime incident"
              },
              {
                icon: Upload,
                title: "Upload Evidence",
                description: "Attach supporting documents, screenshots, and transaction records"
              },
              {
                icon: CheckCircle,
                title: "Submit Report",
                description: "Your report is securely transmitted to the appropriate CERT team"
              }
            ].map((step, index) => (
              <Card key={index} className="text-center shadow-card">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full mb-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Cybercrime Incident Report
          </h1>
          <p className="text-muted-foreground">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
        </div>

        {/* Form Content */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-security" />
              {steps[currentStep - 1]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Incident Type */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <Label htmlFor="incident-type">Type of Incident *</Label>
                <Select onValueChange={(value) => handleInputChange('incidentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="w-4 h-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 2: Discovery Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="discovery-date">Date and Time Discovered *</Label>
                  <Input
                    id="discovery-date"
                    type="datetime-local"
                    value={formData.discoveryDate}
                    onChange={(e) => handleInputChange('discoveryDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="start-date">Estimated Start Date and Time</Label>
                  <Input
                    id="start-date"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide a detailed description of the incident, including what happened, where it occurred, and any relevant circumstances..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Impact Assessment */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="affected-systems">Affected Systems/Accounts *</Label>
                  <Textarea
                    id="affected-systems"
                    placeholder="List all affected systems, networks, accounts, or devices..."
                    value={formData.affectedSystems}
                    onChange={(e) => handleInputChange('affectedSystems', e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="financial-loss">Estimated Financial Loss</Label>
                  <Input
                    id="financial-loss"
                    type="number"
                    placeholder="0.00"
                    value={formData.financialLoss}
                    onChange={(e) => handleInputChange('financialLoss', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Reporter Information */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reporter-name">Full Name *</Label>
                  <Input
                    id="reporter-name"
                    value={formData.reporterName}
                    onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reporter-email">Email Address *</Label>
                  <Input
                    id="reporter-email"
                    type="email"
                    value={formData.reporterEmail}
                    onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reporter-phone">Phone Number</Label>
                  <Input
                    id="reporter-phone"
                    type="tel"
                    value={formData.reporterPhone}
                    onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Evidence Upload */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div>
                  <Label>Supporting Evidence</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload screenshots, bank statements, emails, or other evidence
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {formData.evidenceFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Uploaded Files:</p>
                      <ul className="text-sm text-muted-foreground">
                        {formData.evidenceFiles.map((file, index) => (
                          <li key={index}>• {file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-gradient-subtle rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Report Summary</h3>
                  <div className="grid gap-4">
                    <div>
                      <strong>Incident Type:</strong> {formData.incidentType}
                    </div>
                    <div>
                      <strong>Discovery Date:</strong> {formData.discoveryDate}
                    </div>
                    <div>
                      <strong>Reporter:</strong> {formData.reporterName} ({formData.reporterEmail})
                    </div>
                    <div>
                      <strong>Evidence Files:</strong> {formData.evidenceFiles.length} files attached
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I confirm that the information provided is accurate and complete to the best of my knowledge
                  </Label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              <Button 
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className={currentStep === steps.length ? "bg-gradient-security" : ""}
              >
                {currentStep === steps.length ? 'Submit Report' : 'Next'}
                {currentStep === steps.length && <CheckCircle className="ml-2 w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}