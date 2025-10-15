# GoReact - Go + React + Inertia.js Starter Kit

A modern web application starter template integrating Go backend with React frontend using Inertia.js for SPA experience.

## Tech Stack

**Backend**
- Go 1.25.1
- [Inertia.js Go Adapter](https://github.com/petaki/inertia-go)
- Native `net/http` router

**Frontend**
- React 18.3
- Inertia.js React Adapter
- Vite 7.1 (build tool)
- TailwindCSS 4.1 (styling framework)

## Features

- **SPA Experience** - Single-page application using Inertia.js without APIs
- **Hot Reload Development** - Frontend and backend development in sync
- **Modern Toolchain** - Vite + TailwindCSS for fast builds
- **TypeScript Ready** - Architecture supports TypeScript extension
- **Dev/Prod Separation** - Conditional compilation for different environments

## Prerequisites

- Go 1.25+
- Node.js 23
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
make init
```

### 2. Start Development Server

```bash
make dev
```

The application will run at:
- Backend server: `http://localhost:3000`
- Vite dev server: `http://localhost:5173`

### 3. Production Build

```bash
make build
```

Executable will be generated at `./app`

## Project Structure

```
.
├── cmd/web/              # Go application entry point
│   ├── main_dev.go       # Development mode
│   ├── main_prod.go      # Production mode
│   ├── common.go         # Shared logic and routes
│   └── dist/             # Frontend build output
├── frontend/             # React frontend source
│   ├── app.jsx           # Inertia app entry point
│   ├── css/              # Stylesheets
│   ├── Layouts/          # Shared layouts
│   └── Pages/            # Page components
│       ├── Index.jsx     # Home page
│       └── Member/       # Member pages
├── app.dev.gohtml        # Development HTML template
├── app.prod.gohtml       # Production HTML template
├── vite.config.js        # Vite configuration
├── Makefile              # Build commands
├── go.mod                # Go dependency management
└── package.json          # Node dependency management
```

## How It Works

### Inertia.js Workflow

1. **Go handles routes** - HTTP requests received by Go server
2. **Render Inertia response** - Server prepares props and renders via Inertia
3. **Frontend receives component** - React component receives props and renders
4. **SPA navigation** - Subsequent navigation via AJAX without page reload

### Development vs Production Mode

**Development Mode** (`make dev`)
- Go compiled with `-tags development`
- Frontend served via Vite dev server (HMR enabled)
- Template references `http://localhost:5173` assets

**Production Mode** (`make build`)
- Go compiled with `-tags production`
- Frontend built to `cmd/web/dist/`
- Template references static asset files

## Available Commands

| Command | Description |
|---------|-------------|
| `make init` | Install Node.js dependencies |
| `make dev` | Start development server (frontend + backend) |
| `make build` | Build production version |
| `npm run build` | Build frontend assets only |

## Adding New Pages

### 1. Create React Component

```jsx
// frontend/Pages/About.jsx
export default function About({ name }) {
  return (
    <div>
      <h1>About {name}</h1>
    </div>
  );
}
```

### 2. Add Go Route Handler

```go
// cmd/web/common.go
func aboutHandler(w http.ResponseWriter, r *http.Request) {
  props := map[string]interface{}{
    "name": "My Application",
  }

  err := inertiaManager.Render(w, r, "Pages/About", props)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}

// Register route in register() function
mux.Handle("/about", inertiaManager.Middleware(http.HandlerFunc(aboutHandler)))
```

## Styling Customization

This project uses TailwindCSS 4.1. Customize at:

- `frontend/css/app.css` - Global styles and Tailwind configuration
- Use Tailwind utility classes in components

## License

ISC

## Contributing

Issues and Pull Requests are welcome!

---

**Note**: Remember to modify the `url` constant in `cmd/web/common.go` to match your application domain.
