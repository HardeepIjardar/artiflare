# Artisan Gift Express

A modern e-commerce platform connecting artisans with customers seeking handcrafted, personalized gifts. Built with React, TypeScript, and Firebase.

<p align="center">
  <img src="src/assets/images/logo.png" alt="Artisan Gift Express" width="300">
</p>

## ✨ Overview

Artisan Gift Express is a comprehensive e-commerce solution that enables artisans to showcase and sell their handcrafted products while providing customers with a seamless shopping experience for unique, personalized gifts. The platform features occasion-based browsing, SOS delivery for last-minute shoppers, and real-time order tracking.

## 🌟 Key Features

- **Multi-platform Support**: Responsive design for web and mobile devices
- **User Role Management**:
  - **Customers**: Browse products, place orders, track deliveries
  - **Artisans**: Manage shop, list products, fulfill orders
  - **Administrators**: Oversee platform operations, manage users
- **Product Customization**: Personalize gifts with custom text, colors, and materials
- **SOS Delivery**: Expedited delivery options for urgent gift needs
- **Location Tracking**: Real-time map-based order tracking
- **Occasion-based Shopping**: Browse gifts by events (birthdays, anniversaries, holidays)
- **Featured Artisans**: Showcase talented craftspeople and their stories
- **Secure Payment Processing**: Integrated with Stripe for safe transactions

## 🛠️ Technology Stack

- **Frontend**: React.js with TypeScript
- **UI/Styling**: 
  - Tailwind CSS with custom color palette
  - Framer Motion for animations
- **Routing**: React Router v6
- **State Management**: React Context API
- **Backend & Database**: Firebase (Authentication, Firestore, Storage)
- **Payment Processing**: Stripe API integration
- **Form Handling**: React Hook Form with Zod validation

## 🎨 Design System

Custom branded color palette:
- **Primary** (Terracotta Red): For CTAs and primary actions
- **Secondary** (Sage Green): For accents and secondary elements
- **Neutral** (Beige): For backgrounds and neutral containers
- **Dark** (Dark Brown): For text and dark UI elements

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/[YOUR-USERNAME]/artisan-gift-express.git
   cd artisan-gift-express
   ```

2. Install dependencies
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_FIREBASE_API_KEY=[YOUR_FIREBASE_API_KEY]
   REACT_APP_FIREBASE_AUTH_DOMAIN=[YOUR_FIREBASE_AUTH_DOMAIN]
   REACT_APP_FIREBASE_PROJECT_ID=[YOUR_FIREBASE_PROJECT_ID]
   REACT_APP_FIREBASE_STORAGE_BUCKET=[YOUR_FIREBASE_STORAGE_BUCKET]
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=[YOUR_FIREBASE_MESSAGING_SENDER_ID]
   REACT_APP_FIREBASE_APP_ID=[YOUR_FIREBASE_APP_ID]
   REACT_APP_STRIPE_PUBLIC_KEY=[YOUR_STRIPE_PUBLIC_KEY]
   ```

4. Start the development server
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser

## 📁 Project Structure

```
src/
├── assets/       # Static assets (images, icons, fonts)
├── components/   # Reusable UI components
├── contexts/     # React contexts for state management
├── hooks/        # Custom React hooks
├── layouts/      # Page layout components
│   ├── AdminLayout
│   ├── ArtisanLayout
│   └── MainLayout
├── pages/        # Page components
│   ├── admin/    # Admin dashboard pages
│   ├── artisan/  # Artisan dashboard pages
│   └── customer/ # Customer-facing pages
├── services/     # API and third-party service integrations
├── utils/        # Utility functions and helpers
└── App.tsx       # Main application component
```

## 📱 User Interfaces

- **Customer Experience**:
  - Browse products by category or occasion
  - Customize gifts with personalization options
  - Track orders in real-time on a map
  - Manage profile and order history

- **Artisan Dashboard**:
  - Manage product listings and inventory
  - Process and fulfill orders
  - Track sales and revenue analytics
  - Manage shop profile and settings

- **Admin Panel**:
  - User management and moderation
  - Platform analytics and reporting
  - Content moderation and quality control
  - System configuration and settings

## 🔄 Deployment

The application is deployed using [Vercel] and can be accessed at [PRODUCTION_URL].

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the [LICENSE_TYPE] License - see the LICENSE file for details.

## 👥 Contributors

- [HardeepIjardar] ([@YOUR_GITHUB_USERNAME](https://github.com/HardeepIjardar]))

## 📧 Contact

For questions or support, please contact [hardeepijardar@gmail.com] or open an issue on GitHub.

---
