import * as otpGenerator from 'otp-generator';
import { OTP_LENGTH, OTP_EXPIRY_IN_MINUTES } from '../constants';

export const addMinutesToDate = (minutes: number) =>
  new Date(new Date().getTime() + minutes * 60000);

export const capitalize = (str: string): string => {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const quickOTP = (minutes = OTP_EXPIRY_IN_MINUTES) => {
  return {
    code: otpGenerator.generate(OTP_LENGTH, {
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    }),
    expiresAt: { date: addMinutesToDate(minutes), string: `${minutes}m` },
  };
};
