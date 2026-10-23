import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'challenge-manifest',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-unit05',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-math-unit05\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-unit06',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-math-unit06\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-unit07',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-math-unit07\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-unit08',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-math-unit08\.json$/,
            },
            {
              name: 'challenge-supplemental-activities',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/].*SupplementalActivities\.ts$/,
            },
            {
              name: 'curriculum-manifest',
              test: /[\\/]src[\\/]content[\\/]curriculum-manifest\.json$/,
            },
          ],
        },
      },
    },
  },
});
