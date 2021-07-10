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

test("create", async (done) => {
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