// getData(query) - Goes out and targets REST api.
// query: The specific data we're looking for.
export const getData = async (query) => {
    // Valid Proxies for Data Requests:
    // - https://people.rit.edu/~dsbics/proxy/
    // - https://solace.ist.rit.edu/~dsbics/proxy

    const proxy = 'https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';
    // const proxy = 'https://solace.ist.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/';
    const link = proxy + query;
    const response = await fetch(link);
    return await response.json();
};