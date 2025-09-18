🏡 Destiny Real Estate Platform

A full-stack real estate platform where users can rent, lease, or construct homes. The project includes authentication, property management, admin features, and a modern UI for browsing and managing listings.

Deployed URL : https://destiny-real-estate-platform.vercel.app[https://destiny-real-estate-platform.vercel.app]

📑 Table of Contents

About

Features

Tech Stack

Project Structure

Installation

Environment Variables

Available Scripts

Deployment

Screenshots

Future Improvements

License

📖 About

Destiny Real Estate Platform is designed to connect property owners, tenants, and builders.
Users can:

Rent homes

Put homes up for rent

Manage property construction requests
Admins can manage listings, users, and approvals.

✨ Features

✅ User authentication (JWT / Passport / NextAuth)
✅ Role-based access (User / Admin)
✅ Add, update, delete property listings
✅ Rent / lease management
✅ Image upload for properties
✅ Responsive design for desktop & mobile
✅ API-driven backend with REST endpoints
✅ MongoDB/SQL database integration

🛠️ Tech Stack
Frontend

React / Next.js – UI framework

Tailwind CSS – Styling

Axios / Fetch API – API calls

React Router / Next Router – Navigation

State Management – Context API / Redux (if used)

Backend

Node.js – Runtime

Express.js – Web framework

MongoDB (Mongoose) / SQL – Database

JWT Authentication – Security

Multer / Cloudinary – File & image uploads

DevOps

Vercel – Frontend deployment

Render / Railway / Heroku / Mongo Atlas – Backend hosting

GitHub Actions – CI/CD (optional)

📂 Project Structure

Destiny-Real-Estate-Platform/
│
├── backend/
│   ├── server.js              # Entry point
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── routes/
│   │   ├── userRoutes.js      # User-related routes
│   │   ├── propertyRoutes.js  # Property CRUD routes
│   │   └── authRoutes.js      # Login / Signup
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Property.js        # Property schema
│   │   └── Booking.js         # Rent/Lease schema
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── propertyController.js
│   │   └── authController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT protection
│   │   └── errorHandler.js
│   └── utils/
│       └── upload.js          # File upload utils
│
├── frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI
│   │   ├── pages/             # Page routes (Next.js)
│   │   ├── context/           # State management
│   │   ├── services/          # API calls
│   │   ├── styles/            # Tailwind / CSS
│   │   └── App.js             # Root app
│   ├── package.json
│
├── .env.example               # Example environment variables
├── package.json               # Root dependencies
├── README.md
└── LICENSE
⚙️ Installation
Clone the repo
git clone https://github.com/MSC-0013/Destiny-Real-Estate-Platform.git
cd Destiny-Real-Estate-Platform

Install dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

🔑 Environment Variables

Create a .env file in the backend/ folder:PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url   # if using image uploads

🚀 Available Scripts
Backend

cd backend
npm run dev    # Start dev server with nodemon
npm start      # Start production server
Frontend


cd frontend
npm run dev    # Start frontend dev server
npm run build  # Build frontend for production
npm start      # Run production build

│🌐 Deployment

Frontend: deployed on Vercel

Backend: deploy on Render / Railway / Heroku

Database: MongoDB Atlas (cloud-hosted)

🖼️ Screenshots

(Add images of homepage, login, property listing, admin dashboard)

🚧 Future Improvements

Payment integration (Stripe, Razorpay)

Search & filter properties

Real-time chat between owner & tenant

Admin analytics dashboard

Mobile app version

📜 License

This project is licensed under the MIT License.