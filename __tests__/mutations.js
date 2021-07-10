const app = require("../src/server");
const supertest = require("supertest");
const { stopDatabase } = require("../src/database");

const request = supertest(app);

afterAll(async () => {
  await stopDatabase();
});

test("create author mutation", async (done) => {
  request
    .post("/graphql")
    .send({
      query:`mutation { 
              createAuthor(name: "Foo Bar") {
               name
              } 
            }`
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.createAuthor.name).toEqual("Foo Bar");
      done();
    });
});