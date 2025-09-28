const jwt = require('jsonwebtoken');

const resolveSecret = () => {
  const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || 'fallback-secret-key';
  return secret;
};

const generateTokens = (userId, res) => {
  // Access token (short-lived)
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    resolveSecret(),
    { expiresIn: '15m' }
  );

  // Refresh token (long-lived)
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    resolveSecret(),
    { expiresIn: '7d' }
  );

  if (res && typeof res.cookie === 'function') {
    // Set access token in cookie
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    // Set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

  return { accessToken, refreshToken };
};

// Legacy function for backward compatibility
const generateToken = (userId, res) => {
  const tokens = generateTokens(userId, res);
  return tokens.accessToken;
};

module.exports = generateToken;
module.exports.generateTokens = generateTokens;


