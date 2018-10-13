function configureNProgress(NProgress) {
  NProgress.configure({
    showSpinner: false,
    speed: 250
  });
  NProgress.start();
}

import('../styles/main.sass')
  .then(() => import('nprogress').then(configureNProgress))
  .then(() => import('../styles/common/_fonts.sass'))
  .then(() => import('./app'));