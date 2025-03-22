const config: any = {
    development: {
        debug: true,
        baseApiUrl: "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod",
    },
    production: {
        debug: false,
        baseApiUrl: "",
    }
}

export default config['development'];