// -------------------------------------------------------------------------- //
//                                                                            //
// Adds a method to the specified object.                                     //
//                                                                            //
// -------------------------------------------------------------------------- //

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addMethod.js

export default function(context, name, fn) {

  context[name] = function() {
    let result = fn.apply(this, arguments);
    return result === undefined ? this.clone() : result;
  };

}
