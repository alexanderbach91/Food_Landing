const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();
};

const getItemData = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not get data from ${url} , status: ${result.status}`);
    }

    return await result.json();
};


export {postData , getItemData};