const axios = require('axios')

axios.interceptors.request.use(config => {
    config.timeout = 800
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response.data
}, async error => {
    console.log('request sent')
    return await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        responseType: 'stream'
    })
    // return Promise.reject(error)
    }
)

async function axiosHelpFunction(res) {

    const result = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        responseType: 'stream'
    })
}

exports.axiosRequestFunction = async (req, res) => {
    axiosHelpFunction(res)
}