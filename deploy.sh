#!/bin/bash

# Learnify Deployment Script

echo "🚀 Starting Learnify Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js and npm are installed"

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
print_status "Installing backend dependencies..."
cd Server
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install backend dependencies"
    exit 1
fi

cd ..

# Check if environment files exist
if [ ! -f ".env" ]; then
    print_warning "Frontend .env file not found. Creating template..."
    cat > .env << EOF
REACT_APP_BASE_URL=http://localhost:4000/api/v1
EOF
    print_status "Created frontend .env template"
fi

if [ ! -f "Server/.env" ]; then
    print_warning "Backend .env file not found. Creating template..."
    cat > Server/.env << EOF
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=LearnifyDF
EOF
    print_status "Created backend .env template"
    print_warning "Please update the backend .env file with your actual credentials"
fi

# Build frontend for production
print_status "Building frontend for production..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Failed to build frontend"
    exit 1
fi

print_status "Frontend build completed successfully"

# Test backend
print_status "Testing backend connection..."
cd Server
timeout 10s node Index.js &
SERVER_PID=$!

sleep 5

if kill -0 $SERVER_PID 2>/dev/null; then
    print_status "Backend server started successfully"
    kill $SERVER_PID
else
    print_error "Backend server failed to start"
    exit 1
fi

cd ..

echo ""
print_status "🎉 Deployment preparation completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update environment variables in both .env files"
echo "2. Deploy the 'build' folder to your frontend hosting service (Vercel, Netlify, etc.)"
echo "3. Deploy the 'Server' folder to your backend hosting service (Render, Railway, etc.)"
echo "4. Update REACT_APP_BASE_URL in frontend .env to point to your deployed backend"
echo ""
echo "For local development, run: npm run dev"
echo ""
