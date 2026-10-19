import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config.js';

/**
 * Generate a signed JWT token
 * @param {Object} payload - User data { id, username, role, name }
 * @returns {string} Signed JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.JWT_EXPIRES_IN
  });
};

/**
 * Verify JWT token
 * @param {string} token - The Bearer token
 * @returns {Object|null} Decoded token payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, CONFIG.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
