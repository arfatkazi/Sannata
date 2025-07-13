let navigate = null;
export const setNavigate = (fn) => (navigate = fn);
export const navigateTo = (path) => navigate?.(path);
