export const setDefaultInterceptor = (axios) => {
    const interceptor = function (config) {
        if (!config.headers.Accept) {
            config.headers.Accept = "application/json";
        }
        config.params = (config.method === "post")?config.params:{
            b_size: 1000,
            ...config.params,
        };
        return config;
    };

    axios.interceptors.request.use(interceptor);
};
