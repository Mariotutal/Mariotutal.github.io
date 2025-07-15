# TIN Simulation Portfolio

An interactive **Triangular Irregular Network (TIN)** simulation with real-time movement animation built using **Next.js**, **Three.js**, and **React Three Fiber**.

## 🌟 Features

### Interactive TIN Visualization

- **Real-time 3D rendering** of triangular irregular networks
- **Multi-layered wave animation** with sine and cosine functions
- **Dynamic vertex coloring** based on height variations
- **Smooth camera controls** with orbit functionality

### Live Controls

- **Resolution adjustment** (20-100 vertices)
- **Amplitude control** (0.5-5.0 wave height)
- **Speed control** (0.1-2.0 animation speed)
- **Wireframe mode** toggle
- **Reset parameters** functionality

### Technical Implementation

- **Optimized geometry generation** with grid-based triangulation
- **Efficient animation loop** using React Three Fiber's `useFrame`
- **Memoized calculations** for performance
- **Responsive design** with modern UI controls

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Utility components for R3F
- **TypeScript** - Type safety
- **CSS Modules** - Component-scoped styling

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # App layout and metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
└── components/
    ├── TIN.tsx             # Main TIN component
    ├── Scene.tsx           # 3D scene setup
    ├── TINControls.tsx     # Control panel
    └── TINControls.module.css  # Control panel styles
```

## 🎛️ Controls

### Settings Panel

Click the **⚙️** icon in the top-right corner to access:

- **Resolution**: Adjust mesh density (affects performance)
- **Amplitude**: Control wave height
- **Speed**: Animation speed
- **Wireframe Mode**: Toggle between solid and wireframe rendering
- **Reset**: Restore default parameters

### Camera Controls

- **Left Click + Drag**: Rotate camera
- **Right Click + Drag**: Pan camera
- **Mouse Wheel**: Zoom in/out

## 🔧 Technical Details

### TIN Generation

The simulation creates a **Triangular Irregular Network** using:

1. **Grid-based vertex generation** with random offsets
2. **Delaunay-style triangulation** for mesh creation
3. **Dynamic vertex positioning** using mathematical wave functions

### Animation System

Wave movement is calculated using:

```javascript
const wave1 = Math.sin(x * 0.3 + time * 2) * amplitude * 0.5;
const wave2 = Math.cos(z * 0.2 + time * 1.5) * amplitude * 0.3;
const wave3 = Math.sin((x + z) * 0.15 + time) * amplitude * 0.2;
```

### Performance Optimizations

- **Memoized geometry creation** to prevent unnecessary recalculations
- **Efficient attribute updates** using Three.js BufferGeometry
- **Optimized normal calculations** for proper lighting
- **Callback-based event handling** to prevent re-renders

## 🎨 Visual Features

### Lighting Setup

- **Ambient lighting** for overall illumination
- **Directional lighting** with shadows
- **Colored point lights** for atmospheric effects

### Color Dynamics

- **Position-based base colors** for spatial reference
- **Height-based color variations** during animation
- **Smooth color transitions** following wave patterns

## 🔮 Future Enhancements

Potential improvements and features:

- **Texture mapping** for more realistic surfaces
- **Particle effects** for enhanced visualization
- **Export functionality** for 3D models
- **Multiple TIN algorithms** (Delaunay, Voronoi)
- **Physics simulation** integration
- **Audio-reactive animations**

## 📝 Best Practices Implemented

### Next.js Best Practices

- **App Router** for modern Next.js architecture
- **Client-side components** properly marked with `'use client'`
- **Optimized imports** and code splitting
- **TypeScript integration** for type safety

### Three.js Best Practices

- **React Three Fiber** for React integration
- **Proper cleanup** of Three.js resources
- **Optimized render loops** with `useFrame`
- **Memoized expensive calculations**

### React Best Practices

- **Proper hook usage** with dependencies
- **Component separation** for maintainability
- **Callback optimization** with `useCallback`
- **State management** with proper immutability

## 🐛 Troubleshooting

### Common Issues

1. **Performance lag**: Lower the resolution setting
2. **Controls not responding**: Check browser WebGL support
3. **Build errors**: Ensure all dependencies are installed

### Browser Support

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

## 📄 License

This project is created for portfolio purposes and follows best practices for modern web development with Three.js and Next.js.

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to open issues or submit pull requests.

---

**Built with ❤️ using Next.js and Three.js**
