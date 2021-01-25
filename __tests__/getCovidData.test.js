const fetch = require('node-fetch');
const getCovidData = require('../functions/getCovidData').handler;
const mockCovidDataResponse = require('./covidDataResponse.json')

describe('Get Covid Data Response', () => {
    it('successfully gets covid data labels and values', async () => {
        fetch.mockResponse(JSON.stringify(mockCovidDataResponse));
        const callback = jest.fn();
        const covidDataResponse = await getCovidData(null, null, callback);
        console.log(covidDataResponse);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith( null,
            expect.objectContaining({
                statusCode: 200,

            })
        );
    });
})
