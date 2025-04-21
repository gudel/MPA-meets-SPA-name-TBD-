'use client'

// components/ScanlineOverlay.tsx
import React from 'react';
import styles from './scanlineOverlay.module.css'; // assuming you use CSS module
import { useAppSelector } from '@/app/lib/hooks';

const ScanlineOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isScanlineVisible = useAppSelector(state => state.Ui.scanlineVisible)

  if (!isScanlineVisible) return null;
  else return (
    <div className={styles.imageOverlay}>
      <div className={styles.imageBackground}>
        {children}  {/* Rendering the children passed from the parent component */}
      </div>
    </div>
  );
};

export default ScanlineOverlay;
