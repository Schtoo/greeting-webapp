module.exports = function (stored) {
        var names = stored || {};
      
        function giveName(name) {
          if (name) {
            if (names[name] === undefined) {
                names[name] = 0;
             }
           }
           return name;
        }
      
        function greeting(name, lang) {
          if(name !=='' && lang!==undefined){
            giveName(name);
            if (lang === "English") {
              return "Hello " + name;
            } else if (lang === "isiXhosa") {
              return "Molo " + name;
            } else if (lang === "Afrikaans") {
              return "Hallo " + name;
            }
          }
         
        }
      
        function counter() {
          return Object.keys(names).length;
        }
      
        function getMap() {
          return names;
        }
        return {
          greeting,
          counter,
          getMap
        }
}
