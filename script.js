import fetch from 'fetch'
const uri = 'www.metaweather.com/api/'
const fetchCities = (city) => {
    return fetch(`${uri}/`)
    .then((response) => response.json())
    .then((res) => return res)
    .catch(err => throw err)
}

const handleReq = async (city) => {
    try {
        return await fetchCities(city)
    } catch(err) {
        return err
    }
}

handleReq("nairobi")
.then((weather) => {
    console.log(weather)
})