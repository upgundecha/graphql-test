const app = require("../src/server");
const supertest = require("supertest");
const { stopDatabase } = require("../src/database");

const request = supertest(app);

afterAll(async () => {
  await stopDatabase();
});

test("fetch authors", async (done) => {
  request
    .post("/graphql")
    .send({
      query: "{ authors{ id, name} }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.authors.length).toEqual(3);
      names = res.body.data.authors.map((val,index) => val.name)
      expect(names).toEqual(expect.arrayContaining(["Unmesh Gundecha","Dima Kovalenko","James Bond"]));
      done();
    });
});

test("fetch author", async (done) => {
  request
    .post("/graphql")
    .send({
      query: "{ author(id: 1) { name } }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.author.name).toEqual("Unmesh Gundecha");
      done();
    });
});

test("query that does not exist", async () => {
  const response = await request
    .post("/graphql")
    .send({
      query: "{ reviews { id, rating, comment} }",
    })
    .set("Accept", "application/json");

  expect(response.status).toBe(400);
});
