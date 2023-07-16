const BASE_URL = 'https://sawaniapi.azurewebsites.net';

export async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while making the API request.');
    }
}

export async function postData(endpoint, body) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while making the API request.');
    }
}
