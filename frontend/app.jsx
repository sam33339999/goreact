import './css/app.css';
import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: async (name) => {
    // Because it uses eager: false, it dynamically references the required js; and it uses promises.
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: false })
    // console.log('Looking for component:', name)            // View the name passed from backend
    // console.log('Available pages:', Object.keys(pages))    // View the actual found files
    // console.log('Full path:', `./${name}.jsx`)             // View the complete path
    const page = await pages[`./${name}.jsx`]()               // <--- here is different with eager: true (it is a promise.)
    // console.log('Found page:', page)                       // View whether it was found
    return page.default || page
  },

  // If using eager: true, then the method is synchronous, so you can return the result directly.
  // resolve: (name) => {
  //   const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
  //   const page = pages[`./${name}.jsx`]
  //   return page.default || page
  // },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
