/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    if(!options?.url) {
        return;
    }

    const requestOption = {};

    requestOption.headers = {
        'Accept': 'application/json'
    };

    if(options?.method) {
        requestOption.method = options?.method;
    }

    if(options?.data) {
        if(options?.method != 'GET') {
            const dataFormat = new FormData();

            for(let key in options.data) {
                dataFormat.append(key, options.data[key]);
            }

            requestOption.body = dataFormat;

        } else {
            const getParams = new URLSearchParams(options.data).toString();
            options.url += '?' + getParams;
        }
    }

    if(options?.callback) {
        const request = fetch(options.url, requestOption);

        request.then(response => {
            if(response.ok) {
                return response;
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(data => options.callback(null, data))
        .catch(error => {
            options.callback(error);
        });
    }
};

