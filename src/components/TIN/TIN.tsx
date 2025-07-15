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

interface TINProps {
  width?: number;
  height?: number;
  resolution?: number;
  amplitude?: number;
  speed?: number;
  wireframe?: boolean;
}

export default function TIN({
  width = 20,
  height = 20,
  resolution = 50,
  amplitude = 2,
  speed = 0.5,
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
        const randomOffset = 0.3;
        const xOffset = (Math.random() - 0.5) * randomOffset;
        const zOffset = (Math.random() - 0.5) * randomOffset;

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

    // Generate colors based on position
    points.forEach(point => {
      const normalizedX = (point.x + width / 2) / width;
      const normalizedZ = (point.z + height / 2) / height;

      colors.push(
        0.2 + normalizedX * 0.6, // Red component
        0.4 + normalizedZ * 0.4, // Green component
        0.8 - normalizedX * 0.3 // Blue component
      );
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
      const edgeDamping = Math.max(0.15, 1 - Math.pow(distanceFromCenter, 2));

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
      const windDirectionX = Math.sin(time * 0.3) * 0.7 + 0.3; // Varying wind from left to right
      const windDirectionZ = Math.cos(time * 0.2) * 0.5 + 0.5; // Varying wind front to back

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
        normalizedX * windDirectionX * 1.5 +
          normalizedZ * windDirectionZ * 1.2 +
          time * 2.5
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
      const gustStrength = Math.sin(time * 0.8) * 0.5 + 0.5; // Gust intensity varies
      const gustPattern =
        Math.sin(normalizedX * 2 + time * 4) *
        Math.cos(normalizedZ * 1.8 + time * 3.5);
      const windGust = gustPattern * gustStrength * 0.8;

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
        Math.sin(normalizedX * 6 + time * 8) *
        Math.cos(normalizedZ * 4 + time * 6) *
        0.2;
      const turbulence2 =
        Math.cos(normalizedX * 4 + normalizedZ * 3 + time * 9) * 0.15;
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
        Math.sin(normalizedX * 0.8 + time * 1.5) *
        Math.cos(normalizedZ * 0.6 + time * 1.2) *
        0.4;

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
      const windIntensity = Math.sin(time * 0.6) * 0.3 + 0.7; // Wind strength varies
      const windLull = Math.cos(time * 0.4) * 0.2 + 0.8; // Periodic calm moments

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
    timeRef.current += delta * speed;

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
         * DYNAMIC COLOR MAPPING
         * Maps height to color for visual depth perception
         * heightFactor ∈ [0,1] where 0=lowest, 1=highest point
         */
        const heightFactor = (newY + amplitude) / (amplitude * 2);
        colors.setX(i, 0.2 + heightFactor * 0.6); // Red component varies with height
        colors.setZ(i, 0.8 - heightFactor * 0.3); // Blue component inversely varies
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
    <mesh ref={meshRef} geometry={geometry} rotation-x={-Math.PI / 2}>
      <meshPhongMaterial
        ref={materialRef}
        vertexColors
        side={THREE.DoubleSide}
        transparent
        opacity={wireframe ? 0.7 : 0.9}
        wireframe={wireframe}
      />
    </mesh>
  );
}
