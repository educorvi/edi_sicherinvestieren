export const setDefaultInterceptor = (axios) => {
    const interceptor = function (config) {
        // config.headers.Authentication = "Basic YmdldGVtOnJoZWlu";
        if (!config.headers.Accept) {
            config.headers.Accept = "application/json";
        }
        config.params = {
            b_size: 1000,
            ...config.params,
        };
        return config;
    };

    axios.interceptors.request.use(interceptor);
};