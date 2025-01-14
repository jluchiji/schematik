/**
 * test/schematik.spec.js
 *
 * @author  Denis Luchkin-Zhou <wyvernzora@gmail.com>
 * @license MIT
 */
const Schematik      = dofile('index');


describe('Schematik', function() {

  describe('schema', function() {

    it('should throw when applying a non-object', function() {
      expect(() => { new Schematik().schema(123); })
        .to.throw('Value must be a string or an object.');
    });

  });

  describe('copyTo', function() {

    it('should throw when copying to a non-Schematik', function() {
      expect(() => {
        const object = { };
        new Schematik().copyTo(object);
      })
      .to.throw('Cannot copy to a non-Schematik object.');
    });

  });

  describe('toString', function() {

    it('should return [object Schematik]', function() {
      const actual = new Schematik().toString();

      expect(actual)
        .to.equal('[object Schematik]');
    });

  });

  describe('__type', function() {

    it('should get the type if none is specified', function() {
      const object = Schematik.number();
      const actual = object.__type();

      expect(actual)
        .to.equal('number');
    });

    it('should throw if type is not whitelisted', function() {
      const object = new Schematik();

      expect(() => { object.__type('test'); })
        .to.throw('Invalid type value test');
    });

    it('should not allow overwriting', function() {
      const object = Schematik.number();

      expect(() => { object.__type('string'); })
        .to.throw('Overwriting existing type is not allowed.');
    });

  });

  describe('use', function() {

    it('should not use the same extension twice', function() {
      const ext = Sinon.spy();

      Schematik.use(ext);
      Schematik.use(ext);

      expect(ext)
        .to.be.calledOnce;
    });

  });

  describe('typedef', function() {

    it('should define a shortcut', function() {
      Schematik.typedef('test01', Schematik.String, t => t.matches(/[a-z]/));

      expect(Schematik.prototype)
        .to.have.property('test01')
        .that.is.a('function');
      expect(Schematik)
        .to.have.property('test01')
        .that.is.a('function');

      const actual = Schematik.test01();
      expect(actual)
        .to.be.instanceOf(Schematik);
      expect(actual.done())
        .to.be.deep.equal({ type: 'string', pattern: '[a-z]' });
    });

    it('should not allow overwrites', function() {
      expect(() => { Schematik.typedef('string', function() { }); })
        .to.throw('Cannot define type named \'string\'');
    });

    it('should make base param optional', function() {
      Schematik.typedef('test03', t => t.min.count(10));
      const actual = Schematik.test03();

      expect(actual)
        .to.be.an.instanceOf(Schematik.Object);
      expect(actual.done())
        .to.deep.equal({
          type: 'object',
          minProperties: 10,
          additionalProperties: true
        });
    });

    it('should pass params to callback expr', function() {
      const spy = Sinon.spy(t => t);
      Schematik.typedef('test04', spy);
      Schematik.test04('foo', 'bar');

      expect(spy)
        .to.be.calledOnce;
      const args = Array.prototype.slice.call(spy.firstCall.args, 1);
      expect(args)
        .to.deep.equal([ 'foo', 'bar' ]);
    });
  });

});
