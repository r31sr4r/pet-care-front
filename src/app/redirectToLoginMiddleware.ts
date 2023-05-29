import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

export const redirectToLoginMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload;

    const status = error.status;
    
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      window.location.href = "/signin";
    }
  }
  return next(action);
};
