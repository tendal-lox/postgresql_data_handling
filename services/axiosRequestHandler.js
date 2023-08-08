const axios = require('axios')
const async = require('async')

// axios.interceptors.request.use(config => {
//     config.timeout = 2000
//     return config
// }, error => {
//     return Promise.reject(error)
// })

axios.interceptors.response.use(response => {
    return response.data
}, async error => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout'))
        console.error('Request timeout, Resending request')

    return Promise.reject(error)
    }
)

async function axiosHelpFunction(res) {
    return async.retry({times: 5, interval: 2000}, async () => {
        console.log('request sent')
        const result = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users',
            // responseType: 'stream',
            timeout: 2000
        })
        console.log('response received')
        // result.pipe(res)
        res.send(result)
        return result
    })
}

module.exports = axiosHelpFunction