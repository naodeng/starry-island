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
              name: 'challenge-manifest-grade1-unit09',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-math-unit09\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term1-math',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-math\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term1-english',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-english\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-english-unit02',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-english-unit02\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-english-unit03',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-english-unit03\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-english-unit04',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-english-unit04\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-english-unit05',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-english-unit05\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-english-unit06',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-english-unit06\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term1-semester',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term1-semester\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-math',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-math\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-english-unit01',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-english-unit01\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-english-unit02',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-english-unit02\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-english-unit03',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-english-unit03\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-english-unit04',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-english-unit04\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-english-unit05',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-english-unit05\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-english-unit06',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-english-unit06\.json$/,
            },
            {
              name: 'challenge-manifest-grade1-term2-semester',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade1-term2-semester\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-chinese',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-chinese-unit\d{2}\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit01',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit01\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit03',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit03\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit04',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit04\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit05',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit05\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit06',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit06\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit07',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit07\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit08',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit08\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-unit09',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-unit09\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-english',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-english-unit\d{2}\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-chinese-stages',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-chinese-stages\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-math-stages',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-math-stages\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term1-english-stages',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term1-english-stages\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-chinese-unit01',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-chinese-unit01\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-chinese-units02-04',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-chinese-unit0[2-4]\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-chinese-units05-08',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-chinese-unit0[5-8]\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-chinese-stages',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-chinese-stages\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-math-units01-05',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-math-unit0[1-5]\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-math-units06-10',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-math-unit(?:0[6-9]|10)\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-math-stages',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-math-stages\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-english-units01-03',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-english-unit0[1-3]\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-english-units04-06',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-english-unit0[4-6]\.json$/,
            },
            {
              name: 'challenge-manifest-grade2-term2-english-stages',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilot-manifest-grade2-term2-english-stages\.json$/,
            },
            {
              name: 'challenge-supplemental-grade2-term1-math',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilotSupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade3-term1-english',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilotEnglishSupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade5-term1-chinese',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]pilotChineseSupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade1-term1-math',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade1MathUnit\d{2}SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade1-term1-english',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade1Term1EnglishUnit\d{2}SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade1-term2-math',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade1Term2MathUnit\d{2}SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade1-term2-english',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade1Term2EnglishUnit\d{2}SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade2-term1-chinese',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade2Term1ChineseUnit\d{2}SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade2-term1-english',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade2Term1EnglishUnit\d{2}SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade2-term2-chinese',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade2Term2ChineseUnit0[1-8]SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade2-term2-math',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade2Term2MathUnit(?:0[1-9]|10)SupplementalActivities\.ts$/,
            },
            {
              name: 'challenge-supplemental-grade2-term2-english',
              test: /[\\/]src[\\/]challenges[\\/]content[\\/]grade2Term2EnglishUnit0[1-6]SupplementalActivities\.ts$/,
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
