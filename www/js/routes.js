
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/auth',
    componentUrl: './pages/auth.html',
  },
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
