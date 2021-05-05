module.exports = {
  dev: {
  "default-src": ["'self'"],
  "style-src": [
    "'self'",
    "*",
  ]
  },
  prod: {
  "default-src": "'self'", 
  "style-src": [
    "'self'",
    "*",
  ],
  "connect-src": [
    "'self'",
    "*"
  ]
  }
}
