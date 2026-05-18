/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            'bg-primary': 'var(--bg-primary)',
            'bg-card': 'var(--bg-card)',
            'bg-card-hover': 'var(--bg-card-hover)',
            'accent-blue': 'var(--accent-blue)',
            'accent-coral': 'var(--accent-coral)',
            'text-primary': 'var(--text-primary)',
            'text-muted': 'var(--text-muted)',
            'border-subtle': 'var(--border)',
        },
        fontFamily: {
            display: ['Outfit', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
        }
    }
  },
  plugins: [],
}

