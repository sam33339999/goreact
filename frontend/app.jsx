import './css/app.css';
import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    // console.log('Looking for component:', name)           // 查看后端传递的名称
    // console.log('Available pages:', Object.keys(pages))   // 查看实际找到的文件
    // console.log('Full path:', `./${name}.jsx`)      // 查看拼接的完整路径
    const page = pages[`./${name}.jsx`]
    // console.log('Found page:', page)                      // 查看是否找到
    return page.default || page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
