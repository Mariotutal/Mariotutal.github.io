'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useState, useCallback, useEffect, useRef } from 'react';
import {TIN, TINControls} from './TIN';
import { Suspense } from 'react';
import * as THREE from 'three';

interface TINParameters {
  resolution: number;
  amplitude: number;
  speed: number;
  wireframe: boolean;
}

export default function Scene() {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const [tinParams, setTinParams] = useState<TINParameters>({
    resolution: 60,
    amplitude: 2.5,
    speed: 0.02,
    wireframe: true
  });

  const [showAxis, setShowAxis] = useState(false);
  const [key, setKey] = useState(0); // Force re-render when resolution changes

  // Handle window resize to maintain camera projection
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current) {
        const aspect = window.innerWidth / window.innerHeight;
        
        // Update orthographic camera bounds based on aspect ratio
        const frustumSize = 40; // Base frustum size
        cameraRef.current.left = -frustumSize * aspect / 2;
        cameraRef.current.right = frustumSize * aspect / 2;
        cameraRef.current.top = frustumSize / 2;
        cameraRef.current.bottom = -frustumSize / 2;
        
        // Update projection matrix
        cameraRef.current.updateProjectionMatrix();
      }
    };

    // Set initial camera bounds
    handleResize();
    
    // Add event listener for resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleParameterChange = useCallback((parameter: string, value: number) => {
    setTinParams(prev => {
      const newParams = { ...prev, [parameter]: value };
      
      // Force re-render if resolution changes (affects geometry)
      if (parameter === 'resolution') {
        setKey(prevKey => prevKey + 1);
      }
      
      return newParams;
    });
  }, []);

  const handleWireframeToggle = useCallback((wireframe: boolean) => {
    setTinParams(prev => ({ ...prev, wireframe }));
  }, []);

  const handleAxisToggle = useCallback((showAxis: boolean) => {
    setShowAxis(showAxis);
  }, []);

  const handleReset = useCallback(() => {
    setTinParams({
      resolution: 60,
      amplitude: 2.5,
      speed: 0.02,
      wireframe: true
    });
    setShowAxis(false);
    setKey(prevKey => prevKey + 1);
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }}>
        <Canvas>
          <Suspense fallback={null}>
            {/* Orthographic camera setup for 2D-like view */}
            <OrthographicCamera
              ref={cameraRef}
              makeDefault
              position={[25, 0, 0]}
              zoom={10}
              near={0.1}
              far={1000}
              left={-20}
              right={20}
              top={20}
              bottom={-20}
            />
            
            {/* Enhanced lighting setup */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 20, 5]}
              intensity={0.7}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-15}
              shadow-camera-right={15}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
            />
            <pointLight position={[-10, 15, -10]} intensity={0.2} color="#4CAF50" />
            <pointLight position={[10, 15, 10]} intensity={0.2} color="#2196F3" />
            
            {/* Static axis helper for reference (toggleable) */}
            {showAxis && <axesHelper args={[3]} />}
            
            {/* TIN Component with dynamic parameters */}
            <TIN 
              key={key}
              width={25}
              height={25}
              resolution={tinParams.resolution}
              amplitude={tinParams.amplitude}
              speed={tinParams.speed}
              wireframe={tinParams.wireframe}
            />
            
            {/* Restricted camera controls for 2D-like interaction */}
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              screenSpacePanning={true}
              enableRotate={false}
              enableZoom={true}
              zoomSpeed={0.5}
              minZoom={10}
              maxZoom={100}
              panSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Control panel */}
      <TINControls
        onParameterChange={handleParameterChange}
        onWireframeToggle={handleWireframeToggle}
        onAxisToggle={handleAxisToggle}
        onReset={handleReset}
      />
      
      {/* <Overlay /> */}
    </>
  );
} 