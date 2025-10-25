# Cine Chain

A modern cinema management application built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Data Fetching**: SWR
- **Mocking**: MSW (Mock Service Worker)
- **Icons**: Lucide React
- **Maps**: React Map GL / MapLibre GL
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   └── Button/         # Example component with CSS Modules
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── mocks/              # MSW mock handlers
├── data/               # Type definitions and sample data
└── styles/             # Global styles and CSS files
```

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Features

- **CSS Modules**: Scoped styling for components
- **Framer Motion**: Smooth animations and transitions
- **SWR**: Efficient data fetching with caching
- **MSW**: API mocking for development
- **TypeScript**: Full type safety
- **ESLint + Prettier**: Code quality and formatting

## 🧩 Components

### Button Component
A reusable button component with multiple variants:
- `primary` - Blue primary button
- `secondary` - Gray secondary button  
- `danger` - Red danger button

### Custom Hooks
- `useData<T>(url)` - SWR-based data fetching
- `useAPI<T>(endpoint)` - API endpoint data fetching

## 🗺️ Maps Integration

The project includes React Map GL and MapLibre GL for interactive maps. Sample location data is provided in `src/data/sampleData.ts`.

## 📊 Charts Integration

Recharts is configured for data visualization. Sample chart data is available in the data directory.

## 🔧 Configuration

- **ESLint**: Configured with Next.js rules and Prettier integration
- **Prettier**: Code formatting with consistent style
- **TypeScript**: Strict type checking enabled
- **CSS Modules**: Automatic CSS class name generation

## 📦 Dependencies

### Production
- `next` - React framework
- `react` & `react-dom` - UI library
- `framer-motion` - Animation library
- `recharts` - Chart library
- `swr` - Data fetching
- `msw` - API mocking
- `lucide-react` - Icon library
- `react-map-gl` - Map components
- `maplibre-gl` - Map rendering

### Development
- `typescript` - Type checking
- `eslint` - Code linting
- `prettier` - Code formatting
- `clsx` - Utility for conditional classes

## 🚀 Deployment

The project is ready for deployment on Vercel, Netlify, or any platform that supports Next.js applications.

```bash
npm run build
npm run start
```

## 📄 License

This project is licensed under the MIT License.