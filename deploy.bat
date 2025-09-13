@echo off
REM Learnify Deployment Script for Windows

echo 🚀 Starting Learnify Deployment Process...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install frontend dependencies
echo ✅ Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

REM Install backend dependencies
echo ✅ Installing backend dependencies...
cd Server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

REM Check if environment files exist
if not exist ".env" (
    echo ⚠️  Frontend .env file not found. Creating template...
    echo REACT_APP_BASE_URL=http://localhost:4000/api/v1 > .env
    echo ✅ Created frontend .env template
)

if not exist "Server\.env" (
    echo ⚠️  Backend .env file not found. Creating template...
    (
        echo PORT=4000
        echo MONGODB_URL=your_mongodb_connection_string
        echo JWT_SECRET=your_jwt_secret
        echo RAZORPAY_KEY=your_razorpay_key
        echo RAZORPAY_SECRET=your_razorpay_secret
        echo MAIL_HOST=smtp.gmail.com
        echo MAIL_USER=your_email@gmail.com
        echo MAIL_PASS=your_app_password
        echo CLOUD_NAME=your_cloudinary_name
        echo API_KEY=your_cloudinary_api_key
        echo API_SECRET=your_cloudinary_api_secret
        echo FOLDER_NAME=LearnifyDF
    ) > Server\.env
    echo ✅ Created backend .env template
    echo ⚠️  Please update the backend .env file with your actual credentials
)

REM Build frontend for production
echo ✅ Building frontend for production...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build frontend
    pause
    exit /b 1
)

echo ✅ Frontend build completed successfully

echo.
echo 🎉 Deployment preparation completed successfully!
echo.
echo Next steps:
echo 1. Update environment variables in both .env files
echo 2. Deploy the 'build' folder to your frontend hosting service (Vercel, Netlify, etc.)
echo 3. Deploy the 'Server' folder to your backend hosting service (Render, Railway, etc.)
echo 4. Update REACT_APP_BASE_URL in frontend .env to point to your deployed backend
echo.
echo For local development, run: npm run dev
echo.
pause
