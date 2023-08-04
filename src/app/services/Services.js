class Services {

    getServiceCountries = async (endpoint) => {
        const responseCountries = await fetch(`https://restcountries.com/v3.1/${endpoint == '' ? 'all' : endpoint}`);
        const dataCountries = await responseCountries.json();

        return dataCountries;
    }

}

export default new Services();