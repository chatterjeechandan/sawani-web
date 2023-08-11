const BASE_URL = 'https://sawaniapi.azurewebsites.net';

export async function fetchData(endpoint) {
    try {
        const headers = createHeaders();
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            headers,
        });
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


function createHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    };

    const userData = JSON.parse(localStorage.getItem('loginInfo'));
    if (userData) {
        headers['Authorization'] = `Bearer ${userData.token}`;
    }

    return headers;
}

export async function makeRequest(method, endpoint, body) {
    try {
        const headers = createHeaders();

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


export async function fetchSessionData(endpoint, token) {
    try {  
        const method ='GET';     
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method,
            headers
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while making the API request.');
    }
}
