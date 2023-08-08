const RequestHandler = require('./axiosRequestHandler')
const {insertRecordMethod, findAllRecordMethod, findRecordByName, insertRecordUsersAddress} = require('./dataBase')
const async = require('async')

exports.axiosRequestFunction = async (req, res) => {
    const allUsers = await RequestHandler(res)
    const allRec = await findAllRecordMethod()

    async.each(allUsers, async (eachObj) => {
        try {
            if (allRec.users_profile.rows.length === 0 || allRec.users_address.rows.length === 0 ) {
                await insertRecordMethod(eachObj.id, eachObj.name, eachObj.username, eachObj.email)

                const funcLevel1 = await insertRecordUsersAddress(eachObj.address.street, eachObj.address.city, eachObj.id)
                await funcLevel1(eachObj.address.geo.lat, eachObj.address.geo.lng)

                return
            }
            const data = await findRecordByName(eachObj.name)
            const recordName = data.rows[0].name

            if (recordName !== eachObj.name) {
                await insertRecordMethod(eachObj.name, eachObj.username, eachObj.id, eachObj.email)
            } else {
                console.log(`record exist for username: ${eachObj.username} and profile_id:${eachObj.id}`)
            }
        } catch (err) {
            console.error('Something went wrong with this recored which is stored in database', err)
        }
    })
}

exports.getAllUsersFunction = async (req, res) => {
    const listOfMembers = await findAllRecordMethod()
    console.log('list of all members successfully received')
    res.send(listOfMembers.allData.rows)
}