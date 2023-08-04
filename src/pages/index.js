import Services from "@/app/services/Services";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomePage = () => {
    const [countries, setCountries] = useState([]);
    const [countriesFilter, setCountriesFilter] = useState([]);

    useEffect(() => {
        Services.getServiceCountries('')
            .then(result => { setCountries(result); setCountriesFilter(result); })
            .catch(error => console.log("Error en respuesta al servicio ", error));
    }, []);

    const searchCountryForName = (event) => {
        event.preventDefault();
        let inputValue = event.target.value;
        let filterCountry = countries.filter((item) => item['name'].official.toLowerCase().includes(inputValue.toLowerCase()))
        setCountriesFilter(filterCountry);
    };

    const searchCountryForRegion = async (event) => {
        event.preventDefault();
        const regionSelected = event.target.value == 'all' ? 'all' : `region/${event.target.value}`;
        const dataFilterResponse = await Services.getServiceCountries(regionSelected);
        setCountriesFilter(dataFilterResponse);
    };

    return (
        <>
            <div className="countries">
                <div className="countries__filters">
                    <form>
                        <input type="text" id="input--search" name="input--search" onChange={searchCountryForName} placeholder="Search for a country..." />
                        <select id="select--filter" name="select--filter" onChange={searchCountryForRegion}>
                            <option value="" disabled>Filter by Region</option>
                            <option value="all">All</option>
                            <option value="africa">Africa</option>
                            <option value="america">America</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                        </select>
                    </form>
                </div>
                {countriesFilter.map(item => {
                    return (
                        <div className="countries__country">
                            <Link href={`/detail?id=${item['cca2']}`} key={item['cca2']}>
                                <img alt={item['name'].official} src={item['flags'].png} />
                                <div className="countries__country__description">
                                    <div className="countries__country__description__name">{item['name'].official}</div>
                                    <div className="countries__country__description__population"><b>Poputalion:</b> {Intl.NumberFormat('es-ES', { style: 'currency', currency: 'COP' }).format(item['population']).replace("COP", "")}</div>
                                    <div className="countries__country__description__region"><b>Region:</b> {item['region']}</div>
                                    <div className="countries__country__description__capital"><b>Capital:</b> {item['capital']}</div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default HomePage;