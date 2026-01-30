import request from "supertest";
import express from "express";

describe("Health check", () => {
  it("returns OK", async () => {
    const app = express();

    app.get("/health", (_req, res) => {
      res.status(200).send("OK");
    });

    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");
  });
});
