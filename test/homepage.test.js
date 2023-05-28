const request = require('supertest');
const assert = require('chai').assert;
const app = require('../index'); // Path to your main file

let server;

beforeAll((done) => {
  server = app.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Express App', () => {
  it('should start the server without errors', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        done();
      });
  });
});
