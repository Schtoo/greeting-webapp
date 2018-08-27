describe("greet function", function() {
  it('counter should not increment if no name is inserted', function() {
    var counta = GreetFactory();
    counta.counter();
    assert.equal(counta.counter("0"), 0);
  })
  it('should greet a person in xhosa', function() {
    var englishLang = GreetFactory();
    englishLang.greeting('Molo, Gregg')
    assert.equal(englishLang.greeting("Gregg, IsiXhosa"), 'Molo, Gregg')
  })
  it('should give you a greeting in english', function() {
    var xhosaLang = GreetFactory();
    xhosaLang.greeting("Hello, Vusi")
    assert.equal(xhosaLang.greeting("Vusi, English"), 'Hello, Vusi')
  })
  it('should greet you in afrikaans', function() {
    var afrikaansLang = GreetFactory();
    afrikaansLang.greeting("Hallo, Mike")
    assert.equal(afrikaansLang.greeting("Mike, Afrikaans"), 'Hallo, Mike')
  })
});
