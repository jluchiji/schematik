var sinon          = require('sinon');
var expect         = require('chai').expect;

var load           = require('../loader.js');
var Schematik      = load('schematik.js');
var Unique         = load('addons/unique.js');
var Util           = load('util');

Unique(Schematik.prototype, Util);

describe('.unique', function() {

  beforeEach(function() { this.obj = new Schematik(); });

  it('should add the .unique property', function() {
    expect(this.obj.unique).to.be.an.instanceof(Schematik);
  });

  it('should set `uniqueItems` schema value', function() {
    expect(this.obj.unique.schema('uniqueItems')).to.equal(true);
  });

});
