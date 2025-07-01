import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Index } from '../pages/Index';


export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}
