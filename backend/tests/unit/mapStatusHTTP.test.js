const chai = require('chai');

const { expect } = chai;
const mapStatusHTTP = require('../../src/utils/mapStatusHTTP');

describe('mapStatusHTTP', function () {
  it('should return 200 for "SUCCESSFUL"', function () {
    expect(mapStatusHTTP('SUCCESSFUL')).to.equal(200);
  });

  it('should return 201 for "CREATED"', function () {
    expect(mapStatusHTTP('CREATED')).to.equal(201);
  });

  it('should return 404 for "NOT_FOUND"', function () {
    expect(mapStatusHTTP('NOT_FOUND')).to.equal(404);
  });

  it('should return 409 for "CONFLICT"', function () {
    expect(mapStatusHTTP('CONFLICT')).to.equal(409);
  });

  it('should return 422 for "INVALID_VALUE"', function () {
    expect(mapStatusHTTP('INVALID_VALUE')).to.equal(422);
  });

  it('should return 500 for an unknown status', function () {
    expect(mapStatusHTTP('UNKNOWN_STATUS')).to.equal(500);
  });
});
