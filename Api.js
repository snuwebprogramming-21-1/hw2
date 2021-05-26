const defaultUrl = 'https://snu-coin.herokuapp.com';
const defaultHeaders = {
    'Content-Type': 'application/json'
}

const post = async (url, body={}, extraHeaders={}) => {
    const res = await fetch(`${defaultUrl}/${url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {...defaultHeaders, ...extraHeaders}
    });

    return await res.json();
}

const get = async (url, query={}, extraHeaders={}) => {
    const res = await fetch(`${defaultUrl}/${url}`, {
        method: 'GET',
        headers: {...defaultHeaders, ...extraHeaders}
    });

    return await res.json();
}

const login = async (id, password) => {
    return await post('login', {id, password});
}

const loadMarkets = async() => {
    return await get('markets');
}

const loadMarket = async(market) => {
    return await get(`markets/${market}`);
}

export {
    login,
    loadMarket,
    loadMarkets,
}
