import { Country, City } from 'country-state-city';
// @ts-ignore
import { ICountry, IState, ICity } from 'country-state-city'


const GetAllCountries = () => {
    const countrie = Country.getAllCountries()
    return countrie
}

const GetCityByCountry = (countryCode: string) => {
    const states = City.getCitiesOfCountry(countryCode)
    return states
}

export const GetCityByCountryName = (countryName: string) => {
  const country = Country.getAllCountries().find(
    (c: ICountry) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  
  if (country) {
    return City.getCitiesOfCountry(country.isoCode);
  }
  
  return [];
}


const getVilleFromSessionStorage = () => {
    // @ts-ignore
    const ville = sessionStorage.getItem('current-ville') ? JSON.parse(sessionStorage.getItem('current-ville')) : { name: '', countryCode: '', stateCode: '', latitude: '', longitude: '' }
    return ville
}

const updateVille = () => {
    const ville = getVilleFromSessionStorage();
    return ville
}

const getFilterParams = () => {
    const filterParams = {
        country: localStorage.getItem('country') || '',
        ville: localStorage.getItem('ville') || '',
        periode: localStorage.getItem('periode') || '',
        categorie: localStorage.getItem('categorie')?.toLocaleLowerCase() || 'tout',
    }
    return filterParams
}


export { GetAllCountries, GetCityByCountry, updateVille, getFilterParams }