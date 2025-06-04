# ArtiFlare

A modern e-commerce platform connecting artisans with customers seeking handcrafted, personalized gifts. Built with React, TypeScript, and Firebase.

<p align="center">
  <img src="src/assets/images/logo.png" alt="ArtiFlare" width="300">
</p>

## ✨ Overview

ArtiFlare is a comprehensive e-commerce solution that enables artisans to showcase and sell their handcrafted products while providing customers with a seamless shopping experience for unique, personalized gifts. The platform features occasion-based browsing, SOS delivery for last-minute shoppers, and real-time order tracking.

## 🌟 Key Features

- **Multi-platform Support**: Responsive design for web and mobile devices
- **User Role Management**:
  - **Customers**: Browse products, place orders, track deliveries
  - **Artisans**: Manage shop, list products, fulfill orders
  - **Administrators**: Oversee platform operations, manage users
- **Smart Cart System**:
  - Dynamic quantity management
  - Real-time cart updates
  - Persistent cart state across sessions
  - Automatic item removal when quantity reaches zero
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
  - Headless UI for accessible components
- **Routing**: React Router v6
- **State Management**: React Context API
- **Backend & Database**: Firebase (Authentication, Firestore, Storage)
- **Payment Processing**: Stripe API integration
- **Form Handling**: React Hook Form with Zod validation
- **Local Storage**: For persistent cart state

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
- Firebase account with a project set up

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/HardeepIjardar/artiflare.git
   cd artiflare
   ```

2. Install dependencies
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication, Firestore Database, and Storage
   - Set up Firestore security rules (see `firestore.rules` in the project)
   - Get your Firebase configuration from Project Settings

4. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

5. Initialize Firestore:
   ```bash
   npm run setup
   ```
   This will create the necessary collections and indexes in your Firestore database.

6. Start the development server
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

7. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser

## 📁 Project Structure

```
src/
├── assets/       # Static assets (images, icons, fonts)
├── components/   # Reusable UI components
├── contexts/     # React contexts for state management
│   ├── AuthContext.tsx    # Authentication state
│   ├── CartContext.tsx    # Shopping cart state
│   └── ...
├── data/         # Static data and mock data
├── hooks/        # Custom React hooks
├── layouts/      # Page layout components
│   ├── AdminLayout
│   ├── ArtisanLayout
│   └── MainLayout
├── pages/        # Page components
│   ├── admin/    # Admin dashboard pages
│   ├── artisan/  # Artisan dashboard pages
│   └── customer/ # Customer-facing pages
│       ├── ProductsPage.tsx      # Browse all products
│       ├── ProductDetailPage.tsx # Individual product view
│       ├── CartPage.tsx         # Shopping cart
│       └── ...
├── services/     # API and third-party service integrations
│   ├── firebase.ts    # Firebase configuration
│   ├── firestore.ts   # Firestore operations
│   └── ...
├── utils/        # Utility functions and helpers
└── App.tsx       # Main application component
```

## 🔥 Firebase Configuration

### Authentication
- Email/Password authentication
- Google Sign-in
- Facebook Sign-in
- Phone number authentication

### Firestore Database
Collections:
- `users`: User profiles and authentication data
- `products`: Product listings and details
- `orders`: Customer orders and tracking
- `reviews`: Product reviews and ratings
- `categories`: Product categories and subcategories
- `carts`: Shopping cart data
- `notifications`: User notifications

### Security Rules
The project includes comprehensive security rules in `firestore.rules` that:
- Allow public read access to products
- Restrict product creation to artisans and admins
- Allow users to manage their own data
- Enable admins to manage all data

## 📱 User Interfaces

- **Customer Experience**:
  - Browse products by category or occasion
  - Smart cart system with dynamic quantity management
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

The application is deployed at [artiflare.hardeepijardar.com](https://artiflare.hardeepijardar.com).

### Deployment Steps
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your hosting provider (e.g., Vercel, Netlify, or Firebase Hosting)

3. Configure environment variables in your hosting platform

4. Set up custom domain (if applicable)

## 🐛 Troubleshooting

### Common Issues
1. **Firebase Connection Issues**
   - Verify Firebase configuration in `.env`
   - Check Firebase project settings
   - Ensure proper security rules are in place

2. **Product Loading Issues**
   - Check Firestore database for product data
   - Verify collection structure matches the schema
   - Check browser console for error messages

3. **Authentication Problems**
   - Verify authentication methods are enabled in Firebase Console
   - Check browser console for authentication errors
   - Ensure proper error handling in AuthContext

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [HardeepIjardar](https://github.com/HardeepIjardar)

## 📧 Contact

For questions or support, please contact [hardeepijardar@gmail.com](mailto:hardeepijardar@gmail.com) or open an issue on GitHub.

## Product Card Consistency

All product listings across the project now use a reusable `ProductCard` component (`src/components/ProductCard.tsx`).

- The product card displays the product image, name, and the artisan's shop/company name (after 'by') below the product name.
- It includes an Add to Cart button and quantity selector.
- To use the product card, import and render `<ProductCard />` with the required props (see the component for details).

This ensures a consistent look and feel for all product displays throughout the application.

---
