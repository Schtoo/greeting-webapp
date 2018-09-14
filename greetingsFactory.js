module.exports = function (pool) {
  async function greeting(Name, lang) {
      if (Name !== '' && lang !== undefined) {
        Name = Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()

        let result = await pool.query('select id from users where names=$1', [Name]);
       // console.log(result);
        if (result.rowCount === 0) {
          await pool.query('INSERT into users (names, count) values ($1, 0)', [Name]);
        }
        await pool.query('update users set count=count+1 where names=$1', [Name]);

        if (lang === "English") {
          return "Hello " + Name;
        } else if (lang === "isiXhosa") {
          return "Molo " + Name;
        } else if (lang === "Afrikaans") {
          return "Hallo " + Name;
        }
      }
    }
    
    async function counter (counta) {
      counta = await pool.query('SELECT * FROM users');
      return counta.rowCount;
    }

    async function resetBttn () {
      let resetCounta = await pool.query('DELETE FROM users');
      lang = "";
      Name = '';
      return resetCounta.rowCount;
    }

    async function user () {
      let greetedUser = await pool.query('SELECT * FROM users ORDER BY count DESC');
     // console.log(greetedUser);
      return greetedUser.rows;
    }

    async function eachUser (name) {
      let userCount = await pool.query('SELECT * FROM users WHERE names =$1',[name]);
     // console.log(userCount);
      return userCount.rows[0];
    }

  return {
    greeting,
    counter,
    resetBttn,
    user,
    eachUser
  }
}
