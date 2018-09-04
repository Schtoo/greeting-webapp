module.exports = function (stored) {
        var names = stored || {};

        function resetBttn (){
          names = {};
          counter = 0;
          lang = '';
          Name = '';
        }
      
        function giveName(name) {
          if (name) {
            if (names[name] === undefined) {
                names[name] = 0;
             }
           }
           return name;
        }
      
        function greeting(Name, lang) {
          Name = Name.charAt(0).toUpperCase() + Name.slice(1);
          if(Name !=='' && lang!==undefined){
            giveName(Name);
            if (lang === "English") {
              return "Hello " + Name;
            } else if (lang === "isiXhosa") {
              return "Molo " + Name;
            } else if (lang === "Afrikaans") {
              return "Hallo " + Name;
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
          getMap,
          resetBttn
        }
}