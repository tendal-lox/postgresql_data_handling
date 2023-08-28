const test = require('ava')
const { Pool } = require('pg')
// const request = require('supertest')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'users_profile_test',
  user: 'postgres',
  password: 'mypostgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000
})

test.before(async t => {
  await pool.connect()
  pool.on('error', (err) => {
    console.log('error ', err)
    process.exit(1)
  })
})

test.failing('Response of requesting to /members should be equal to stored data in dataBase', async t => {
  // Arrange
//   const usersIndividualProfile = await pool.query('select * from individual_profile order by id asc')
  // Act
  t.fail()
})
