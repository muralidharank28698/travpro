'use client';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ marginTop: '1rem', padding: '10px 20px', cursor: 'pointer' }}
          >
            Go to Home
          </button>
        </div>
      </body>
    </html>
  );
}
