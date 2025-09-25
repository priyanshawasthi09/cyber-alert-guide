import CybercrimeReporting from '@/components/CybercrimeReporting';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button 
          onClick={() => window.location.href = '/awareness'}
          variant="outline"
          className="border-security text-security hover:bg-security/10"
        >
          Cyber Awareness
        </Button>
        <Button 
          onClick={() => window.location.href = '/auth'}
          className="bg-security hover:bg-security/90 text-security-foreground"
        >
          Citizen Login
        </Button>
      </div>
      <CybercrimeReporting />
    </div>
  );
};

export default Index;
