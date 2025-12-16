# DevForge - Coding Bootcamp Landing Page

A professional, developer-centric landing page for a high-end coding bootcamp. Designed with an "editorial + terminal" aesthetic, focusing on clarity and outcomes over marketing fluff.

## 🧱 Tech Stack

- **HTML5**: Semantic structure.
- **Tailwind CSS**: Utility-first styling (configured via `tailwind.config.js`).
- **Alpine.js**: Minimal JavaScript for interactions (Theme toggle, Component loading, Animations).

## 🚀 How to Run

Because this project uses **HTML Component Injection** (loading `navbar.html`, `footer.html`, etc. dynamically), you **MUST** serve the files using a local web server to avoid CORS (Cross-Origin Resource Sharing) errors.

### Option 1: VS Code Live Server (Recommended)
1. Open this folder in VS Code.
2. Install the "Live Server" extension.
3. Right-click `index.html` and select "Open with Live Server".

### Option 2: Python Simple Server
If you have Python installed, run this in the terminal:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## 📁 File Structure

```
/bootcamp-site
│
├── index.html              (Landing Page)
├── login.html               (Student Login)
├── register.html            (Student Register)
│
├── assets/
│   ├── css/
│   │   └── tailwind.css     (Custom Tailwind directives & Neomorphism utilities)
│   ├── js/
│   │   └── main.js          (Alpine.js logic: Theme, Loader, Animations)
│   ├── images/
│   └── fonts/
│
├── components/             (Reusable HTML parts)
│   ├── navbar.html
│   ├── footer.html
│   ├── faq.html
│   └── testimonials.html
│
└── tailwind.config.js       (Tailwind configuration)
```

## 🎨 Design Philosophy

- **Theme**: "Technical Editorial". Dark/Light mode supported.
- **Typography**: Space Grotesk (Headings), Inter (Body), JetBrains Mono (Code/Stats).
- **Glassmorphism**: Used sparingly on cards and sticky elements.
- **Neomorphism**: Used only for primary actions (Buttons) and Toggles.
- **Animations**: Subtle, scroll-triggered reveals using Intersection Observer.

## 🛠 Development Notes

- The project currently uses the **Tailwind Play CDN** in `index.html` to allow immediate previewing without a Node.js build step.
- The `tailwind.config.js` and `assets/css/tailwind.css` are provided for a production build pipeline.
- To build for production, you would run: `npx tailwindcss -i ./assets/css/tailwind.css -o ./dist/output.css --watch`.

---
*Built for the Senior UI/UX Engineer Challenge.*
