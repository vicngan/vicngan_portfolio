# Victoria Nguyen - Portfolio Website

A matcha-themed personal portfolio website showcasing projects, skills, and experience in software engineering and healthcare technology.

## Features

- **Animated Splash Screen** - Matcha-themed landing page with teapot pouring animation, line-drawing stars, and progress bar
- **Dark/Light Mode** - Toggle between cozy light and rich dark green themes
- **Responsive Design** - Optimized for desktop and mobile viewing
- **Project Showcase** - Carousel display of projects with demo video modals
- **Interactive Elements** - Smooth scrolling, reveal animations, and parallax effects
- **Spotify Integration** - Embedded playlist for ambient vibes
- **Contact Form** - Direct messaging via FormSubmit

## Tech Stack

- HTML5 / CSS3 / JavaScript (ES6+)
- CSS Custom Properties for theming
- CSS Animations & Keyframes
- Intersection Observer API
- SVG graphics and animations

## Project Structure

```
vic.nguyen_website/
├── index.html          # Main HTML file
├── styles.css          # All styles including dark mode & splash screen
├── script.js           # Interactivity, animations, and splash screen logic
├── assets/
│   ├── icons/          # SVG icons
│   ├── stickers/       # Profile images and illustrations
│   └── demos/          # Demo videos for projects
└── README.md
```

## Sections

1. **Hero** - Introduction with animated matcha cup illustration
2. **About** - Background story and mission
3. **Skills** - Languages, Frameworks, Data & AI, Tools & Infrastructure
4. **Projects** - SynthLab, Heartline Care Companion, Heartline Smart Record, Blossom Drift Journal
5. **Experience** - Research and clinical work timeline
6. **Community** - Leadership and involvement
7. **Contact** - Form and social links

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Customization

- **Colors**: Edit CSS custom properties in `:root` and `[data-theme='dark']`
- **Splash Duration**: Modify `SPLASH_DURATION` in `script.js` (default: 4000ms)
- **Demo Videos**: Add videos to `assets/demos/` and update paths in HTML

## Author

**Victoria Nguyen**
Computer Science + Entrepreneurship @ University of Michigan

- [LinkedIn](https://www.linkedin.com/in/vicngan)
- [GitHub](https://github.com/vicngan)
- [Email](mailto:victoria.n.nguyen05@gmail.com)
