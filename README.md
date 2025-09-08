# Voice Assistant

A full-stack voice assistant application built with React and Node.js that allows users to interact with a customizable AI assistant through voice commands.

## Features

- **Voice Recognition**: Real-time speech recognition for natural voice interactions
- **Text-to-Speech**: AI responses are spoken back to the user
- **Customizable Assistant**: Users can personalize their assistant with custom names and images
- **Multi-functional Commands**: Supports various commands including:
  - Web searches (Google, YouTube)
  - Opening applications (Calculator, Instagram, Facebook)
  - Date and time queries
  - Weather information
  - General Q&A
- **User Authentication**: Secure signup/signin with JWT tokens
- **Command History**: Track and view previous voice commands
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Web Speech API** - Voice recognition and synthesis
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Google Gemini AI** - AI responses
- **Multer** - File upload handling

## Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Google Gemini AI API key

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd voice-assistant
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## Running the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:3000`

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Customize Assistant**: Choose an avatar and name for your voice assistant
3. **Voice Interaction**: Start speaking commands that include your assistant's name
4. **Supported Commands**:
   - "Hey [Assistant Name], what time is it?"
   - "Hey [Assistant Name], search for cats on Google"
   - "Hey [Assistant Name], play music on YouTube"
   - "Hey [Assistant Name], open calculator"
   - "Hey [Assistant Name], what's the weather like?"

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### User Management
- `GET /api/user/current` - Get current user data
- `POST /api/user/update` - Update assistant settings
- `POST /api/user/asktoassistant` - Process voice commands

## Project Structure

```
voice-assistant/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── token.js
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   └── user.controllers.js
│   ├── middleware/
│   │   ├── isAuth.js
│   │   └── multer.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── gemini.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Card.jsx
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Customize.jsx
│   │   │   └── Customize2.jsx
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Browser Compatibility

This application uses the Web Speech API, which requires:
- Chrome/Chromium browsers (recommended)
- HTTPS connection for production
- Microphone permissions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Troubleshooting

### Common Issues

1. **Voice recognition not working**: Ensure you're using a supported browser and have granted microphone permissions
2. **500 errors**: Check that all environment variables are properly set
3. **Database connection issues**: Verify your MongoDB connection string
4. **Image upload failures**: Confirm Cloudinary credentials are correct

### Support

For support and questions, please open an issue in the repository.