'use client';
import React from 'react';
export default class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? (this.props.fallback ?? <div className="rounded-full border border-stone-300 bg-white/90 px-3 py-1 font-mono text-[10px] tracking-widest text-stone-600">Gagal memuat model</div>) : this.props.children; }
}
