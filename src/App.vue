<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
/* Enhanced color scheme with blue-cyan focus */
:root {
  /* Primary cyan color with variants */
  --ion-color-primary: #06b6d4;
  --ion-color-primary-rgb: 6, 182, 212;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #05a1bb;
  --ion-color-primary-tint: #22d3ee;
  
  /* Secondary blue color */
  --ion-color-secondary: #0ea5e9;
  --ion-color-secondary-rgb: 14, 165, 233;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  --ion-color-secondary-shade: #0284c7;
  --ion-color-secondary-tint: #38bdf8;
  
  /* Accent color - brighter cyan */
  --ion-color-tertiary: #22d3ee;
  --ion-color-tertiary-rgb: 34, 211, 238;
  --ion-color-tertiary-contrast: #000000;
  --ion-color-tertiary-contrast-rgb: 0, 0, 0;
  --ion-color-tertiary-shade: #0891b2;
  --ion-color-tertiary-tint: #67e8f9;

  /* Dark theme colors - pure black and dark grays */
  --ion-color-dark: #000000;
  --ion-color-dark-rgb: 0, 0, 0;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb: 255, 255, 255;
  --ion-color-dark-shade: #000000;
  --ion-color-dark-tint: #0f0f0f;
  
  /* Card and component backgrounds */
  --ion-color-step-50: #0a0a0a;
  --ion-color-step-100: #111111;
  --ion-color-step-150: #1a1a1a;
  --ion-color-step-200: #222222;
  
  /* Text colors */
  --ion-text-color: #ffffff;
  --ion-text-color-rgb: 255, 255, 255;
  
  /* Background colors */
  --ion-background-color: #000000;
  --ion-background-color-rgb: 0, 0, 0;
  
  /* Card colors */
  --ion-card-background: #111111;
  
  /* Custom colors */
  --color-card-bg: #111111;
  --color-card-header: #1a1a1a;
  --color-card-border: rgba(6, 182, 212, 0.2);
  --color-gradient-start: rgba(6, 182, 212, 0.05);
  --color-gradient-end: rgba(14, 165, 233, 0.01);
}

/* Apply dark mode by default */
body {
  background-color: #000000;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #111111;
}

::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--ion-color-primary);
}
</style>