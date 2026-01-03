# CORS Error Fix Guide

## Problem
```
Access to XMLHttpRequest at 'https://vidyavardani-backend.vercel.app//api/v1/auth/login' 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
Redirect is not allowed for a preflight request.
```

## Root Causes
1. **Double slash in URL** - URL concatenation issue (FIXED in apiConnector.js)
2. **CORS not enabled on backend** - Backend must allow requests from frontend
3. **Redirect during preflight** - Server cannot redirect during OPTIONS requests

## Solution

### Frontend Side (COMPLETED ✅)
1. ✅ Fixed URL concatenation to prevent `//api/v1`
2. ✅ Added URL sanitization to remove trailing slashes
3. ✅ Improved token handling in request interceptor

### Backend Side (REQUIRED)
The backend (`vidyavardani-backend.vercel.app`) needs to be configured with proper CORS headers:

```javascript
// Required CORS headers in backend
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### Backend Express.js Configuration Example
```javascript
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://your-frontend-domain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

## Testing the Connection

To test if backend connection works, open browser console and run:
```javascript
// Test basic connection
fetch('https://vidyavardani-backend.vercel.app/api/v1/course/showAllCategories')
  .then(r => r.json())
  .then(d => console.log('✅ Backend connected:', d))
  .catch(e => console.error('❌ Error:', e.message))
```

## Port Configuration
- Frontend: http://localhost:3001 (when 3000 is in use)
- Backend: https://vidyavardani-backend.vercel.app

## Next Steps
1. Ensure backend has CORS middleware properly configured
2. Verify backend is not redirecting HTTP to HTTPS during preflight
3. Check that OPTIONS requests are handled before business logic
4. Test with actual credentials if needed
