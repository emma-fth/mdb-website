# MDB Website - Multi-Page Next.js Application

A modern, responsive multi-page website built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router for modern routing
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling
- **Multi-page structure** with clean navigation
- **SEO optimized** with proper metadata
- **Mobile-first responsive design**

## 📁 Project Structure

```
src/
└── app/
    ├── layout.tsx      # Root layout with navigation & footer
    ├── page.tsx        # Landing page (/)
    ├── globals.css     # Global styles with Tailwind
    ├── about/
    │   └── page.tsx    # About page (/about)
    ├── services/
    │   └── page.tsx    # Services page (/services)
    └── contact/
        └── page.tsx    # Contact page (/contact)
```

## 🌐 Pages

1. **Home (/)** - Landing page with hero section and features
2. **About (/about)** - Company story, mission, and values
3. **Services (/services)** - Service offerings and packages
4. **Contact (/contact)** - Contact form and business information

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Adding New Pages

To add a new page (e.g., `/blog`):

1. Create directory: `src/app/blog/`
2. Add page file: `src/app/blog/page.tsx`
3. Export React component:
   ```tsx
   export default function Blog() {
     return (
       <div className="container mx-auto px-4 py-12">
         <h1 className="text-5xl font-bold mb-6">Blog</h1>
         {/* Your content */}
       </div>
     )
   }
   ```
4. Update navigation in `src/app/layout.tsx`

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 🚀 Deployment

Deploy easily on:
- **Vercel** (recommended)
- **Netlify** 
- **AWS**
- Any Node.js platform

For Vercel:
```bash
npm install -g vercel
vercel
```

## 📄 License

Licensed under the MIT License - see [LICENSE](LICENSE) file for details.
