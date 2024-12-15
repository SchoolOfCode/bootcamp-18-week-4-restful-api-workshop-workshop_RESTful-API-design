import { expect, test, beforeEach, describe } from "@jest/globals";
import supertest from "supertest";

import app from "../app.js";
import { resetAstronauts, originalAstronauts } from "../models/astronauts.js";

const request = supertest(app);

beforeEach(() => {
  resetAstronauts();
});

test("GET /astronauts should get all astronauts", () => {
  return request
    .get("/astronauts")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function (res) {
      const actual = res.body;
      const expected = {
        success: true,
        payload: originalAstronauts,
      };
      expect(actual).toStrictEqual(expected);
    });
});

test.each([...originalAstronauts])(
  "GET /astronauts/$id should get a particular astronaut",
  (astronaut) => {
    return request
      .get(`/astronauts/${astronaut.id}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual({
          success: true,
          payload: astronaut,
        });
      });
  }
);

test("POST /astronauts should create a new astronaut", async () => {
  const newAstronaut = {
    firstName: "Zainab",
    lastName: "Al-Lami",
    rank: "",
    suitSize: "XXL",
    helmetSize: "XXS",
    specialSkill: "",
    dob: "",
    missions: [
      {
        title: "",
        dates: { start: "", finish: "" },
        extravehicularActivities: 5,
      },
    ],
  };

  const idOfCreatedAstronaut = await request
    .post("/astronauts")
    .send(newAstronaut)
    .expect(201)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function (res) {
      const actual = res.body;
      expect(actual).toStrictEqual({
        success: true,
        payload: {
          ...newAstronaut,
          id: expect.any(Number),
        },
      });
    })
    .then((res) => res.body.payload.id);

  await request
    .get(`/astronauts/${idOfCreatedAstronaut}`)
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(function (res) {
      const actual = res.body;
      expect(actual).toStrictEqual({
        success: true,
        payload: {
          ...newAstronaut,
          id: idOfCreatedAstronaut,
        },
      });
    });
});

test.each([...originalAstronauts])(
  "PUT /astronauts/$id should replace a particular astronaut",
  async (astronaut) => {
    const replacement = {
      id: astronaut.id,
      firstName: astronaut.firstName + " VIII",
    };

    await request
      .put(`/astronauts/${astronaut.id}`)
      .send(replacement)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual({
          success: true,
          payload: replacement,
        });
        expect(actual.payload).not.toStrictEqual(astronaut);
      });

    await request
      .get(`/astronauts/${astronaut.id}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual({
          success: true,
          payload: replacement,
        });
      });
  }
);

test.each([...originalAstronauts])(
  "DELETE /astronauts/$id should delete a particular astronaut",
  async (astronaut) => {
    await request
      .delete(`/astronauts/${astronaut.id}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual({
          success: true,
          payload: astronaut,
        });
      });

    await request.get(`/astronauts/${astronaut.id}`).expect(404);
  }
);

test.each([...originalAstronauts])(
  "PATCH /astronauts/$id should update a particular astronaut",
  async (astronaut) => {
    const updates = {
      lastName: astronaut.lastName + " Junior",
    };
    const updated = {
      ...astronaut,
      ...updates,
      id: astronaut.id,
    };

    await request
      .put(`/astronauts/${astronaut.id}`)
      .send(updated)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual({
          success: true,
          payload: updated,
        });
        expect(actual.payload).not.toStrictEqual(astronaut);
      });

    await request
      .get(`/astronauts/${astronaut.id}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual({
          success: true,
          payload: updated,
        });
        expect(actual.payload).not.toStrictEqual(astronaut);
      });
  }
);

test.each([
  {
    name: "gary",
    expectedPayload: [
      {
        id: 1,
        firstName: "Gary",
        lastName: "Baldwick",
        rank: "",
        suitSize: "XXL",
        helmetSize: "XXS",
        specialSkill: "",
        dob: "",
        missions: [
          {
            title: "",
            dates: { start: "", finish: "" },
            extravehicularActivities: 5,
          },
        ],
      },
    ],
  },
  {
    name: "burn",
    expectedPayload: [
      {
        id: 5,
        firstName: "Denise",
        lastName: "Fishburn",
        rank: "",
        suitSize: "XXL",
        helmetSize: "XXS",
        specialSkill: "",
        dob: "",
        missions: [
          {
            title: "",
            dates: { start: "", finish: "" },
            extravehicularActivities: 5,
          },
        ],
      },
    ],
  },
])(
  "GET /astronauts?name=$name should get astronauts by name",
  ({ name, expectedPayload }) => {
    return request
      .get(`/astronauts`)
      .query({ name })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual({
          success: true,
          payload: expectedPayload,
        });
      });
  }
);

describe("Basic handling of non-existent resources and invalid requests", () => {
  const cases = [
    { id: 4004, body: { firstName: "Abe" } },
    { id: -10010, body: { firstName: "Barbara" } },
    { id: "INVALID_ID", body: { firstName: "Charlie" } },
  ];

  test("POST /astronauts should fail when request body is empty", () => {
    return request
      .post(`/astronauts`)
      .expect(400)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual(
          expect.objectContaining({
            success: false,
          })
        );
      });
  });

  test.each(cases)("GET /astronauts/$id should be 'not found'", ({ id }) => {
    return request
      .get(`/astronauts/${id}`)
      .expect(404)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual(
          expect.objectContaining({
            success: false,
          })
        );
      });
  });

  test.each(cases)(
    "PUT /astronauts/$id should be 'not found'",
    ({ id, body }) => {
      return request
        .put(`/astronauts/${id}`)
        .send(body)
        .expect(404)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function (res) {
          const actual = res.body;
          expect(actual).toStrictEqual(
            expect.objectContaining({
              success: false,
            })
          );
        });
    }
  );

  test.each(cases)(
    "PUT /astronauts/$id should fail when request body is empty",
    ({ id }) => {
      return request
        .put(`/astronauts/${id}`)
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function (res) {
          const actual = res.body;
          expect(actual).toStrictEqual(
            expect.objectContaining({
              success: false,
            })
          );
        });
    }
  );

  test.each(cases)(
    "PATCH /astronauts/$id should be 'not found'",
    ({ id, body }) => {
      return request
        .patch(`/astronauts/${id}`)
        .send(body)
        .expect(404)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function (res) {
          const actual = res.body;
          expect(actual).toStrictEqual(
            expect.objectContaining({
              success: false,
            })
          );
        });
    }
  );

  test.each(cases)(
    "PATCH /astronauts/$id should fail when request body is empty",
    ({ id }) => {
      return request
        .patch(`/astronauts/${id}`)
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(function (res) {
          const actual = res.body;
          expect(actual).toStrictEqual(
            expect.objectContaining({
              success: false,
            })
          );
        });
    }
  );

  test.each(cases)("DELETE /astronauts/$id should be 'not found'", ({ id }) => {
    return request
      .delete(`/astronauts/${id}`)
      .expect(404)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        const actual = res.body;
        expect(actual).toStrictEqual(
          expect.objectContaining({
            success: false,
          })
        );
      });
  });
});
