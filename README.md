# 🛒 MarketCart Platform

A modern, full-stack e-commerce platform built with Next.js, Express.js, and PostgreSQL. Features a beautiful, responsive design inspired by Amazon and Flipkart with advanced product management and user-friendly interface.

## 🌟 Features

### Frontend (Next.js)
- **Modern UI/UX**: Professional design with Flipkart/Amazon-inspired interface
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Interactive Product Cards**: Hover effects, ratings, and quick actions
- **Advanced Search & Filtering**: Real-time search with price range filters
- **Shopping Cart**: Add to cart functionality with item counts
- **User Authentication**: Sign in/up with account management
- **Newsletter Subscription**: Email signup for promotions
- **Loading States**: Professional skeleton loading animations
- **Trust Indicators**: Product ratings, verification badges, and reviews

### Backend (Express.js)
- **RESTful API**: Clean, well-structured API endpoints
- **Database Integration**: PostgreSQL with Prisma ORM
- **Product Management**: CRUD operations for products
- **Data Validation**: Zod schema validation
- **CORS Support**: Cross-origin resource sharing
- **TypeScript**: Full type safety throughout the application
- **Health Checks**: API health monitoring endpoints

## 🏗️ Project Structure

```
marketcart-platform-monorepo/
├── services/
│   ├── frontend/                 # Next.js Frontend Application
│   │   ├── src/
│   │   │   ├── app/             # App Router (Next.js 13+)
│   │   │   │   ├── globals.css  # Global styles with Tailwind CSS
│   │   │   │   ├── layout.tsx   # Root layout component
│   │   │   │   └── page.tsx     # Home page component
│   │   │   ├── components/      # Reusable React components
│   │   │   │   ├── Header.tsx   # Navigation header
│   │   │   │   └── ProductCard.tsx # Product display card
│   │   │   └── types/           # TypeScript type definitions
│   │   │       └── product.ts   # Product interface
│   │   ├── public/              # Static assets
│   │   ├── tailwind.config.js   # Tailwind CSS configuration
│   │   ├── postcss.config.mjs   # PostCSS configuration
│   │   ├── next.config.ts       # Next.js configuration
│   │   └── package.json         # Frontend dependencies
│   └── backend/                 # Express.js Backend API
│       ├── src/
│       │   ├── routes/          # API route handlers
│       │   │   ├── index.ts     # Main router
│       │   │   └── products/    # Product-related routes
│       │   │       ├── controller.ts # Route controllers
│       │   │       ├── service.ts    # Business logic
│       │   │       ├── dal.ts        # Data access layer
│       │   │       ├── functions.ts  # Utility functions
│       │   │       └── index.ts      # Product routes
│       │   ├── app.ts           # Express app configuration
│       │   └── index.ts         # Server entry point
│       ├── prisma/              # Database schema and migrations
│       │   └── schema.prisma    # Prisma schema definition
│       ├── tsconfig.json        # TypeScript configuration
│       └── package.json         # Backend dependencies
├── package.json                 # Root package.json
└── README.md                    # This file
```

## 🚀 Quick Start

### Option 1: Docker Setup (Recommended) 🐳

The easiest way to get started is using Docker. This will set up the entire platform with a single command.

#### Prerequisites
- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)
- **Make** (optional, for using Makefile commands)

#### One-Command Setup
```bash
# Clone the repository
git clone <repository-url>
cd marketcart-platform-monorepo

# Start everything with Docker (Development)
make setup
# OR
docker-compose -f docker-compose.dev.yml up --build -d
```

#### Available Docker Commands
```bash
# Development
make dev              # Start development environment
make dev-detached     # Start in background
make logs-dev         # View logs
make down-dev         # Stop development services

# Production
make prod             # Start production environment
make prod-detached    # Start in background
make logs             # View logs
make down             # Stop all services

# Database
make db-migrate       # Run migrations
make db-seed          # Seed database
make db-studio        # Open Prisma Studio

# Cleanup
make clean            # Remove all containers and volumes
make status           # Check service status
```

#### Services URLs (Docker)
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Database**: localhost:5432
- **Redis**: localhost:6379

### Option 2: Manual Setup

#### Prerequisites

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

#### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketcart-platform-monorepo
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd services/frontend
   npm install
   ```

4. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

#### Database Setup

1. **Create a PostgreSQL database**
   ```sql
   CREATE DATABASE marketcart;
   ```

2. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/marketcart"
   PORT=4000
   JWT_SECRET="your-jwt-secret-key"
   ```

3. **Run database migrations**
   ```bash
   cd services/backend
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Seed the database (optional)**
   ```bash
   npm run prisma:seed
   ```

#### Running the Application

##### Development Mode

1. **Start the backend server**
   ```bash
   cd services/backend
   npm run dev
   ```
   Backend will be available at: `http://localhost:4000`

2. **Start the frontend development server**
   ```bash
   cd services/frontend
   npm run dev
   ```
   Frontend will be available at: `http://localhost:3000`

##### Production Mode

1. **Build the backend**
   ```bash
   cd services/backend
   npm run build
   npm start
   ```

2. **Build the frontend**
   ```bash
   cd services/frontend
   npm run build
   npm start
   ```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with inline styles
- **Font**: Inter (Google Fonts)
- **Icons**: SVG icons
- **State Management**: React hooks (useState, useEffect)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, CORS
- **Development**: ts-node-dev

## 📊 Database Schema

### Product Model
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  price       Float
  image       String?
  createdAt   DateTime @default(now())
}
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health Check
- `GET /api/health` - API health status

## 🎨 Design System

### Color Palette
- **Primary**: #ff6b35 (Orange)
- **Primary Dark**: #e55a2b
- **Secondary**: #232f3e (Dark Blue-Gray)
- **Accent**: #ffd700 (Gold)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Yellow)
- **Error**: #ef4444 (Red)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, large sizes (2rem - 3.5rem)
- **Body Text**: Regular weight, readable sizes
- **Small Text**: 12px - 14px for captions

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Primary (orange), Secondary (outline), Hover effects
- **Inputs**: Rounded borders, focus states
- **Grid**: Responsive (1-5 columns based on screen size)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Small**: 640px - 768px (2 columns)
- **Medium**: 768px - 1024px (3 columns)
- **Large**: 1024px - 1280px (4 columns)
- **Extra Large**: > 1280px (5 columns)

## 🔧 Configuration Files

### Frontend Configuration

#### `tailwind.config.js`
```javascript
import { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* Orange color palette */ },
        secondary: { /* Blue-gray color palette */ },
        accent: { /* Gold color palette */ }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
```

#### `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options */
};

export default nextConfig;
```

### Backend Configuration

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository to Vercel or Netlify
2. Set build command: `npm run build`
3. Set output directory: `out` (for static export)
4. Deploy automatically on push to main branch

### Backend (Railway/Heroku/DigitalOcean)
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy using platform-specific deployment methods
4. Run database migrations in production

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE=http://localhost:4000/api
```

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/marketcart"
PORT=4000
JWT_SECRET="your-super-secret-jwt-key"
NODE_ENV=production
```

## 🧪 Development Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed database with sample data
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic product listing
- ✅ Search and filtering
- ✅ Responsive design
- ✅ Modern UI/UX

### Phase 2 (Planned)
- [ ] User authentication
- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Advanced search with filters

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Real-time chat support
- [ ] Advanced analytics
- [ ] Multi-vendor support
- [ ] Internationalization
- [ ] PWA features

---

**Built with ❤️ by the MarketCart Team**