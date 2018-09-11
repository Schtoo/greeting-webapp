const assert = require('assert');
const greet = require('../greetingsFactory');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greeted_users';

const pool = new Pool({
    connectionString
});
describe("greet function", async function() {
  beforeEach (async function(){
    await pool.query('delete from users');
  });

  it('should give you how many people are greeted', async function() {
    let englishLang = greet(pool);
    let english = await englishLang.greeting('Gregg', 'Molo');
    await englishLang.greeting('Gregg', 'Hello');
    await englishLang.greeting('Schtoo', 'Hello');

    let counting = await englishLang.counter();
    assert.equal(2, counting);
  });

  it('should give you a greeting in english', async function(){
    let english = greet(pool);
    let greetEnglish = await english.greeting('Schtoo', 'English');
    assert.equal(greetEnglish, 'Hello Schtoo');
  });

  it('should greet you in Afrikaans', async function(){
    let afrikaans = greet(pool);
    let greetAfrikaans = await afrikaans.greeting('Schtoo', 'Afrikaans');
    assert.equal(greetAfrikaans, 'Hallo Schtoo');
  });

  it('should give a greeting in Xhosa', async function(){
    let xhosas = greet(pool);
    let greetXhosa = await xhosas.greeting('Mike', 'isiXhosa');
    assert.equal(greetXhosa, 'Molo Mike');
  });

  it('should give you how many times each person is greeted', async function() {
    let howManyTimes = greet(pool);
    
    await howManyTimes.greeting("Vusi", "IsiXhosa");
    await howManyTimes.greeting('Vusi', 'IsiXhosa');
    await howManyTimes.greeting('Vusi', 'IsiXhosa');
    await howManyTimes.greeting('Mike', 'English');
    await howManyTimes.greeting('Mike', 'English');
    
    let user = await howManyTimes.eachPerson('Vusi');
    //console.log(user);
    assert.equal(3, user);
  });

  it('should erase the entire database', async function(){
    let resetDb = greet(pool);
    let dbReset = await resetDb.resetBttn();
    assert.equal(0, dbReset);
  });

  after(function(){
    pool.end();
  });
});