export default {
  port: 1337,
  origin: `http://localhost:3000`,
  dbUri: `mongodb://localhost:27017/rest-api`,
  cacheUri: "redis://localhost:6379",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "10h",
  publicKey: `-----BEGIN PUBLIC KEY-----
  YOUR PUBLIC KEY - GENERATE IT ONLINE AND PASTE HERE
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
YOUR PRIVATE KEY - GENERATE IT ONLINE AND PASTE HERE
-----END RSA PRIVATE KEY-----`,
  googleClientId:
    "YOUR_GOOGLE_CLIENT_ID",
  googleClientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
  googleOauthRedirectUrl: "http://localhost:1337/api/sessions/oauth/google",
};
