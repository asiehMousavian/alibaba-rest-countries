export default process.env.NODE_ENV === "production"
    ? {
        baseUrl: "https://restcountries.com/v2/",
        timeout: 30000,
    }
    : {
        baseUrl: "https://restcountries.com/v2/",
        timeout: 20000,
    };
