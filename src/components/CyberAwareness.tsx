import { useState } from 'react';
import { 
  Shield, 
  Mail, 
  CreditCard, 
  User, 
  ShoppingCart, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Download,
  ChevronDown,
  Smartphone,
  Globe,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CyberAwareness = () => {
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const scamTypes = [
    {
      id: 'phishing',
      title: 'Phishing Attacks',
      icon: Mail,
      description: 'Fake emails or messages asking for personal information',
      details: 'Scammers send emails that look like they\'re from legitimate companies to steal your login credentials, credit card numbers, or other sensitive information.',
      warning: 'Never click suspicious links or download attachments from unknown senders'
    },
    {
      id: 'fake-jobs',
      title: 'Fake Job Offers', 
      icon: Smartphone,
      description: 'Fraudulent employment opportunities requiring upfront payments',
      details: 'Scammers post fake job listings and ask for registration fees, training costs, or personal documents before offering employment.',
      warning: 'Legitimate employers never ask for money upfront'
    },
    {
      id: 'credit-fraud',
      title: 'Credit Card Fraud',
      icon: CreditCard,
      description: 'Unauthorized use of your credit/debit card information',
      details: 'Criminals use stolen card details to make purchases online or create duplicate cards for fraudulent transactions.',
      warning: 'Monitor your statements regularly and report suspicious transactions immediately'
    },
    {
      id: 'identity-theft',
      title: 'Identity Theft',
      icon: User,
      description: 'Stealing personal information to impersonate you',
      details: 'Fraudsters collect your personal details like Aadhaar, PAN, or passport information to open accounts or take loans in your name.',
      warning: 'Never share personal documents with unverified sources'
    },
    {
      id: 'shopping-fraud',
      title: 'Online Shopping Fraud',
      icon: ShoppingCart,
      description: 'Fake online stores or non-delivery of purchased items',
      details: 'Scammers create fake e-commerce websites with attractive deals, collect payments, but never deliver the products.',
      warning: 'Only shop from verified and trusted websites'
    },
    {
      id: 'investment-fraud',
      title: 'Investment Scams',
      icon: Globe,
      description: 'Fraudulent investment schemes promising high returns',
      details: 'Scammers promise unrealistic returns on investments in cryptocurrency, stocks, or business opportunities.',
      warning: 'If it sounds too good to be true, it probably is'
    }
  ];

  const actionSteps = [
    {
      step: 1,
      title: 'Immediate Response',
      icon: AlertTriangle,
      actions: [
        'Stop all communication with the scammer',
        'Do not share any more personal information',
        'Take screenshots of messages/emails as evidence',
        'Change passwords of affected accounts immediately'
      ]
    },
    {
      step: 2,
      title: 'Secure Your Accounts',
      icon: Lock,
      actions: [
        'Enable two-factor authentication on all accounts',
        'Contact your bank to block cards if compromised',
        'Check and freeze credit reports if identity theft suspected',
        'Update security questions and recovery information'
      ]
    },
    {
      step: 3,
      title: 'Report the Crime',
      icon: Phone,
      actions: [
        'File a complaint on the National Cyber Crime Portal',
        'Report to local police cyber cell',
        'Contact your bank\'s fraud department',
        'Report to relevant regulatory authorities'
      ]  
    },
    {
      step: 4,
      title: 'Prevent Future Risks',
      icon: Shield,
      actions: [
        'Install updated antivirus software',
        'Regularly monitor bank and credit card statements',
        'Be cautious with unsolicited calls and emails',
        'Educate family members about common scams'
      ]
    }
  ];

  const safetyTips = [
    { type: 'do', tip: 'Verify website URLs before entering sensitive information', icon: CheckCircle2 },
    { type: 'dont', tip: 'Never share OTPs, passwords, or PINs with anyone', icon: AlertTriangle },
    { type: 'do', tip: 'Use strong, unique passwords for different accounts', icon: CheckCircle2 },
    { type: 'dont', tip: 'Don\'t click on suspicious links or download unknown attachments', icon: AlertTriangle },
    { type: 'do', tip: 'Keep your software and apps updated regularly', icon: CheckCircle2 },
    { type: 'dont', tip: 'Never provide personal information over unsolicited calls', icon: AlertTriangle },
    { type: 'do', tip: 'Use official apps and websites for transactions', icon: CheckCircle2 },
    { type: 'dont', tip: 'Don\'t use public Wi-Fi for banking or sensitive activities', icon: AlertTriangle }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const checkQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-security/10 border-2 border-security/20">
              <Shield className="h-16 w-16 text-security" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-security to-primary bg-clip-text text-transparent">
            Cyber Crime Awareness
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Stay Alert, Stay Safe – Learn about the most common online frauds and the steps you should take if you ever face them.
          </p>
          <div className="w-1 h-20 bg-gradient-to-b from-security to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Timeline Container */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-security via-primary to-success transform md:-translate-x-0.5"></div>

          {/* Types of Scams Section */}
          <div className="relative mb-16">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center relative z-10 md:mx-auto">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6 md:ml-0 md:absolute md:left-1/2 md:transform md:translate-x-8">
                <h2 className="text-3xl font-bold text-destructive">Common Cyber Crimes</h2>
                <p className="text-muted-foreground">Click to learn about each type of scam</p>
              </div>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {scamTypes.map((scam, index) => {
                const Icon = scam.icon;
                return (
                  <div key={scam.id} className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}>
                    <AccordionItem value={scam.id} className="border-none">
                      <Card className="hover:shadow-lg transition-all duration-300 hover:shadow-destructive/20">
                        <AccordionTrigger className="hover:no-underline p-0">
                          <CardHeader className="flex-row space-y-0 items-center space-x-4 w-full">
                            <div className="p-3 rounded-full bg-destructive/10">
                              <Icon className="h-6 w-6 text-destructive" />
                            </div>
                            <div className="text-left flex-1">
                              <CardTitle className="text-lg">{scam.title}</CardTitle>
                              <CardDescription>{scam.description}</CardDescription>
                            </div>
                          </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground mb-4">{scam.details}</p>
                            <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                              <div className="flex items-start space-x-2">
                                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium text-destructive">{scam.warning}</p>
                              </div>
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          </div>

          {/* Action Steps Section */}
          <div className="relative mb-16">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center relative z-10 md:mx-auto">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6 md:ml-0 md:absolute md:left-1/2 md:transform md:translate-x-8">
                <h2 className="text-3xl font-bold text-warning">What To Do If It Happens</h2>
                <p className="text-muted-foreground">Follow these steps immediately</p>
              </div>
            </div>

            <div className="space-y-6">
              {actionSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}>
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader className="flex-row space-y-0 items-center space-x-4">
                        <div className="p-3 rounded-full bg-warning/10">
                          <Icon className="h-6 w-6 text-warning" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Step {step.step}: {step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-start space-x-2">
                              <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                              <span className="text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safety Tips Section */}
          <div className="relative mb-16">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center relative z-10 md:mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6 md:ml-0 md:absolute md:left-1/2 md:transform md:translate-x-8">
                <h2 className="text-3xl font-bold text-success">Safety Tips</h2>
                <p className="text-muted-foreground">Essential do's and don'ts</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {safetyTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <Card key={index} className={`hover:shadow-lg transition-all duration-300 ${
                    tip.type === 'do' ? 'hover:shadow-success/20' : 'hover:shadow-destructive/20'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          tip.type === 'do' ? 'bg-success/10' : 'bg-destructive/10'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            tip.type === 'do' ? 'text-success' : 'text-destructive'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <Badge variant={tip.type === 'do' ? 'default' : 'destructive'} className="mb-2">
                            {tip.type === 'do' ? "DO" : "DON'T"}
                          </Badge>
                          <p className="text-sm">{tip.tip}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Interactive Quiz Section */}
          <div className="relative mb-16">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative z-10 md:mx-auto">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6 md:ml-0 md:absolute md:left-1/2 md:transform md:translate-x-8">
                <h2 className="text-3xl font-bold text-primary">Spot the Scam</h2>
                <p className="text-muted-foreground">Can you identify what's wrong?</p>
              </div>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Quiz: Is this email legitimate?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg mb-4 font-mono text-sm">
                  <p className="font-bold">From: security@sbi-bank.in</p>
                  <p className="font-bold">Subject: Urgent: Your account will be suspended</p>
                  <br />
                  <p>Dear Customer,</p>
                  <br />
                  <p>Your SBI account will be suspended within 24 hours due to security reasons. Click the link below to verify your account immediately:</p>
                  <br />
                  <p className="text-primary underline">www.sbi-verify-account.com/urgent</p>
                  <br />
                  <p>Provide your login ID, password, and OTP to avoid suspension.</p>
                  <br />
                  <p>Regards,<br />SBI Security Team</p>
                </div>

                <div className="space-y-2 mb-4">
                  <Button 
                    variant={quizAnswer === 'scam' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => checkQuizAnswer('scam')}
                  >
                    This is a scam email
                  </Button>
                  <Button 
                    variant={quizAnswer === 'legitimate' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => checkQuizAnswer('legitimate')}
                  >
                    This is a legitimate email
                  </Button>
                </div>

                {quizAnswer && (
                  <div className={`p-4 rounded-lg ${
                    quizAnswer === 'scam' 
                      ? 'bg-success/10 border border-success/20' 
                      : 'bg-destructive/10 border border-destructive/20'
                  }`}>
                    {quizAnswer === 'scam' ? (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                          <span className="font-semibold text-success">Correct!</span>
                        </div>
                        <p className="text-sm">This is a phishing scam. Red flags include:</p>
                        <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                          <li>Suspicious domain (sbi-bank.in instead of onlinesbi.sbi)</li>
                          <li>Urgent language creating panic</li>
                          <li>Asking for passwords and OTPs</li>
                          <li>Unofficial URL for verification</li>
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          <span className="font-semibold text-destructive">Incorrect!</span>
                        </div>
                        <p className="text-sm">This is a phishing scam. Banks never ask for passwords or OTPs via email.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resources Section */}
          <div className="relative">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative z-10 md:mx-auto">
                <Download className="h-8 w-8 text-white" />
              </div>
              <div className="ml-6 md:ml-0 md:absolute md:left-1/2 md:transform md:translate-x-8">
                <h2 className="text-3xl font-bold text-primary">Resources & Help</h2>
                <p className="text-muted-foreground">Get help and stay informed</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Cyber Helpline</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-primary mb-2">1930</p>
                  <p className="text-sm text-muted-foreground">24/7 National Cyber Crime Helpline</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Report Online</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="outline" className="w-full mb-2" asChild>
                    <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                      cybercrime.gov.in
                    </a>
                  </Button>
                  <p className="text-sm text-muted-foreground">Official reporting portal</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Awareness Kit</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full mb-2">
                    Download Checklist
                  </Button>
                  <p className="text-sm text-muted-foreground">Quick reference guide</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberAwareness;