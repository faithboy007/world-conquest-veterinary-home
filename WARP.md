# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

World Conquest Veterinary Home is a modern, award-winning veterinary website built with **pure HTML, CSS, and JavaScript** (no frameworks or build tools). The project emphasizes advanced CSS animations, parallax scrolling, and interactive user experiences.

## Development Commands

### Running the Development Server

Use the npm script which tries multiple server options:
```bash
npm start
```

Alternatively, use any of these directly:
```bash
# Python HTTP server
python -m http.server 8000

# PHP built-in server
php -S localhost:8000

# Node.js http-server
npx http-server -p 8000
```

Then visit `http://localhost:8000` in your browser.

### Direct File Access

You can also open `index.html` directly in a browser (no server required for basic functionality).

## Architecture & Structure

### File Organization

- **index.html** - Single-page application with all HTML content
- **css/styles.css** - All styling, animations, and responsive design
- **js/script.js** - All interactive features and animations
- **images/** - Image assets directory (currently using emoji placeholders)

### CSS Architecture

The stylesheet uses a **modular section-based approach**:

1. **CSS Custom Properties (`:root`)** - Centralized theming
   - Color palette (primary: `#2563eb`, secondary: `#10b981`, accent: `#f59e0b`)
   - Gradient definitions for consistent visual effects
   - Typography system (Poppins & Playfair Display)
   - Transition presets (`--transition-smooth`, `--transition-bounce`)

2. **Section Organization** - Clearly delimited with comment headers:
   ```css
   /* ================================
      Section Name
      ================================ */
   ```

3. **Responsive Design** - Mobile-first with breakpoints:
   - Desktop: 1024px+
   - Tablet: 768px-1023px
   - Mobile: <768px
   - Small Mobile: <480px

### JavaScript Architecture

Script.js is organized into **independent feature modules** with clear comment separators:

- **Smooth Scrolling** - Anchor link navigation
- **Navbar Effects** - Scroll-based navbar styling and mobile menu toggle
- **Parallax Scrolling** - Multi-layer parallax effects with `translateY` transforms
- **Intersection Observer** - Scroll-triggered animations (fade-in, slide-in)
- **Counter Animation** - Animated statistics with `requestAnimationFrame`
- **Service Cards** - Ripple hover effects
- **Contact Form** - Client-side validation and simulated submission
- **Notification System** - Toast notifications with dynamic styling
- **Custom Cursor** - Optional cursor tracking (disabled by default)

### Key Animation Patterns

1. **Fade-in Animations** - Using Intersection Observer API
   - Add classes: `.fade-in`, `.fade-in-up`, `.fade-in-left`, `.fade-in-right`
   - Add `.visible` class when element enters viewport
   - Use `.delay-1`, `.delay-2` for staggered animations

2. **Parallax Effects** - Applied to `.parallax-layer` elements
   - Speed factor of 0.5 for background movement
   - Hero content fades out as user scrolls

3. **Counter Animation** - For statistics
   - Uses `data-target` attribute on `.stat-number` elements
   - Animates from 0 to target over 2 seconds

4. **3D Tilt Effects** - On testimonial cards
   - Mouse position drives `rotateX` and `rotateY` transforms
   - Uses `perspective(1000px)` for 3D space

## Working with Styles

### Adding New Colors

Update CSS variables in `:root`:
```css
:root {
    --your-color: #hexvalue;
}
```

### Creating New Sections

Follow the established pattern:
1. Add HTML section with `.section-padding` class
2. Include `.section-header` with subtitle and title
3. Add fade-in classes (`.fade-in`, `.fade-in-up`, etc.)
4. Create corresponding CSS with section header comment
5. Observe new animated elements in JavaScript if needed

### Responsive Design

Always test changes at all breakpoints. Media queries are at the bottom of styles.css in this order:
- Tablet styles (max-width: 1024px)
- Mobile styles (max-width: 768px)
- Small mobile styles (max-width: 480px)

## Working with JavaScript

### Adding New Animations

Use the Intersection Observer pattern:
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

observer.observe(yourElement);
```

### Form Handling

Forms use:
- `FormData` API for data extraction
- Email regex validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `showNotification()` function for user feedback
- Simulated async submission with `setTimeout`

### Custom Cursor

To enable the custom cursor effect, uncomment line 429 in script.js:
```javascript
initCustomCursor();
```

## Important Implementation Details

### No Build Process

This project has no build step, bundler, or transpilation. All code runs directly in the browser:
- Use ES6+ features supported in modern browsers
- No JSX, TypeScript, or preprocessors
- CSS is vanilla (no SASS/LESS)

### Performance Optimizations

- Animations use CSS `transform` and `opacity` (GPU-accelerated)
- Intersection Observer used instead of scroll event listeners where possible
- Event delegation for repetitive interactive elements
- Efficient DOM manipulation (create element once, modify properties)

### Browser Compatibility

Target modern browsers (latest Chrome, Firefox, Safari, Edge, Opera). The codebase relies on:
- Intersection Observer API
- CSS Custom Properties
- ES6+ JavaScript (arrow functions, template literals, etc.)
- Flexbox and CSS Grid

### Form Backend Integration

Contact form currently uses simulated submission. To integrate with a real backend:
1. Locate the form submission handler in script.js (line ~178-214)
2. Replace the `setTimeout` simulation with an actual `fetch()` call
3. Handle real API responses and errors

## Content Updates

### Services

Services are defined as `.service-card` elements in the Services Section. Each card includes:
- Service icon (emoji)
- Title (h3)
- Description (p)
- Learn More link

### Team Members

Team cards are in the Team Section. Update the HTML to modify:
- Team member placeholder emoji
- Name, role, and bio
- Add real images by replacing `.team-placeholder` divs

### Testimonials

Located in the Testimonials Section. Each includes:
- Star rating
- Testimonial text
- Author name and subtitle

## Dependencies

### External Dependencies

- **Google Fonts**: Poppins (300, 400, 600, 700) & Playfair Display (700)
- No JavaScript libraries or frameworks

### Browser APIs Used

- Intersection Observer API
- FormData API
- requestAnimationFrame
