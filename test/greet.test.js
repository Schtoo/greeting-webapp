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
    let english = await englishLang.greeting('Molo', 'Gregg');
    await englishLang.greeting('Hello', 'Gregg');
    await englishLang.greeting('Hello', 'Schtoo');

    let counting = await englishLang.counter();
    assert.equal(2, counting);
  });

  it('should give you how many times each person is greeted', async function() {
    let xhosaLang = greet(pool);
    let lang = await xhosaLang.greeting("Vusi", "Molo");
        lang = await xhosaLang.greeting('Vusi', 'Molo');
        lang = await xhosaLang.greeting('Vusi', 'Molo');
        lang = await xhosaLang.greeting('Mike', 'Hello');
        lang = await xhosaLang.greeting('Mike', 'Hello');

    let greetedPeople = await xhosaLang.user('Vusi');
    assert.equal(3, greetedPeople);
  });
  it('should greet you in afrikaans', async function() {
    let afrikaansLang = greet(pool);
    let afriLang = await afrikaansLang.greeting("Mike", "Molo");
        afriLang = await afrikaansLang.greeting('Mike', 'Molo');
        afriLang = await afrikaansLang.greeting('Mike', 'Hello');
        afriLang = await afrikaansLang.greeting('Mike', 'Hello');

        let greetedTimes = await afrikaansLang.user('Mike');
        assert.equal(4, greetedTimes);
  });
  it('should erase the entire database', async function(){
    let resetDb = greet(pool);
    let dbReset = await resetDb.resetBttn();
    assert.equal(0, dbReset);
  });
});