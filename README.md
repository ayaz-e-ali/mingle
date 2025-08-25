# Mingle - Social Media Platform

A modern, full-stack social media application built with Next.js, featuring real-time interactions, media sharing, and user discovery.

## 🚀 Features

- **User Authentication** - Secure login/registration with NextAuth.js
- **Social Interactions** - Follow/unfollow users, like posts and comments
- **Content Creation** - Create posts with text and multiple images
- **Media Sharing** - Upload and display images with carousel support
- **Infinite Scroll** - Seamless content browsing with automatic loading
- **Responsive Design** - Mobile-first approach with desktop optimization
- **Dark/Light Theme** - Theme toggle functionality
- **User Discovery** - Find and connect with other users
- **Real-time Updates** - Dynamic content updates without page refresh

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mingle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - NextAuth.js secret
   - `NEXTAUTH_URL` - Application URL
   
4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
mingle/
├── app/                    # Next.js App Router pages
│   ├── (root)/            # Main application routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── cards/             # Post and user cards
│   ├── forms/             # Form components
│   ├── nav/               # Navigation components
│   ├── sections/          # Page sections
│   ├── skeleton/          # Loading skeletons
│   └── ui/                # Reusable UI components
├── actions/               # Server actions
├── prisma/                # Database schema and migrations
├── utils/                 # Utility functions
└── public/                # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Key Features

### User Management
- Registration and login with email/password
- Profile customization (bio, location, avatar)
- Onboarding flow for new users
- Public profile pages

### Content Creation
- Text-based posts with rich content
- Multiple image uploads (up to 4 per post)
- Image carousel with navigation
- "Show more" functionality for long posts

### Social Features
- Follow/unfollow system
- Like posts and comments
- Comment on posts
- User search and discovery

### User Experience
- Infinite scroll feed
- Responsive design for all devices
- Dark/light theme toggle
- Loading states and skeleton screens
- Bottom navigation for mobile

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Mingle** - Connect, Share, Discover
