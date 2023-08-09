import { postData, fetchData } from './apiClient';

export function getCusertomerDetails(Id) {
    return fetchData(`customer/${Id}`);
}