
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timer } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const otpFormSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .max(6, {
      message: "Your one-time password must be 6 characters.",
    }),
});

export type OTPFormData = z.infer<typeof otpFormSchema>;

interface OTPFormProps {
  onSubmit: (values: OTPFormData) => void;
  onResendOTP: () => void;
  onBack: () => void;
  resendCountdown: number;
  isSubmitting?: boolean;
}

export const OTPForm = ({ 
  onSubmit, 
  onResendOTP, 
  onBack, 
  resendCountdown,
  isSubmitting = false 
}: OTPFormProps) => {
  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  return (
    <Form {...otpForm}>
      <form onSubmit={otpForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center space-y-2">
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {resendCountdown > 0 && (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Timer className="mr-1 h-3 w-3" />
            Resend available in {resendCountdown} seconds
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 bg-zenith-purple hover:bg-zenith-purple-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </div>
        
        <Button
          type="button"
          variant="ghost"
          className="w-full text-zenith-purple"
          disabled={resendCountdown > 0}
          onClick={onResendOTP}
        >
          Resend Code
        </Button>
      </form>
    </Form>
  );
};
