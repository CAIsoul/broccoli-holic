const config: any = {
    development: {
        debug: true,
        baseApiUrl: "http://127.0.0.1:5000",
    },
    production: {
        debug: false,
        baseApiUrl: "",
    }
}

export default config['development'];