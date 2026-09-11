import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mars Explorer',
    short_name: 'MarsExp',
    description: 'Explore Mars with real NASA data: 360° panoramas, live weather, and rover photos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050508',
    theme_color: '#e85d1a',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
