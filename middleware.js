// Acesso restrito para testes. Remova este arquivo quando o site for público.
export const config = {
  matcher: '/((?!api|_vercel).*)',
};

const USER = 'steve';
const PASS = 'teste2026';

export default function middleware(request) {
  const header = request.headers.get('authorization');

  if (header && header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const separator = decoded.indexOf(':');
      const user = decoded.slice(0, separator);
      const pass = decoded.slice(separator + 1);
      if (user === USER && pass === PASS) return;
    } catch {
      // credencial malformada: cai no 401
    }
  }

  return new Response('Acesso restrito — site em testes.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Steve Jobs Imports", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
