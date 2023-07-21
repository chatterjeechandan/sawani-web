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
    return makeRequest('POST', endpoint, body);
}

export async function updateData(endpoint, body) {
    return makeRequest('PUT', endpoint, body);
}

export async function deleteData(endpoint, body) {
    return makeRequest('DELETE', endpoint, body);
}

export async function makeRequest(method, endpoint, body) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const userData = JSON.parse(localStorage.getItem('loginInfo'));
        if (userData) {
            headers['Authorization'] = `Bearer ${userData.token}`;
        }

        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method,
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while making the API request.');
    }
}
