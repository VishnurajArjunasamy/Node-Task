import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
chai.should();

describe("User API", () => {
  // valid login
  it("POST /login should retrun  message and token", () => {
    const user = { userName: "vishnu", password: "random" };
    chai
      .request(app)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql(`${user.userName} Logged in`);
        res.body.should.have.property("token");
      });
  });
  //invalid login
  it("POST /login should retrun  error message ", () => {
    const user = { userName: "ron", password: "random" };
    chai
      .request(app)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Invalid username or Password");
      });
  });

  //valid registeration
  it("POST /register should return a messsage and token", () => {
    const newUser = { userName: "me", password: "random" };
    chai
      .request(app)
      .post("/register")
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql(`${newUser.userName} registered successfully`);
        res.body.should.have.property("token");
      });
  });
  //invalid registeration
  it("POST /register should return a error messsage", () => {
    const newUser = { userName: "vishnu", password: "random" };
    chai
      .request(app)
      .post("/register")
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User already exists");
      });
  });
});
