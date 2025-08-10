
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  formatPhoneNumber,
  generateOTP,
  storeOTP,
  verifyOTP,
  canSendOTP,
  recordOTPSend,
  sendSMSOTP
} from "@/utils/phoneAuth";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneNumberForm, PhoneFormData } from "@/components/auth/PhoneNumberForm";
import { OTPForm, OTPFormData } from "@/components/auth/OTPForm";

const PhoneLogin = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    
    const timer = setTimeout(() => {
      setResendCountdown(resendCountdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handlePhoneSubmit = async (values: PhoneFormData) => {
    setIsSubmitting(true);
    try {
      // The phone number now comes in the correct format with country code
      const formattedPhone = values.phoneNumber;
      
      // Check rate limiting
      if (!canSendOTP(formattedPhone)) {
        toast({
          variant: "destructive",
          title: "Please wait",
          description: "You can request a new code in a minute",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Generate and store OTP
      const otp = generateOTP();
      storeOTP(formattedPhone, otp);
      recordOTPSend(formattedPhone);
      
      // Send the OTP (simulated)
      await sendSMSOTP(formattedPhone, otp);
      
      toast({
        title: "Verification code sent!",
        description: `We've sent a 6-digit code to ${formattedPhone}`,
      });
      
      // Store phone number and advance to OTP step
      setPhoneNumber(formattedPhone);
      setStep("otp");
      setResendCountdown(60); // 1 minute cooldown
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        variant: "destructive",
        title: "Failed to send code",
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = (values: OTPFormData) => {
    setIsSubmitting(true);
    try {
      // Verify the OTP
      const isValid = verifyOTP(phoneNumber, values.otp);
      
      if (isValid) {
        toast({
          title: "Verification successful!",
          description: "You're now signed in to ZenithMind.",
        });
        
        // Create user data object with phone number
        const userData = {
          name: "User", // In a real app, you might fetch the user's profile
          phoneNumber: phoneNumber,
          isAuthenticated: true,
        };
        
        // Use the login function from AuthContext
        login(userData);
        
        // Redirect to home page after successful sign-in
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "Invalid or expired code. Please try again.",
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    setIsSubmitting(true);
    try {
      if (resendCountdown > 0) return;
      
      // Generate and store new OTP
      const otp = generateOTP();
      storeOTP(phoneNumber, otp);
      recordOTPSend(phoneNumber);
      
      // Send the OTP (simulated)
      await sendSMSOTP(phoneNumber, otp);
      
      toast({
        title: "New code sent!",
        description: `We've sent a new verification code to ${phoneNumber}`,
      });
      
      setResendCountdown(60); // 1 minute cooldown
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast({
        variant: "destructive",
        title: "Failed to send code",
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Phone Login</CardTitle>
            <CardDescription className="text-center">
              {step === "phone" 
                ? "Enter your phone number to receive a verification code" 
                : "Enter the 6-digit code sent to your phone"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "phone" ? (
              <PhoneNumberForm 
                onSubmit={handlePhoneSubmit} 
                isSubmitting={isSubmitting}
              />
            ) : (
              <OTPForm 
                onSubmit={handleOtpSubmit}
                onResendOTP={handleResendOTP}
                onBack={() => setStep("phone")}
                resendCountdown={resendCountdown}
                isSubmitting={isSubmitting}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-zenith-purple hover:underline">
                Create account
              </Link>
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Or{" "}
              <Link to="/signin" className="text-zenith-purple hover:underline">
                Sign in with email
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PhoneLogin;
