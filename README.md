# MCP Phil Components

A collection of reusable UI components built with HTML, CSS, and JavaScript. This project provides a server that serves component templates through the Model Context Protocol (MCP).

## Components

### Button
A stylish button component with a dark blue and purple gradient background, featuring hover and active states.

### Gallery
A responsive image carousel with:
- Smooth transitions
- Navigation arrows
- Dot indicators
- Keyboard navigation support
- Touch-friendly controls

### Fireworks
An animated fireworks effect that can be triggered on events like button clicks. Features:
- Multiple colorful explosions
- Particle effects
- Automatic cleanup
- Dark background overlay

## Usage

1. Start the server:
```bash
npm start
```

2. Use the components through MCP with the following types:
- `button`: Gradient button (accepts `TEXT` prop)
- `gallery`: Image carousel (accepts `SLIDES` prop)
- `fireworks`: Fireworks animation (no props required)

## Dependencies
- @modelcontextprotocol/sdk
- zod

## License
ISC