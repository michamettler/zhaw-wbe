const parseToProto = (jsonString, proto) => {
    return Object.assign(proto, JSON.parse(jsonString))
}

module.exports = { parseToProto}

/*
const parseToProto = require('../../lib/jasmine_examples/parse-to-proto.js')

describe('ParseToProto', function () {
  let proto
  let obj
  
  beforeEach(function () {
    proto = { category: 'animal' }
    obj = parseToProto.parseToProto('{"type":"cat","name":"Mimi","age":3}', proto)
  })

  it('should be able to parse', function () {
    expect(obj.age).toEqual(3)
    expect(obj.category).toEqual('animal')
  })
})

*/