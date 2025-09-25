import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface SimpleCaptchaProps {
  value: string;
  onChange: (value: string) => void;
  onCaptchaGenerate: (captcha: string) => void;
}

const SimpleCaptcha = ({ value, onChange, onCaptchaGenerate }: SimpleCaptchaProps) => {
  const [captcha, setCaptcha] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    onCaptchaGenerate(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="bg-muted border rounded p-2 min-h-[40px] flex items-center justify-center font-mono text-lg font-bold tracking-wider select-none bg-gradient-to-r from-muted to-accent" style={{
          backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cdefs%3e%3cpattern id=\'a\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'20\' patternTransform=\'scale(0.5) rotate(45)\'%3e%3crect fill=\'%23f8f9fa\' width=\'10\' height=\'10\'/%3e%3crect fill=\'%23e9ecef\' x=\'10\' width=\'10\' height=\'10\'/%3e%3crect fill=\'%23e9ecef\' y=\'10\' width=\'10\' height=\'10\'/%3e%3crect fill=\'%23f8f9fa\' x=\'10\' y=\'10\' width=\'10\' height=\'10\'/%3e%3c/pattern%3e%3c/defs%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'url(%23a)\'/%3e%3c/svg%3e")',
        }}>
          {captcha}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generateCaptcha}
          className="p-2 h-10 w-10"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Captcha"
        className="h-10"
      />
    </div>
  );
};

export default SimpleCaptcha;