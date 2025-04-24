'use client'

// components/ScanlineOverlay.tsx
import React from 'react';
import styles from './scanlineOverlay.module.css'; 
import { useAppSelector } from '@/app/lib/hooks';
import ContentGate from '../contentGate/contentGate';
import BootScreen from '../bootScreen/bootScreen';

const ScanlineOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isScanlineVisible = useAppSelector(state => state.Ui.scanlineVisible)


  if (!isScanlineVisible) return null;
  else return (
    <div className={styles.imageOverlay}>
      <div className={styles.imageBackground}>
        <BootScreen />
        <ContentGate>{children}</ContentGate>  {/* Rendering the children passed from the parent component, gated by ContentGate */}
      </div>
    </div>
  );
};

export default ScanlineOverlay;
