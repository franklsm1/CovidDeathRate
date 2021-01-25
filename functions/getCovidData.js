const fetch = require('node-fetch');

let fallbackResponse;
exports.handler = async (event, context, callback) => {
    let covidDataResponse;
    const covidApi = 'https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=demographic_charts';
    const covidApiOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'X-App-Token': 'yjcJFxUFAaJCLv3qBBy93X65U'
        },
    }
    try {
        const covidResponse = await fetch(covidApi,covidApiOptions)
            .then(res => res.json());
        const ageCases = covidResponse.age_cases;
        const ageDeaths = covidResponse.age_deaths;
        const ageLabels = ageCases.map(cases => cases.age_group);
        const ageDeathRates = ageCases.map((cases, index) =>  {
            return Number(ageDeaths[index].count / cases.count * 100 ).toFixed(3);
        });
        covidDataResponse = {
            labels: ageLabels,
            data: ageDeathRates
        }
        console.log('covid data response:', covidDataResponse);
        fallbackResponse = covidDataResponse;
    }  catch (err) {
        console.log('err:', err);
        if (fallbackResponse) {
            covidDataResponse = fallbackResponse;
        } else {
            callback(null, { statusCode: 500 });
            return;
        }
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(covidDataResponse),
    });
    return covidDataResponse;
}
