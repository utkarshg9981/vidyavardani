# vidyavardani

A comprehensive online learning platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication and authorization
- Course creation and management
- Video lectures with progress tracking
- Payment integration with Razorpay
- Real-time notifications
- Dashboard for students and instructors
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React.js 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for media management
- Razorpay for payment processing
- Nodemailer for email services

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Razorpay account

### Frontend Setup
1. Navigate to the project root directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```
   REACT_APP_BASE_URL=http://localhost:4000/api/v1
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the Server directory:
   ```bash
   cd Server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the Server directory:
   ```
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
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Running Both Frontend and Backend Together

From the root directory, run:
```bash
npm run dev
```

This will start both the frontend and backend concurrently.

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your chosen platform

### Backend Deployment (Render/Railway/Heroku)
1. Push the Server directory to your chosen platform
2. Set environment variables in your deployment platform
3. Ensure your MongoDB database is accessible from the deployment platform

## Fixed Issues

- ✅ Fixed broken export statement in `src/Util/constants.js`
- ✅ Fixed mixed module systems in `src/Util/secToDuration.js`
- ✅ Fixed typo in `RAZORPAY_SECRET` environment variable
- ✅ Fixed typo in `FOLDER_NAME` environment variable
- ✅ Fixed inconsistent PORT configuration in server
- ✅ Removed unnecessary packages from frontend dependencies
- ✅ Fixed environment variable formatting
- ✅ Fixed package.json script path reference
- ✅ Fixed .gitignore to not ignore package.json
- ✅ Fixed database connection error message typo

## API Endpoints

### Auth Routes
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/sendotp` - Send OTP
- `POST /api/v1/auth/reset-password-token` - Reset password token
- `POST /api/v1/auth/reset-password` - Reset password

### Course Routes
- `GET /api/v1/course/getAllCourses` - Get all courses
- `GET /api/v1/course/getCourseDetails` - Get course details
- `POST /api/v1/course/createCourse` - Create new course
- `PUT /api/v1/course/editCourse` - Edit course

### Payment Routes
- `POST /api/v1/payment/capturePayment` - Capture payment
- `POST /api/v1/payment/verifyPayment` - Verify payment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
