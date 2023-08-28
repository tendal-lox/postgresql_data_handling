const test = require('ava')
const axiosCall = require('../services/axiosRequestHandler')
const { Pool } = require('pg')
const async = require('async')

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

test('Should receive and store axios response objects, in the dataBase. Only individual profile', async t => {
  // Arrange
  t.plan(10)
  const data = await axiosCall()

  await pool.query('drop table individual_profile_test')
  await pool.query(`create table individual_profile_test
    (id int not null primary key, name varchar(255) not null, username varchar(255) not null, email varchar(255))`)

  // Act
  return async.each(data, async eachUserObject => {
    const insertStatus = await pool.query('insert into individual_profile_test(id, name, username, email) values($1, $2, $3, $4)',
      [eachUserObject.id, eachUserObject.name, eachUserObject.username, eachUserObject.email])

    // Assert
    t.like(insertStatus, { command: 'INSERT', rowCount: 1 })
  })
})
