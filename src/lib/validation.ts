import { z } from "zod";

export const PHONE_MIN_LENGTH = 10;
export const PHONE_MAX_LENGTH = 14;
export const PHONE_ALLOWED_CHARS = /[^0-9+-]/g;

export const nameSchema = z.string().trim().min(1, "Please enter your full name.");
export const eventSchema = z.string().trim().min(1, "Please enter your event name.");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .email("Please enter a valid email address.");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Please enter your phone number.")
  .regex(/^[0-9+-]+$/, "Phone number can only contain digits, + and -.")
  .min(PHONE_MIN_LENGTH, `Phone number must be between ${PHONE_MIN_LENGTH} and ${PHONE_MAX_LENGTH} characters.`)
  .max(PHONE_MAX_LENGTH, `Phone number must be between ${PHONE_MIN_LENGTH} and ${PHONE_MAX_LENGTH} characters.`);

export const messageSchema = z.string().trim().min(1, "Please enter a message.");
