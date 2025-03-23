const config: any = {
    development: {
        debug: true,
        baseApiUrl: "",
    },
    production: {
        debug: false,
        baseApiUrl: "",
    }
}

export default config['development'];