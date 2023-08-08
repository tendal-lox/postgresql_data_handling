const {Pool} = require('pg')

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

exports.DB_Setup = async () => {
    await pool.connect()
}

exports.findAllRecordMethod = async () => {
    return {
        users_profile: await pool.query('select * from individual_profile order by id asc'),
        users_address: await pool.query('select * from users_address order by id asc'),
        allData: await pool.query(`select * from individual_profile as IP join users_address as UA on IP.id = UA.user_profile_id`)
    }
}

exports.insertRecordMethod = async (id, name, username, email) => {
    await pool.query(`insert into individual_profile(id, name, username, email) values($1, $2, $3, $4)`,
    [id, name, username, email])
    console.log(`record inserted for username: ${username} and profile_id:${id}`)
}

exports.insertRecordUsersAddress = async (street, city, userId) => {
    return async (geo_lat, geo_lng) => {
        await pool.query('insert into users_address(street, city, geo_lat, geo_lng, user_profile_id) values($1, $2, $3, $4, $5)',
        [street, city, geo_lat, geo_lng, userId])
    }
}

exports.findRecordByName = async (name) => {
    return await pool.query(`select name from individual_profile as IP
    join users_address as UA on IP.id = UA.user_profile_id group by ip.id having name = $1`, [name])
}