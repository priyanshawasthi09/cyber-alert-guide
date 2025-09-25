import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import SimpleCaptcha from './SimpleCaptcha';
import { supabase } from '@/integrations/supabase/client';

const loginSchema = z.object({
  loginId: z.string().min(1, 'Login ID is required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  otp: z.string().min(4, 'Enter valid OTP'),
  captcha: z.string().min(1, 'Enter captcha')
});

type LoginFormData = z.infer<typeof loginSchema>;

interface CitizenLoginProps {
  onForgotLogin: () => void;
}

const CitizenLogin = ({ onForgotLogin }: CitizenLoginProps) => {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [otpSent, setOtpSent] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginId: '',
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

  const onSubmit = async (data: LoginFormData) => {
    if (data.captcha.toLowerCase() !== captchaValue.toLowerCase()) {
      toast({
        title: 'Invalid Captcha',
        description: 'Please enter the correct captcha',
        variant: 'destructive'
      });
      return;
    }

    try {
      // For demo purposes, create a simple email from mobile number
      const email = `user${data.mobile}@cybercrime.gov.in`;
      
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: data.loginId + data.mobile // Simple password combination
      });

      if (error) {
        // If user doesn't exist, try to sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: data.loginId + data.mobile,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (signUpError) {
          throw signUpError;
        }

        toast({
          title: 'Account Created',
          description: 'New account created and logged in successfully',
        });
      } else {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
      }

      // Redirect to main page
      window.location.href = '/';

    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid login credentials',
        variant: 'destructive'
      });
    }
  };

  const handleClear = () => {
    form.reset();
    setOtpSent(false);
    setStep('login');
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-security mb-2">
          —— CITIZEN LOGIN ——
        </h2>
        <button 
          onClick={() => window.location.href = '/auth'} 
          className="text-primary hover:underline text-sm"
        >
          Click Here for New User
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="loginId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  LOGIN ID: <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your Login Id"
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  MOBILE NO: <span className="text-destructive">*</span>
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
                      placeholder="Mobile No."
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
              onClick={handleClear}
              variant="destructive"
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-security hover:bg-security/90 text-security-foreground"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center mt-4">
        <button
          onClick={onForgotLogin}
          className="text-primary hover:underline text-sm"
        >
          Forgot Login Id
        </button>
      </div>
    </div>
  );
};

export default CitizenLogin;