
// Phone number validation utilities
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Basic validation: Must start with + and contain 10-15 digits
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phoneNumber.replace(/\s+/g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, ''));
};

// Format phone number for display (simple version)
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit chars except +
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  return cleaned;
};

// Format phone number for display as user types
export const formatPhoneNumberInput = (phoneNumber: string): string => {
  // Remove all non-digit characters first
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Apply formatting based on length
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else if (digits.length <= 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}${digits.length > 10 ? `-${digits.slice(10)}` : ''}`;
  }
};

// Combine country code and formatted number
export const combinePhoneNumber = (countryCode: string, phoneNumber: string): string => {
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  return `${countryCode}${cleanedNumber}`;
};

// OTP Generation
export const generateOTP = (): string => {
  // Generate a random 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP in localStorage with expiration
export const storeOTP = (phoneNumber: string, otp: string): void => {
  const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  const otpData = {
    otp,
    expiration: expirationTime,
    attempts: 0,
  };
  
  localStorage.setItem(`otp_${phoneNumber}`, JSON.stringify(otpData));
};

// Verify OTP
export const verifyOTP = (phoneNumber: string, userEnteredOTP: string): boolean => {
  const otpDataStr = localStorage.getItem(`otp_${phoneNumber}`);
  if (!otpDataStr) return false;
  
  const otpData = JSON.parse(otpDataStr);
  
  // Check if OTP has expired
  if (Date.now() > otpData.expiration) {
    localStorage.removeItem(`otp_${phoneNumber}`);
    return false;
  }
  
  // Increment attempt counter to prevent brute forcing
  otpData.attempts += 1;
  localStorage.setItem(`otp_${phoneNumber}`, JSON.stringify(otpData));
  
  // If too many attempts, invalidate the OTP
  if (otpData.attempts > 5) {
    localStorage.removeItem(`otp_${phoneNumber}`);
    return false;
  }
  
  // Check if OTP matches
  return otpData.otp === userEnteredOTP;
};

// Check if we can send a new OTP (rate limiting)
export const canSendOTP = (phoneNumber: string): boolean => {
  const lastSentTimeStr = localStorage.getItem(`lastSent_${phoneNumber}`);
  if (!lastSentTimeStr) return true;
  
  const lastSentTime = parseInt(lastSentTimeStr, 10);
  const timeElapsed = Date.now() - lastSentTime;
  
  // Allow new OTP if more than 1 minute has passed
  return timeElapsed > 60 * 1000;
};

// Record OTP send attempt for rate limiting
export const recordOTPSend = (phoneNumber: string): void => {
  localStorage.setItem(`lastSent_${phoneNumber}`, Date.now().toString());
};

// Simulate SMS sending (in real app, would call an API)
export const sendSMSOTP = (phoneNumber: string, otp: string): Promise<boolean> => {
  console.log(`[MOCK SMS] Sending OTP ${otp} to ${phoneNumber}`);
  
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
