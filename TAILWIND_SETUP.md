# 🎨 Tailwind CSS Setup Guide with Dark Mode & 3D Animations

## 📦 Step 1: Install Dependencies

```bash
cd 4ducate_new

# Install Tailwind CSS and dependencies
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# Install Tailwind plugins
npm install -D @tailwindcss/forms @tailwindcss/typography

# Install required for theme icons (if not already installed)
npm install react-icons
```

## 🔧 Step 2: Files Already Created

✅ `tailwind.config.js` - Complete Tailwind configuration
✅ `postcss.config.js` - PostCSS configuration
✅ `src/styles/tailwind.css` - Custom Tailwind styles with 3D animations
✅ `src/contexts/ThemeContext.jsx` - Theme management context
✅ `src/components/ThemeToggle.jsx` - Theme toggle components

## 🚀 Step 3: Update main.jsx

Replace your `src/main.jsx` with:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './admin/AuthContext'
import './styles/tailwind.css' // Import Tailwind styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
```

## 🎨 Step 4: Update index.html

Add this to the `<head>` section of `index.html`:

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>4ducate - Learn & Grow</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body class="antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## 🌓 Step 5: Add Theme Toggle to Navbar

Update your `Navbar.jsx` to include the theme toggle:

```jsx
import { ThemeToggleCompact } from './ThemeToggle';

// In your navbar JSX, add:
<li>
  <ThemeToggleCompact />
</li>
```

## 🎭 Available Theme Components

### 1. **ThemeToggle** (Default - Large button)
```jsx
import ThemeToggle from './components/ThemeToggle';
<ThemeToggle />
```

### 2. **ThemeToggleCompact** (For navbar)
```jsx
import { ThemeToggleCompact } from './components/ThemeToggle';
<ThemeToggleCompact />
```

### 3. **ThemeToggleFloating** (Fixed bottom-right)
```jsx
import { ThemeToggleFloating } from './components/ThemeToggle';
<ThemeToggleFloating />
```

## 🎨 Using Tailwind Classes

### Basic Example
```jsx
<div className="bg-white dark:bg-dark-bg p-6 rounded-2xl shadow-card hover:shadow-card-hover">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
    Hello World
  </h1>
</div>
```

### 3D Card with Animation
```jsx
<div className="card card-3d animate-fade-in-up">
  <div className="p-6">
    <h2 className="text-xl font-bold gradient-text">
      3D Animated Card
    </h2>
  </div>
</div>
```

### Gradient Backgrounds
```jsx
<div className="bg-gradient-primary p-8 text-white rounded-2xl">
  <h1>Beautiful Gradient</h1>
</div>
```

### Animated Buttons
```jsx
<button className="btn-primary animate-pulse-slow">
  Click Me
</button>

<button className="btn-secondary shadow-glow hover:shadow-glow-lg">
  Glow Effect
</button>
```

## 🎭 Color Palette

### Light Mode Colors
- **Primary:** Blue shades (`primary-50` to `primary-950`)
- **Secondary:** Purple shades (`secondary-50` to `secondary-950`)
- **Accent:** Pink shades (`accent-50` to `accent-950`)
- **Success:** Green (`success-50` to `success-900`)
- **Warning:** Yellow/Orange (`warning-50` to `warning-900`)
- **Danger:** Red (`danger-50` to `danger-900`)

### Dark Mode Colors
- **Background:** `dark-bg` (#0f172a)
- **Card:** `dark-card` (#1e293b)
- **Border:** `dark-border` (#334155)
- **Text:** `dark-text` (#e2e8f0)
- **Muted:** `dark-muted` (#94a3b8)

### Usage
```jsx
<div className="bg-primary-500 dark:bg-dark-card">
  <p className="text-white dark:text-dark-text">
    Adapts to theme
  </p>
</div>
```

## ✨ Animations Available

### Floating Animations
```jsx
<div className="animate-float">Floats up and down</div>
<div className="animate-float-slow">Slower float</div>
<div className="animate-float-fast">Faster float</div>
```

### Fade Animations
```jsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-fade-in-up">Fade in from bottom</div>
<div className="animate-fade-in-down">Fade in from top</div>
```

### Slide Animations
```jsx
<div className="animate-slide-in-left">Slide from left</div>
<div className="animate-slide-in-right">Slide from right</div>
```

### Scale & Rotate
```jsx
<div className="animate-scale-in">Scale in</div>
<div className="animate-rotate-in">Rotate in</div>
```

### Special Effects
```jsx
<div className="animate-wiggle">Wiggle effect</div>
<div className="animate-glow">Glow pulse</div>
<div className="animate-gradient gradient-animated">Animated gradient</div>
```

## 🎪 3D Effects

### 3D Transform
```jsx
<div className="transform-3d hover:rotate-y-180 transition-all duration-700">
  <div className="backface-hidden">
    Front
  </div>
  <div className="backface-hidden rotate-y-180">
    Back
  </div>
</div>
```

### Perspective
```jsx
<div className="perspective-1000">
  <div className="transform-3d hover:rotate-x-12">
    3D Card
  </div>
</div>
```

## 🎨 Gradient Backgrounds

### Pre-defined Gradients
```jsx
<div className="bg-gradient-primary">Primary gradient</div>
<div className="bg-gradient-secondary">Secondary gradient</div>
<div className="bg-gradient-success">Success gradient</div>
<div className="bg-gradient-purple">Purple gradient</div>
<div className="bg-gradient-warm">Warm gradient</div>
<div className="bg-gradient-cool">Cool gradient</div>
<div className="bg-gradient-dark">Dark gradient</div>
<div className="bg-mesh-gradient">Mesh gradient</div>
```

### Animated Gradient
```jsx
<div className="gradient-animated bg-[length:200%_200%] text-white p-8">
  Animated flowing gradient
</div>
```

## 🧩 Component Examples

### Card Component
```jsx
<div className="card p-6">
  <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4">
    Card Title
  </h3>
  <p className="text-gray-600 dark:text-dark-muted">
    Card content goes here
  </p>
</div>
```

### Glass Effect
```jsx
<div className="glass rounded-2xl p-8 backdrop-blur-xl">
  <h2 className="text-white font-bold">Glassmorphism</h2>
</div>
```

### Badge
```jsx
<span className="badge badge-primary">Primary</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-danger">Danger</span>
```

### Input
```jsx
<input 
  type="text" 
  className="input" 
  placeholder="Enter text..."
/>
```

## 🌟 Best Practices

### 1. Always provide dark mode variants
```jsx
// Good
<div className="bg-white dark:bg-dark-bg">

// Bad
<div className="bg-white">
```

### 2. Use semantic color names
```jsx
// Good
<button className="btn-primary">Submit</button>

// Bad  
<button className="bg-blue-500 px-4 py-2">Submit</button>
```

### 3. Combine animations thoughtfully
```jsx
// Good - Subtle and smooth
<div className="animate-fade-in-up hover:scale-105 transition-all">

// Bad - Too many animations
<div className="animate-bounce animate-spin animate-pulse">
```

### 4. Maintain consistent spacing
```jsx
// Use Tailwind's spacing scale
<div className="p-4 md:p-6 lg:p-8">
```

## 📱 Responsive Design

```jsx
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  Responsive content
</div>
```

## 🎬 Example Page

```jsx
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggleFloating } from '../components/ThemeToggle';

function ExamplePage() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Welcome to 4ducate
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
            Learn, Grow, and Excel with AI-powered education
          </p>
          <button className="btn-primary animate-fade-in-up animation-delay-400">
            Get Started
          </button>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-float-slow" />
      </section>

      {/* Cards Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card card-3d p-6 animate-fade-in-up">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl mb-4 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">
              Fast Learning
            </h3>
            <p className="text-gray-600 dark:text-dark-muted">
              Accelerate your skills with AI
            </p>
          </div>

          <div className="card card-3d p-6 animate-fade-in-up animation-delay-200">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl mb-4 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">
              Smart Insights
            </h3>
            <p className="text-gray-600 dark:text-dark-muted">
              Get personalized recommendations
            </p>
          </div>

          <div className="card card-3d p-6 animate-fade-in-up animation-delay-400">
            <div className="w-12 h-12 bg-gradient-success rounded-xl mb-4 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">
              Achievements
            </h3>
            <p className="text-gray-600 dark:text-dark-muted">
              Earn certificates and badges
            </p>
          </div>
        </div>
      </section>

      {/* Floating theme toggle */}
      <ThemeToggleFloating />
    </div>
  );
}

export default ExamplePage;
```

## 🔥 Advanced Features

### Custom Scrollbar
```jsx
<div className="custom-scrollbar overflow-y-auto h-96">
  Scrollable content
</div>
```

### Loading Skeleton
```jsx
<div className="skeleton h-8 w-full mb-4" />
<div className="skeleton h-32 w-full" />
```

### Shimmer Effect
```jsx
<div className="shimmer bg-gray-200 dark:bg-dark-card h-40 rounded-xl" />
```

## 🎯 Quick Reference

| Class | Description |
|-------|-------------|
| `card` | Standard card with hover effect |
| `card-3d` | 3D animated card |
| `btn-primary` | Primary gradient button |
| `btn-secondary` | Secondary gradient button |
| `btn-outline` | Outline button |
| `input` | Styled input field |
| `badge` | Small label badge |
| `glass` | Glassmorphism effect |
| `gradient-text` | Gradient text color |
| `shadow-glow` | Glowing shadow |
| `transform-3d` | Enable 3D transforms |

## 🚀 Next Steps

1. Run `npm install` to install all dependencies
2. Update `main.jsx` with ThemeProvider
3. Add theme toggle to your navbar
4. Start using Tailwind classes in components
5. Test dark/light mode switching

## 💡 Tips

- Use `dark:` prefix for dark mode styles
- Combine with existing animations
- Keep mobile-first approach
- Test on different screen sizes
- Use browser DevTools to experiment

---

**Happy Styling! 🎨**
