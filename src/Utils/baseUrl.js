export function baseUrl(){
const url = window.location.href;
const isAzure = url.includes('azurewebsites.net');
const baseURL = isAzure ? 'https://pvp-api.azurewebsites.net/' : 'https://localhost:7115/api/';
return baseURL;
}