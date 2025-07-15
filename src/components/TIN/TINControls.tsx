'use client';

import { useState } from 'react';
import styles from './TINControls.module.css';

interface TINControlsProps {
  onParameterChange: (parameter: string, value: number) => void;
  onWireframeToggle: (wireframe: boolean) => void;
  onAxisToggle: (showAxis: boolean) => void;
  onReset: () => void;
}

export default function TINControls({
  onParameterChange,
  onWireframeToggle,
  onAxisToggle,
  onReset,
}: TINControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [showAxis, setShowAxis] = useState(true);

  const handleWireframeToggle = () => {
    const newWireframe = !wireframe;
    setWireframe(newWireframe);
    onWireframeToggle(newWireframe);
  };

  const handleAxisToggle = () => {
    const newShowAxis = !showAxis;
    setShowAxis(newShowAxis);
    onAxisToggle(newShowAxis);
  };

  return (
    <div className={styles.controls}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '⚙️'}
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <h3>TIN Controls</h3>

          <div className={styles.control}>
            <label>Resolution:</label>
            <input
              type="range"
              min="20"
              max="100"
              defaultValue="60"
              onChange={e =>
                onParameterChange('resolution', parseInt(e.target.value))
              }
            />
          </div>

          <div className={styles.control}>
            <label>Amplitude:</label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              defaultValue="2.5"
              onChange={e =>
                onParameterChange('amplitude', parseFloat(e.target.value))
              }
            />
          </div>

          <div className={styles.control}>
            <label>Speed:</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              defaultValue="0.4"
              onChange={e =>
                onParameterChange('speed', parseFloat(e.target.value))
              }
            />
          </div>

          <div className={styles.control}>
            <label>
              <input
                type="checkbox"
                checked={wireframe}
                onChange={handleWireframeToggle}
              />
              Wireframe Mode
            </label>
          </div>

          <div className={styles.control}>
            <label>
              <input
                type="checkbox"
                checked={showAxis}
                onChange={handleAxisToggle}
              />
              Show Axis
            </label>
          </div>

          <button className={styles.resetBtn} onClick={onReset}>
            Reset Parameters
          </button>
        </div>
      )}
    </div>
  );
}
