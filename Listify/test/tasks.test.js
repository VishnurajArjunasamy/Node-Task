import chai from "chai";
import chaiHttp from "chai-http";
import tokenGenerator from "../utils/tokenGeneration.js";
import app from "../app.js";
import taskData from "../data/taskData/vishnu.json" assert { type: "json" };
import { assert } from "chai";

chai.use(chaiHttp);
chai.should();

describe("Tasks API", () => {
  let token;
  before(() => {
    const payload = { name: "vishnu" };
    token = tokenGenerator(payload);
  });

  //valid GET /tasks
  it("GET /tasks should return all tasks", () => {
    chai
      .request(app)
      .get("/tasks")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data").eql(taskData.slice(0, 10));
        res.body.should.have.property("currentPage").eql(1);
        res.body.should.have.property("totalPages").eql(3);
      });
  });
  //valid  GET /tasks/id
  it("GET /tasks/id should return specific tasks", () => {
    const taskId = 370;
    const task = {
      title: "games",
      description: "NFS",
      priority: "max",
      dueDate: "2022-03-23",
      taskComments: ["random", "another"],
      id: "370",
      timestamp: "2023-04-08T12:04:55.744Z",
    };
    chai
      .request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("task").eql(task);
      });
  });
  //invalid  GET /tasks/id
  it("GET /tasks/id should return a not found message", () => {
    const taskId = 12;
    chai
      .request(app)
      .get(`/tasks/${taskId}`)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Task not found");
      });
  });
  //valid  POST /tasks/
  it("POST /tasks/ should return task added msg and list of all the tasks ", () => {
    const newTask = {
      title: "games",
      description: "NFS",
      priority: "max",
      dueDate: "2022-03-23",
      taskComments: ["random", "another"],
    };
    chai
      .request(app)
      .post(`/tasks`)
      .set("Authorization", token)
      .send(newTask)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("task added");
        res.body.should.have.property("message");
      });
  });
  //valid  PUT /tasks/id
  it("PUT /tasks/id should return updated tasks list ", () => {
    const taskId = 782;
    const toUpdate = {
      title: "games",
      description: " elden ring ",
      priority: "min",
      dueDate: "2023-05-01",
    };
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send(toUpdate)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User updated");
        res.body.updatedTask.should.have.property("title").eql(toUpdate.title);
        res.body.updatedTask.should.have
          .property("description")
          .eql(toUpdate.description);
        res.body.updatedTask.should.have
          .property("priority")
          .eql(toUpdate.priority);
        res.body.updatedTask.should.have
          .property("dueDate")
          .eql(toUpdate.dueDate);
        res.body.updatedTask.should.have.property("id").eql(taskId);
        res.body.updatedTask.should.have.property("timestamp");
        Date.parse(res.body.updatedTask.timestamp).not.eql(NaN);
      });
  });
  //invalid  PUT /tasks/id
  it("PUT /tasks/id should return a not found message ", () => {
    const taskId = 12;
    const toUpdate = {
      title: "games",
      description: " elden ring ",
      priority: "min",
      dueDate: "2023-05-01",
    };
    chai
      .request(app)
      .put(`/tasks/${taskId}`)
      .send(toUpdate)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("Task not found");
      });
  });
  //   //valid  DELETE /tasks/id
  //   it("PUT /tasks/id should return updated tasks list ", () => {
  //     const taskId = 871;
  //     chai
  //       .request(app)
  //       .delete(`/tasks/${taskId}`)
  //       .set("Authorization", token)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("message").eql("Task deleted");
  //       });
  //   });
  //   //invalid  DELETE /tasks/id
  //   it("PUT /tasks/id should return a not found message ", () => {
  //     const taskId = 12;
  //     chai
  //       .request(app)
  //       .delete(`/tasks/${taskId}`)
  //       .set("Authorization", token)
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("message").eql("Task not found");
  //       });
  //   });
});
