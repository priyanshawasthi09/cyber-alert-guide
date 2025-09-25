import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import SimpleCaptcha from './SimpleCaptcha';

const forgotSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  otp: z.string().min(4, 'Enter valid OTP'),
  captcha: z.string().min(1, 'Enter captcha')
});

type ForgotFormData = z.infer<typeof forgotSchema>;

interface ForgotLoginIdProps {
  onBack: () => void;
}

const ForgotLoginId = ({ onBack }: ForgotLoginIdProps) => {
  const [otpSent, setOtpSent] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const { toast } = useToast();

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      mobile: '',
      otp: '',
      captcha: ''
    }
  });

  const handleGetOtp = async () => {
    const mobile = form.getValues('mobile');
    if (!mobile || mobile.length !== 10) {
      toast({
        title: 'Invalid Mobile Number',
        description: 'Please enter a valid 10-digit mobile number',
        variant: 'destructive'
      });
      return;
    }

    // Simulate OTP sending
    setOtpSent(true);
    toast({
      title: 'OTP Sent',
      description: `OTP sent to +91 ${mobile}`,
    });
  };

  const onSubmit = async (data: ForgotFormData) => {
    if (data.captcha.toLowerCase() !== captchaValue.toLowerCase()) {
      toast({
        title: 'Invalid Captcha',
        description: 'Please enter the correct captcha',
        variant: 'destructive'
      });
      return;
    }

    // Simulate login ID retrieval
    const loginId = `USER${data.mobile.slice(-4)}`;
    
    toast({
      title: 'Login ID Retrieved',
      description: `Your Login ID is: ${loginId}`,
    });

    // Go back to login after 2 seconds
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const handleClear = () => {
    form.reset();
    setOtpSent(false);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-security mb-2">
          —— FORGOT LOGIN ID ——
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Registered Mobile No: <span className="text-destructive">*</span>
                </FormLabel>
                <div className="flex gap-2">
                  <Select defaultValue="+91">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+91">+91</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Mobile Number"
                      maxLength={10}
                      className="flex-1 h-10"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={handleGetOtp}
                    className="bg-security hover:bg-security/90 text-security-foreground px-4 h-10"
                  >
                    Get OTP
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  OTP: <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your OTP Number"
                    maxLength={6}
                    className="h-10"
                    disabled={!otpSent}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="captcha"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SimpleCaptcha 
                    value={field.value}
                    onChange={field.onChange}
                    onCaptchaGenerate={setCaptchaValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="destructive"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-security hover:bg-security/90 text-security-foreground"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              variant="outline"
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotLoginId;