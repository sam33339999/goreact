import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/main';
export default function Index({ name }) {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {name} - A Starter Kit For Build GoLang Application With React and Inertia.js.
      </div>
    </MainLayout>
  );
}
