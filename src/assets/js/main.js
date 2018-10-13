switch (window.location.pathname) {
  case '/callback':
    require.ensure([], () => {
      require('./callback'); // eslint-disable-line global-require
    });
    break;
  default:
    require.ensure([], () => {
      require('./appMain'); // eslint-disable-line global-require
    });
    break;
}