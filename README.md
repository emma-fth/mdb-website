# MDB Website

A modern, responsive website for MDB, UC Berkeley's community for building software and AI systems, showcasing our members, projects, and training programs.

## ✨ Features

- **Mobile-first responsive design** with iPad/tablet optimizations
- **Performance optimized** with Next.js 14, image optimization, and bundle analysis
- **Clean architecture** with centralized types, constants, and reusable hooks
- **Modern UI/UX** with glassmorphism effects, smooth animations, and touch-friendly interactions
- **Comprehensive testing** with Jest, Playwright, and MSW
- **Accessibility focused** with semantic HTML and ARIA support

## 🚀 Performance Optimizations

- **Code Organization**: Moved hardcoded data to separate constants files
- **Next.js Enhancements**: Image optimization (WebP/AVIF), compression, caching
- **DRY Improvements**: Created reusable `MemberSection` component and enhanced `useIntersectionObserver` hook
- **Animation Utilities**: Centralized common animation classes in CSS
- **Bundle Analysis**: Integrated `@next/bundle-analyzer` for performance monitoring

## 🏗️ Project Structure

```
mdb-website-1/
├── src/
│   └── app/
│       ├── components/                    # General components
│       │   ├── __tests__/                # Component tests
│       │   │   ├── Footer.test.tsx
│       │   │   └── Header.test.tsx
│       │   ├── sections/                 # Home page specific sections
│       │   │   ├── Destinations.tsx
│       │   │   ├── MemberSection.tsx     # NEW: Reusable member display component
│       │   │   ├── PurpAndComm.tsx
│       │   │   └── TitleSection.tsx
│       │   ├── Carousel.tsx
│       │   ├── Footer.tsx
│       │   ├── Header.tsx
│       │   ├── MemberDB.tsx
│       │   └── OptimizedImage.tsx
│       ├── about/
│       │   ├── components/               # About page specific components
│       │   │   ├── AboutCarousel.tsx
│       │   │   ├── AboutUs.tsx
│       │   │   ├── Exec.tsx             # Updated: Now uses MemberSection
│       │   │   ├── Members.tsx          # Updated: Now uses MemberSection
│       │   │   └── ProjectManagers.tsx  # Updated: Now uses MemberSection
│       │   └── page.tsx
│       ├── projects/
│       │   ├── components/               # Projects page specific components
│       │   │   ├── Clients.tsx
│       │   │   ├── ProjectCarousel.tsx
│       │   │   ├── ProjectClients.tsx   # Updated: Uses new animation utilities
│       │   │   └── ProjectHeader.tsx
│       │   └── page.tsx
│       ├── training-program/
│       │   ├── components/               # Training program specific components
│       │   │   ├── TrainingCurriculum.tsx
│       │   │   ├── TrainingHeader.tsx
│       │   │   ├── TrainingStaff.tsx    # Fixed: Correct import paths
│       │   │   └── TrainingTools.tsx
│       │   └── page.tsx
│       ├── apply/
│       │   ├── components/               # Apply page specific components
│       │   │   ├── Calendly.tsx
│       │   │   └── Flyer.tsx
│       │   └── page.tsx
│       ├── contact/
│       │   └── page.tsx                  # Contact page (no components folder needed)
│       ├── constants/                    # Centralized data constants
│       │   ├── exec.ts                   # Executive members data
│       │   ├── members.ts                # General members data
│       │   ├── projectManagers.ts        # Project managers data
│       │   └── projects.ts               # Client projects data
│       ├── types/                        # Centralized type definitions
│       │   └── members.ts                # Member interface definitions
│       ├── hooks/                        # Custom React hooks
│       │   └── useIntersectionObserver.ts # Enhanced: Multiple element support
│       ├── globals.css                   # Updated: New animation utilities
│       ├── layout.tsx
│       └── page.tsx
├── tests/
│   └── e2e/                             # End-to-end tests
│       ├── home.spec.ts
│       └── navigation.spec.ts
├── utils/
│   └── test-utils.tsx                   # Testing utilities
├── .eslintrc.json                        # ESLint configuration
├── .gitignore                            # Git ignore rules
├── jest.config.js                        # Jest configuration
├── jest.setup.js                         # Jest setup
├── LICENSE                               # MIT License
├── next-env.d.ts                        # Next.js TypeScript definitions
├── next.config.js                        # Updated: Performance optimizations
├── package.json                          # Updated: New scripts and dependencies
├── package-lock.json                     # Dependency lock file
├── playwright.config.ts                  # Playwright configuration
├── postcss.config.js                     # PostCSS configuration
├── tailwind.config.js                    # Tailwind CSS configuration
├── tsconfig.json                         # TypeScript configuration
├── tsconfig.test.json                    # TypeScript test configuration
└── TESTING.md                            # Testing documentation
```

## 🎯 DRY Improvements Implemented

### **1. MemberSection Component**
- **Created**: Reusable component for displaying member grids
- **Replaces**: Duplicate code in `Exec.tsx`, `Members.tsx`, and `ProjectManagers.tsx`
- **Benefits**: 42 lines of code eliminated, consistent styling, easy maintenance

### **2. Enhanced Intersection Observer Hook**
- **Enhanced**: `useIntersectionObserver` with `useMultipleIntersectionObserver`
- **Features**: Multiple element support, different thresholds per element
- **Benefits**: Eliminates duplicate observer logic across components

### **3. Animation Utility Classes**
- **Added**: Common fade-up animation classes in `globals.css`
- **Classes**: `.animate-fade-up`, `.animate-fade-up-enter`, `.animate-fade-up-visible`
- **Benefits**: Consistent animations, reduced CSS duplication

## 🛠️ Available Scripts

### **Development**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Performance Monitoring**
- `npm run analyze` - Analyze bundle size
- `npm run build:analyze` - Build and analyze bundle
- `npm run lighthouse` - Run Lighthouse performance audit

### **Testing**
- `npm run test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run test:e2e:ui` - Run Playwright tests with UI
- `npm run test:e2e:headed` - Run Playwright tests in headed mode
- `npm run test:all` - Run all tests (unit + e2e)

## 🎨 Design System & Responsiveness

### **Mobile-First Approach**
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Touch-friendly interactions with `touch-scroll` utilities
- Optimized spacing and typography for mobile devices

### **Dual Layout System**
- **Mobile/Tablet**: Stacked, wide card layouts for better readability
- **Desktop**: Grid-based layouts for optimal space utilization
- **iPad/Tablet**: Specific optimizations for medium screen sizes

### **Animation System**
- Intersection Observer-based fade-in animations
- Smooth transitions with configurable delays
- Performance-optimized using `requestAnimationFrame`

## ⚡ Performance Optimizations

### **Code Organization**
- Centralized data management in constants files
- Reusable components and hooks
- Type-safe interfaces for better development experience

### **Next.js Optimizations**
- Image format optimization (WebP/AVIF)
- Device-specific image sizing
- Gzip compression enabled
- Enhanced caching headers for static assets

### **Mobile Performance**
- Optimized Intersection Observer thresholds
- Reduced animation complexity on mobile
- Touch-friendly scrolling implementations

## 🧪 Testing Strategy

### **Unit Tests (Jest)**
- Component testing with React Testing Library
- Mock Service Worker (MSW) for API mocking
- Coverage reporting and watch mode
- Test utilities for common testing patterns

### **End-to-End Tests (Playwright)**
- Cross-browser testing support
- Multiple execution modes (headless, headed, UI)
- Navigation and user interaction testing
- Performance and accessibility validation

## 📱 Mobile Optimizations

### **Touch Interactions**
- Custom scrollbar hiding with `scrollbar-hide` class
- Touch-friendly scrolling with `touch-scroll` class
- Optimized button sizes and spacing for mobile

### **Responsive Design**
- Fluid typography using `clamp()` functions
- Adaptive grid layouts for different screen sizes
- Mobile-specific spacing and padding adjustments

## 🔧 Adding New Data

### **Members/Executives/Projects**
1. Add data to appropriate constants file (`exec.ts`, `members.ts`, `projectManagers.ts`, `projects.ts`)
2. Use existing `MemberSection` component for member displays
3. Follow established interface patterns in `types/members.ts`

### **New Components**
1. Place route-specific components in `src/app/[route]/components/`
2. Place general components in `src/app/components/`
3. Use existing hooks and utilities for consistency

## 🎯 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom utilities
- **Language**: TypeScript for type safety
- **Testing**: Jest + React Testing Library, Playwright
- **Performance**: Next.js Image optimization, bundle analysis
- **Animation**: Intersection Observer API, CSS transitions

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev`
3. **Run tests**: `npm run test:all`
4. **Build for production**: `npm run build`

## 📈 Performance Monitoring

- Use `npm run analyze` to identify bundle size issues
- Run `npm run lighthouse` for comprehensive performance metrics
- Monitor Core Web Vitals in development tools
- Test on various devices and network conditions

---

**MDB Website** - Built with modern web technologies and performance best practices.
