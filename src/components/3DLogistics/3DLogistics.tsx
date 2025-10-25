'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { getAssetById, hasSplineScene } from '@/data/3DAssets';
import styles from './3DLogistics.module.css';

interface ThreeDLogisticsProps {
  sceneUrl: string | null;
  title: string;
  description: string;
  assetId?: string; // Optional asset ID for centralized configuration
  hotspots?: Array<{
    id: string;
    x: number;
    y: number;
    label: string;
    onClick: () => void;
  }>;
}

export default function ThreeDLogistics({
  sceneUrl,
  title,
  description,
  assetId,
  hotspots = []
}: ThreeDLogisticsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const handleSplineLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleSplineError = useCallback(() => {
    console.log('3D scene failed to load, using CSS fallback');
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Get asset configuration if assetId is provided
  const asset = assetId ? getAssetById(assetId) : null;
  const hasSpline = assetId ? hasSplineScene(assetId) : (sceneUrl !== null);
  const currentSceneUrl = assetId ? asset?.sceneUrl : sceneUrl;

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    // Control Spline animations here
  };

  const resetScene = () => {
    window.location.reload();
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={styles.logisticsContainer}
    >
      {/* 3D Spline Scene or CSS Fallback */}
      {hasSpline && currentSceneUrl ? (
        <Spline
          scene={currentSceneUrl}
          onLoad={handleSplineLoad}
          onError={handleSplineError}
          className={styles.splineScene}
        />
      ) : (
        <div className={styles.cssFallback}>
          <div className={styles.fallbackContent}>
            {(asset?.fallbackElements || ['🌐', '🏭', '🚛', '📦', '🛣️']).map((element, index) => (
              <div
                key={index}
                className={`${styles.fallbackElement} ${styles[`element${index}`]}`}
              >
                {element}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <div className={styles.loadingText}>Loading 3D Scene...</div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <div className={styles.errorText}>Failed to load 3D scene</div>
        </div>
      )}

      {/* Scene Overlay */}
      <div className={styles.sceneOverlay} />

      {/* Interactive Hotspots */}
      {hotspots.map((hotspot) => (
        <motion.div
          key={hotspot.id}
          className={styles.interactiveHotspot}
          style={{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`
          }}
          onClick={hotspot.onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={styles.hotspotTooltip}>
            {hotspot.label}
          </div>
        </motion.div>
      ))}

      {/* Scene Controls */}
      <div className={styles.sceneControls}>
        <button
          className={styles.controlButton}
          onClick={toggleAnimation}
          title={isPlaying ? 'Pause Animation' : 'Play Animation'}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        
        <button
          className={styles.controlButton}
          onClick={resetScene}
          title="Reset Scene"
        >
          <RotateCcw />
        </button>
        
        <button
          className={styles.controlButton}
          onClick={toggleInfo}
          title="Toggle Info"
        >
          <Info />
        </button>
      </div>

      {/* Scene Info */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={styles.sceneInfo}
        >
          <div className={styles.sceneTitle}>{title}</div>
          <div className={styles.sceneDescription}>{description}</div>
        </motion.div>
      )}
    </motion.div>
  );
}
