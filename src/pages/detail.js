import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Services from '@/app/services/Services';
import Link from 'next/link';

const DetailPage = () => {
    const router = useRouter();
    const [country, setCountry] = useState([]);
    const [borderCountry, setBorderCountry] = useState([]);
    useEffect(() => {
        const queryValue = router.query.id;
        Services.getServiceCountries(`alpha/${queryValue}`)
            .then(result => { setCountry(result); getNameBorderCountry(result[0].borders) })
            .catch(error => console.log("Error", error));
    }, [router.query]);

    const getNameBorderCountry = (borders) => {
        let array = [...borderCountry];
        borders.forEach(element => {
            Services.getServiceCountries(`alpha/${element}`)
                .then(item => {
                    array = [...array, item[0].name.official];
                    setBorderCountry(array);
                }).catch(error => console.log("Error", error));
        });
    };

    if (country.length > 0) {
        return (
            <div className='detail'>
                <Link href={'/'} className='detail__button'>
                    <button>Back</button>
                </Link>
                <div className='detail__flag'>
                    <img alt={country[0].name.official} src={country[0]['flags'].png} />
                </div>
                <div className='detail__content'>
                    <div className='detail__content__name'>{country[0].name.official}</div>
                    <div className="detail__content left">
                        <div className='detail__content__population'><b>Population:</b> {Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' }).format(country[0].population).replace("COP", "")}</div>
                        <div className='detail__content__region'><b>Region:</b> {country[0].region}</div>
                        <div className='detail__content__subregion'><b>Sub Region:</b> {country[0].subregion}</div>
                        <div className='detail__content__capital'><b>Capital:</b> {country[0].capital}</div>
                    </div>
                    <div className="detail__content right">
                        <div className='detail__content__tld'><b>Top Level Domain:</b> {country[0].tld[0]}</div>
                        <div className='detail__content__currencies'><b>Currencies:</b>  {country[0].currencies[Object.keys(country[0].currencies)].name}</div>
                        <div className='detail__content__languages'>
                            <b>Languagues:</b> {Object.keys(country[0].languages).map(item => {
                                return (
                                    <span className='detail__content__languages__language'>{country[0].languages[item]}, </span>
                                )
                            })}
                        </div>
                    </div>
                    <div className='detail__content__borders'>
                        <b>Border countries:</b> {borderCountry.map(item => {
                            return (
                                <div className='detail__content__borders__border'>{item}</div>
                            )
                        })}
                    </div>
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