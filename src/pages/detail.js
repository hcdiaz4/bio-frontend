import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Services from '@/app/services/Services';

const DetailPage = () => {
    const router = useRouter();
    const [country, setCountry] = useState([]);
    useEffect(() => {
        const queryValue = router.query.id;
        console.log("idddd", queryValue);
        Services.getServiceCountries(`alpha/${queryValue}`)
            .then(result => { setCountry(result); })
            .catch(error => console.log("Error", error));
        console.log("Hola mundo", country);
    }, [router.query]);

    if (country.length > 0) {
        return (
            <div className='detail'>
                <div>{country[0].name.common}</div>
                <div>Population: {country[0].population}</div>
                <div>Region: {country[0].region}</div>
                <div>Sub Region: {country[0].subregion}</div>
                <div>Capital {country[0].capital}</div>
                <div>Top Level Domain: {country[0].tld[0]}</div>
                <div>Currencies: {country[0].currencies[Object.keys(country[0].currencies)].name}</div>
                <div>
                    Languagues: {Object.keys(country[0].languages).map(item => {
                        return (
                            <span>{country[0].languages[item]}, </span>
                        )
                    })}
                </div>
                <div>
                    Border countries: 
                </div>
            </div>
        )
    } else {
        return (
            <div>Cargando...</div>
        )
    }
};

export default DetailPage;