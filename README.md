# UKK Ticketing App

A modern full-stack ticketing application built with Laravel and Next.js, featuring a robust backend API and an interactive frontend interface.

## 🚀 Tech Stack

### Backend (ukk-ticketing-app-be)
- **Framework**: Laravel 11.31
- **Language**: PHP 8.2+
- **Authentication**: JWT (tymon/jwt-auth)
- **Database**: Laravel Sanctum for API authentication
- **Additional Libraries**:
  - PHPSpreadsheet for Excel operations
  - Laravel Tinker for interactive shell

### Frontend (ticketing-app-ukk)
- **Framework**: Next.js 15.1.3
- **Language**: TypeScript
- **UI Library**: React 19.0
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Form Handling**: Formik with Yup validation
- **Animations**: Framer Motion
- **Additional Features**:
  - Radix UI components for accessibility
  - Date picker and calendar functionality
  - Barcode generation
  - Charts with Recharts
  - Smooth scrolling with Lenis
  - Lottie animations

## 📋 Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm or pnpm or yarn
- MySQL/PostgreSQL (or your preferred database)

## 🔧 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd ukk-ticketing-app-be
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure your database in `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Generate JWT secret:
```bash
php artisan jwt:secret
```

7. Run migrations:
```bash
php artisan migrate
```

8. (Optional) Seed the database:
```bash
php artisan db:seed
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ticketing-app-ukk
```

2. Install Node.js & pnpm dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API=http://localhost:8000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd ukk-ticketing-app-be
php artisan serve
```

The backend will run on `http://localhost:8000`

For development with queue workers and logs:
```bash
composer run dev
```

### Start Frontend Server

```bash
cd ticketing-app-ukk
pnpm run dev
```

The frontend will run on `http://localhost:3000`

## 📦 Building for Production

### Backend
```bash
cd ukk-ticketing-app-be
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend
```bash
cd ticketing-app-ukk
pnpm run build
pnpm start
```

## 🛠️ Development

### Backend Development
- **IDE Helper**: Laravel IDE Helper is included for better autocompletion
```bash
php artisan ide-helper:generate
```

- **Code Formatting**: Laravel Pint is configured
```bash
./vendor/bin/pint
```

### Frontend Development
- **Linting**:
```bash
pnpm run lint
```

- **Type Checking**: TypeScript is configured for type safety

## 📁 Project Structure

```
ukk-ticketing-app/
├── ticketing-app-ukk/          # Next.js Frontend
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   ├── public/                 # Static assets
│   └── package.json
│
└── ukk-ticketing-app-be/       # Laravel Backend
    ├── app/                    # Application logic
    ├── database/               # Migrations and seeders
    ├── routes/                 # API routes
    └── composer.json
```

## 🔑 Key Features

- JWT Authentication
- Ticket management system
- Real-time updates
- Barcode generation for tickets
- Interactive dashboard with charts
- Responsive design with dark mode support
- Form validation
- Excel export functionality

## 📝 License

This project is private and not licensed for public use.

## 👤 Author

**bhilbis || AoiXsy**

---

For issues or questions, please create an issue in the repository.
