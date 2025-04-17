// components/ScanlineOverlay.tsx
import React from 'react';
import styles from './scanlineOverlay.module.css'; // assuming you use CSS module

const ScanlineOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.imageOverlay}>
      <div className={styles.imageBackground}>
        {children}  {/* Rendering the children passed from the parent component */}
      </div>
    </div>
  );
};

export default ScanlineOverlay;
