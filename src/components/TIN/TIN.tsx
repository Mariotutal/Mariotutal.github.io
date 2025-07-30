'use client';

/**
 * TRIANGULAR IRREGULAR NETWORK (TIN) WITH FABRIC SIMULATION
 * =========================================================
 *
 * This component creates a realistic towel/fabric animation using mathematical wave functions.
 *
 * CORE MATHEMATICAL APPROACH:
 * 1. Generate irregular triangular mesh (TIN)
 * 2. Apply complex wave superposition for each vertex
 * 3. Combine multiple wave types: main wind, gusts, turbulence, pressure
 * 4. Apply physical constraints: edge damping, intensity modulation
 * 5. Real-time vertex displacement in animation loop
 *
 * The result is a physically plausible fabric movement driven by mathematical wind models.
 */

import { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * TIN CONFIGURATION OBJECT
 * ========================
 *
 * This object contains all hardcoded values, mathematical constants, colors,
 * and configuration parameters used throughout the TIN component.
 *
 * ORGANIZATION:
 * - mesh: Geometry and mesh-related constants
 * - colors: Color generation and mapping parameters
 * - wind: Wind simulation mathematical constants
 * - material: Material properties and rendering settings
 * - animation: Animation timing and control parameters
 */
const TIN_CONFIG = {
  // Mesh generation and geometry constants
  mesh: {
    // Default mesh dimensions
    defaultWidth: 20,
    defaultHeight: 20,
    defaultResolution: 25,
    defaultAmplitude: 2,
    defaultSpeed: 0.5,

    // Mesh irregularity parameters
    randomOffset: 0.3,

    // Mesh rotation (lays flat on XZ plane)
    rotationX: -Math.PI / 2,
  },

  // Color generation and mapping parameters
  colors: {
    /**
     * INITIAL COLOR GENERATION (Static Position-Based Colors)
     * ======================================================
     *
     * These colors are assigned once when the mesh is created, based on each vertex's
     * position in the XZ plane. This creates a static color gradient across the fabric.
     *
     * COLOR MAPPING FORMULA:
     * - Red:   base + (normalizedX * multiplier) → Creates horizontal gradient
     * - Green: base + (normalizedZ * multiplier) → Creates depth gradient
     * - Blue:  base - (normalizedX * multiplier) → Creates inverse horizontal gradient
     *
     * VISUAL EFFECT:
     * - Creates a warm-to-cool color transition from left to right
     * - Adds depth perception with green component varying by Z position
     * - Results in a natural fabric-like color variation
     */
    baseColor: {
      red: {
        base: 0.4, // Brighter minimum red value
        multiplier: 0.5, // How much red increases across X-axis
      },
      green: {
        base: 0.6, // Brighter base green value
        multiplier: 0.4, // How much green varies with Z position
      },
      blue: {
        base: 1.0, // Maximum blue value
        multiplier: 0.5, // How much blue decreases across X-axis
      },
    },

    /**
     * DYNAMIC HEIGHT-BASED COLOR MAPPING (Animation-Time Colors)
     * ==========================================================
     *
     * These colors are updated every frame during animation based on each vertex's
     * current Y position (height). This creates dynamic color changes as the fabric
     * moves, providing visual depth cues and enhancing the 3D effect.
     *
     * HEIGHT FACTOR CALCULATION:
     * heightFactor = (currentY + amplitude) / (amplitude * 2)
     * - Range: [0, 1] where 0 = lowest point, 1 = highest point
     * - Normalizes Y position relative to the total possible displacement range
     *
     * COLOR MAPPING FORMULA:
     * - Red:   base + (heightFactor * multiplier) → Higher points = more red
     * - Blue:  base - (heightFactor * multiplier) → Higher points = less blue
     *
     * VISUAL EFFECT:
     * - Creates "hot spots" where fabric rises (more red/orange)
     * - Creates "cool spots" where fabric sinks (more blue)
     * - Enhances perception of fabric movement and 3D depth
     * - Simulates lighting effects where raised areas appear warmer
     */
    heightMapping: {
      red: {
        base: 0.4, // Brighter minimum red value for lowest points
        multiplier: 0.5, // How much red increases with height
      },
      blue: {
        base: 1.0, // Maximum blue value for lowest points
        multiplier: 0.4, // How much blue decreases with height
      },
    },
  },

  // Wind simulation mathematical constants
  wind: {
    // Edge damping parameters
    edgeDamping: {
      minimum: 0.15,
      falloffPower: 2,
    },

    // Wind direction oscillation parameters
    direction: {
      x: {
        frequency: 0.3,
        amplitude: 0.7,
        offset: 0.3,
      },
      z: {
        frequency: 0.2,
        amplitude: 0.5,
        offset: 0.5,
      },
    },

    // Primary wind wave parameters
    mainWave: {
      xSpatialFrequency: 1.5,
      zSpatialFrequency: 1.2,
      temporalFrequency: 2.5,
    },

    // Wind gust parameters
    gust: {
      strength: {
        frequency: 0.8,
        amplitude: 0.5,
        offset: 0.5,
      },
      pattern: {
        xSpatialFrequency: 2,
        zSpatialFrequency: 1.8,
        xTemporalFrequency: 4,
        zTemporalFrequency: 3.5,
        amplitudeMultiplier: 0.8,
      },
    },

    // Turbulence parameters
    turbulence: {
      primary: {
        xSpatialFrequency: 6,
        zSpatialFrequency: 4,
        xTemporalFrequency: 8,
        zTemporalFrequency: 6,
        amplitude: 0.2,
      },
      secondary: {
        xSpatialFrequency: 4,
        zSpatialFrequency: 3,
        temporalFrequency: 9,
        amplitude: 0.15,
      },
    },

    // Pressure wave parameters
    pressure: {
      xSpatialFrequency: 0.8,
      zSpatialFrequency: 0.6,
      xTemporalFrequency: 1.5,
      zTemporalFrequency: 1.2,
      amplitude: 0.4,
    },

    // Wind intensity modulation parameters
    intensity: {
      primary: {
        frequency: 0.6,
        amplitude: 0.3,
        offset: 0.7,
      },
      lull: {
        frequency: 0.4,
        amplitude: 0.2,
        offset: 0.8,
      },
    },
  },

  // Material properties and rendering settings
  material: {
    // Opacity settings
    opacity: {
      wireframe: 0.7,
      normal: 0.9,
    },

    // Material properties
    properties: {
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
    },
  },

  // Animation and timing parameters
  animation: {
    // Time scaling for animation speed
    timeScaling: 1,
  },
} as const;

interface TINProps {
  width?: number;
  height?: number;
  resolution?: number;
  amplitude?: number;
  speed?: number;
  wireframe?: boolean;
}

export default function TIN({
  width = TIN_CONFIG.mesh.defaultWidth,
  height = TIN_CONFIG.mesh.defaultHeight,
  resolution = TIN_CONFIG.mesh.defaultResolution,
  amplitude = TIN_CONFIG.mesh.defaultAmplitude,
  speed = TIN_CONFIG.mesh.defaultSpeed,
  wireframe = false,
}: TINProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const materialRef = useRef<THREE.MeshPhongMaterial>(null);

  // Generate random points for TIN
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];

    // Generate grid-based points with some randomness for irregular network
    for (let x = 0; x <= resolution; x++) {
      for (let z = 0; z <= resolution; z++) {
        const xPos = (x / resolution) * width - width / 2;
        const zPos = (z / resolution) * height - height / 2;

        // Add some randomness to create irregular network
        const xOffset = (Math.random() - 0.5) * TIN_CONFIG.mesh.randomOffset;
        const zOffset = (Math.random() - 0.5) * TIN_CONFIG.mesh.randomOffset;

        pts.push(new THREE.Vector3(xPos + xOffset, 0, zPos + zOffset));
      }
    }

    return pts;
  }, [width, height, resolution]);

  // Create geometry using triangulation
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];
    const colors: number[] = [];

    // Create vertices
    points.forEach(point => {
      vertices.push(point.x, point.y, point.z);
    });

    // Create triangular faces (simple grid triangulation)
    for (let x = 0; x < resolution; x++) {
      for (let z = 0; z < resolution; z++) {
        const a = x * (resolution + 1) + z;
        const b = x * (resolution + 1) + (z + 1);
        const c = (x + 1) * (resolution + 1) + z;
        const d = (x + 1) * (resolution + 1) + (z + 1);

        // First triangle
        indices.push(a, b, c);
        // Second triangle
        indices.push(b, d, c);
      }
    }

    /**
     * STATIC COLOR GENERATION - POSITION-BASED COLOR ASSIGNMENT
     * =========================================================
     *
     * This section assigns initial colors to each vertex based on its position
     * in the XZ plane. These colors create a static gradient pattern across
     * the fabric surface that remains constant throughout the animation.
     *
     * COORDINATE NORMALIZATION:
     * - normalizedX: Maps X position from [-width/2, width/2] to [0, 1]
     * - normalizedZ: Maps Z position from [-height/2, height/2] to [0, 1]
     *
     * COLOR CALCULATION:
     * Each vertex gets RGB values calculated using the formulas defined in TIN_CONFIG.colors.baseColor
     * This creates a warm-to-cool gradient from left to right with depth variation.
     */
    points.forEach(point => {
      // Normalize coordinates to [0, 1] range for color calculation
      const normalizedX = (point.x + width / 2) / width; // Left=0, Right=1
      const normalizedZ = (point.z + height / 2) / height; // Back=0, Front=1

      // Calculate RGB components using position-based formulas
      const redComponent =
        TIN_CONFIG.colors.baseColor.red.base +
        normalizedX * TIN_CONFIG.colors.baseColor.red.multiplier; // Increases from left to right
      const greenComponent =
        TIN_CONFIG.colors.baseColor.green.base +
        normalizedZ * TIN_CONFIG.colors.baseColor.green.multiplier; // Varies with depth
      const blueComponent =
        TIN_CONFIG.colors.baseColor.blue.base -
        normalizedX * TIN_CONFIG.colors.baseColor.blue.multiplier; // Decreases from left to right

      // Store RGB values for this vertex
      colors.push(redComponent, greenComponent, blueComponent);
    });

    geom.setIndex(indices);
    geom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    return geom;
  }, [points, resolution, width, height]);

  /**
   * MATHEMATICAL MODEL FOR TOWEL/FABRIC MOVEMENT
   * ============================================
   *
   * This function simulates realistic fabric movement using multiple sine/cosine wave equations
   * that represent different physical forces acting on a flexible material in wind.
   *
   * COORDINATE SYSTEM:
   * - x, z: World coordinates of each vertex
   * - time: Animation time parameter for wave propagation
   * - Returns: Y displacement (height) for each vertex
   */
  const calculateWindWave = useCallback(
    (x: number, z: number, time: number) => {
      /**
       * STEP 1: COORDINATE NORMALIZATION
       * Convert world coordinates to normalized space [-1, 1]
       * This allows mathematical functions to work consistently regardless of mesh size
       *
       * Formula: normalized = worldCoord / (maxExtent / 2)
       */
      const normalizedX = x / (width / 2);
      const normalizedZ = z / (height / 2);

      /**
       * STEP 2: RADIAL DISTANCE CALCULATION
       * Calculate Euclidean distance from center using Pythagorean theorem
       *
       * Formula: r = √(x² + z²)
       * Purpose: Used for edge constraints (fabric edges are typically fixed or constrained)
       */
      const distanceFromCenter = Math.sqrt(
        normalizedX * normalizedX + normalizedZ * normalizedZ
      );

      /**
       * STEP 3: EDGE DAMPING FUNCTION
       * Models physical constraint where fabric edges move less than center
       * Uses quadratic falloff: f(r) = max(0.15, 1 - r²)
       *
       * Mathematical behavior:
       * - At center (r=0): damping = 1.0 (full movement)
       * - At edges (r=1): damping = 0.15 (15% movement)
       * - Quadratic ensures smooth transition
       */
      const edgeDamping = Math.max(
        TIN_CONFIG.wind.edgeDamping.minimum,
        1 -
          Math.pow(distanceFromCenter, TIN_CONFIG.wind.edgeDamping.falloffPower)
      );

      /**
       * STEP 4: DYNAMIC WIND DIRECTION VECTORS
       * Simulates changing wind direction over time using low-frequency oscillations
       *
       * windDirectionX = sin(0.3t) × 0.7 + 0.3
       * - Range: [-0.4, 1.0] → Wind varies from leftward to strong rightward
       * - Frequency: 0.3 → Slow direction changes (realistic wind behavior)
       *
       * windDirectionZ = cos(0.2t) × 0.5 + 0.5
       * - Range: [0.0, 1.0] → Wind varies from no depth to full depth movement
       * - Different frequency (0.2) creates complex, non-periodic wind patterns
       */
      const windDirectionX =
        Math.sin(time * TIN_CONFIG.wind.direction.x.frequency) *
          TIN_CONFIG.wind.direction.x.amplitude +
        TIN_CONFIG.wind.direction.x.offset;
      const windDirectionZ =
        Math.cos(time * TIN_CONFIG.wind.direction.z.frequency) *
          TIN_CONFIG.wind.direction.z.amplitude +
        TIN_CONFIG.wind.direction.z.offset;

      /**
       * STEP 5: PRIMARY WAVE EQUATION
       * Main wind-driven wave using traveling wave equation
       *
       * Formula: W₁ = sin(kₓx + kᵧz + ωt)
       * Where:
       * - kₓ = windDirectionX × 1.5 (spatial frequency in X)
       * - kᵧ = windDirectionZ × 1.2 (spatial frequency in Z)
       * - ω = 2.5 (temporal frequency)
       *
       * This creates a traveling wave that follows wind direction
       */
      const mainWind = Math.sin(
        normalizedX *
          windDirectionX *
          TIN_CONFIG.wind.mainWave.xSpatialFrequency +
          normalizedZ *
            windDirectionZ *
            TIN_CONFIG.wind.mainWave.zSpatialFrequency +
          time * TIN_CONFIG.wind.mainWave.temporalFrequency
      );

      /**
       * STEP 6: WIND GUST SIMULATION
       * Models intermittent strong wind gusts using amplitude modulation
       *
       * gustStrength = sin(0.8t) × 0.5 + 0.5
       * - Range: [0.0, 1.0] → Gust intensity varies from calm to maximum
       * - Creates periodic gust cycles every ~7.85 seconds
       *
       * gustPattern = sin(2x + 4t) × cos(1.8z + 3.5t)
       * - Product of two waves creates complex interference patterns
       * - Higher frequencies (2, 1.8) create smaller gust cells
       * - Different temporal frequencies (4, 3.5) prevent perfect periodicity
       *
       * Final: W₂ = gustPattern × gustStrength × 0.8
       * The 0.8 factor limits gust amplitude relative to main wind
       */
      const gustStrength =
        Math.sin(time * TIN_CONFIG.wind.gust.strength.frequency) *
          TIN_CONFIG.wind.gust.strength.amplitude +
        TIN_CONFIG.wind.gust.strength.offset;
      const gustPattern =
        Math.sin(
          normalizedX * TIN_CONFIG.wind.gust.pattern.xSpatialFrequency +
            time * TIN_CONFIG.wind.gust.pattern.xTemporalFrequency
        ) *
        Math.cos(
          normalizedZ * TIN_CONFIG.wind.gust.pattern.zSpatialFrequency +
            time * TIN_CONFIG.wind.gust.pattern.zTemporalFrequency
        );
      const windGust =
        gustPattern *
        gustStrength *
        TIN_CONFIG.wind.gust.pattern.amplitudeMultiplier;

      /**
       * STEP 7: TURBULENCE MODELING
       * Adds high-frequency chaotic motion using multiple wave superposition
       *
       * turbulence1 = sin(6x + 8t) × cos(4z + 6t) × 0.2
       * - High spatial frequencies (6, 4) create fine-scale ripples
       * - High temporal frequencies (8, 6) create rapid fluctuations
       * - Product of sine and cosine creates localized turbulent cells
       *
       * turbulence2 = cos(4x + 3z + 9t) × 0.15
       * - Combined spatial term (x + z) creates diagonal wave patterns
       * - Different frequency (9) adds temporal complexity
       * - Smaller amplitude (0.15) for subtle variation
       *
       * Total turbulence = T₁ + T₂ (linear superposition)
       */
      const turbulence1 =
        Math.sin(
          normalizedX * TIN_CONFIG.wind.turbulence.primary.xSpatialFrequency +
            time * TIN_CONFIG.wind.turbulence.primary.xTemporalFrequency
        ) *
        Math.cos(
          normalizedZ * TIN_CONFIG.wind.turbulence.primary.zSpatialFrequency +
            time * TIN_CONFIG.wind.turbulence.primary.zTemporalFrequency
        ) *
        TIN_CONFIG.wind.turbulence.primary.amplitude;
      const turbulence2 =
        Math.cos(
          normalizedX * TIN_CONFIG.wind.turbulence.secondary.xSpatialFrequency +
            normalizedZ *
              TIN_CONFIG.wind.turbulence.secondary.zSpatialFrequency +
            time * TIN_CONFIG.wind.turbulence.secondary.temporalFrequency
        ) * TIN_CONFIG.wind.turbulence.secondary.amplitude;
      const windTurbulence = turbulence1 + turbulence2;

      /**
       * STEP 8: PRESSURE WAVE MODELING
       * Simulates pressure differentials as wind hits fabric surface
       *
       * pressureWave = sin(0.8x + 1.5t) × cos(0.6z + 1.2t) × 0.4
       * - Low spatial frequencies (0.8, 0.6) create large pressure zones
       * - Moderate temporal frequencies (1.5, 1.2) for realistic pressure changes
       * - Product creates moving pressure cells across fabric surface
       */
      const pressureWave =
        Math.sin(
          normalizedX * TIN_CONFIG.wind.pressure.xSpatialFrequency +
            time * TIN_CONFIG.wind.pressure.xTemporalFrequency
        ) *
        Math.cos(
          normalizedZ * TIN_CONFIG.wind.pressure.zSpatialFrequency +
            time * TIN_CONFIG.wind.pressure.zTemporalFrequency
        ) *
        TIN_CONFIG.wind.pressure.amplitude;

      /**
       * STEP 9: WIND INTENSITY MODULATION
       * Models realistic wind behavior with varying intensity
       *
       * windIntensity = sin(0.6t) × 0.3 + 0.7
       * - Range: [0.4, 1.0] → Wind never completely stops
       * - Period: ~10.47 seconds → Natural wind variation cycle
       *
       * windLull = cos(0.4t) × 0.2 + 0.8
       * - Range: [0.6, 1.0] → Periodic calm moments
       * - Different phase (cosine vs sine) creates complex intensity patterns
       */
      const windIntensity =
        Math.sin(time * TIN_CONFIG.wind.intensity.primary.frequency) *
          TIN_CONFIG.wind.intensity.primary.amplitude +
        TIN_CONFIG.wind.intensity.primary.offset;
      const windLull =
        Math.cos(time * TIN_CONFIG.wind.intensity.lull.frequency) *
          TIN_CONFIG.wind.intensity.lull.amplitude +
        TIN_CONFIG.wind.intensity.lull.offset;

      /**
       * STEP 10: WAVE SUPERPOSITION AND FINAL CALCULATION
       * Combines all wind components using linear superposition principle
       *
       * Total displacement = (W₁ + W₂ + T + P) × I × L × D × A
       * Where:
       * - W₁ = mainWind (primary wave)
       * - W₂ = windGust (gust modulation)
       * - T = windTurbulence (high-frequency noise)
       * - P = pressureWave (pressure effects)
       * - I = windIntensity (global intensity modulation)
       * - L = windLull (calm period modulation)
       * - D = edgeDamping (boundary constraints)
       * - A = amplitude (user-controlled scale factor)
       */
      const windMovement =
        (mainWind + windGust + windTurbulence + pressureWave) *
        windIntensity *
        windLull;

      // Apply edge damping and amplitude scaling
      return windMovement * edgeDamping * amplitude;
    },
    [amplitude, width, height]
  );

  /**
   * ANIMATION LOOP - REAL-TIME VERTEX DISPLACEMENT
   * ==============================================
   *
   * This function runs every frame to update vertex positions and create towel movement.
   * Uses the mathematical wind model to displace each vertex independently.
   */
  useFrame((state, delta) => {
    // Update time parameter for wave progression (speed controls animation rate)
    timeRef.current += delta * speed * TIN_CONFIG.animation.timeScaling;

    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      const colors = meshRef.current.geometry.attributes.color;

      /**
       * VERTEX DISPLACEMENT APPLICATION
       * For each vertex in the mesh:
       * 1. Get vertex's original (x,z) coordinates
       * 2. Calculate Y displacement using wind wave function
       * 3. Update vertex position in 3D space
       * 4. Update vertex color based on height (visual depth cue)
       */
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        // Apply mathematical model to get Y displacement
        const newY = calculateWindWave(point.x, point.z, timeRef.current);

        // Update vertex Y position in geometry buffer
        positions.setY(i, newY);

        /**
         * DYNAMIC COLOR MAPPING - HEIGHT-BASED COLOR UPDATES
         * ==================================================
         *
         * This section updates vertex colors every frame based on the current
         * Y position (height) of each vertex. This creates dynamic color changes
         * that enhance the perception of fabric movement and 3D depth.
         *
         * HEIGHT FACTOR CALCULATION:
         * heightFactor = (currentY + amplitude) / (amplitude * 2)
         * - Maps Y position from [-amplitude, +amplitude] to [0, 1]
         * - 0 = lowest possible point (fabric sinks)
         * - 1 = highest possible point (fabric rises)
         *
         * COLOR MAPPING STRATEGY:
         * - Red component: Increases with height (warmer colors for raised areas)
         * - Blue component: Decreases with height (cooler colors for lowered areas)
         * - Green component: Remains constant (preserves base color variation)
         *
         * VISUAL EFFECT:
         * Creates "hot spots" where fabric rises and "cool spots" where it sinks,
         * simulating realistic lighting effects and enhancing 3D depth perception.
         */
        const heightFactor = (newY + amplitude) / (amplitude * 2);

        // Update red component: higher points = more red (warmer)
        colors.setX(
          i,
          TIN_CONFIG.colors.heightMapping.red.base +
            heightFactor * TIN_CONFIG.colors.heightMapping.red.multiplier
        );

        // Update blue component: higher points = less blue (warmer)
        colors.setZ(
          i,
          TIN_CONFIG.colors.heightMapping.blue.base -
            heightFactor * TIN_CONFIG.colors.heightMapping.blue.multiplier
        );
      }

      // Mark geometry attributes as needing GPU update
      positions.needsUpdate = true;
      colors.needsUpdate = true;
      // Recalculate surface normals for proper lighting
      meshRef.current.geometry.computeVertexNormals();
    }

    // Update wireframe mode
    if (materialRef.current) {
      materialRef.current.wireframe = wireframe;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation-x={TIN_CONFIG.mesh.rotationX}
    >
      <meshPhongMaterial
        ref={materialRef}
        vertexColors={TIN_CONFIG.material.properties.vertexColors}
        side={TIN_CONFIG.material.properties.side}
        transparent={TIN_CONFIG.material.properties.transparent}
        opacity={
          wireframe
            ? TIN_CONFIG.material.opacity.wireframe
            : TIN_CONFIG.material.opacity.normal
        }
        wireframe={wireframe}
      />
    </mesh>
  );
}
