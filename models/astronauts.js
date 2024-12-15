import { data } from "../libs/data.js";

let astronautId = 0;
let astronauts = data.map((astronaut) => ({ ...astronaut, id: ++astronautId }));

export const originalAstronauts = astronauts.map((astronaut) => {
  return JSON.parse(JSON.stringify(astronaut));
});

export function resetAstronauts() {
  astronautId = 0;
  astronauts = data.map((astronaut) => ({ ...astronaut, id: ++astronautId }));
}

export async function getAstronauts() {
  return [...astronauts];
}

export async function getAstronautsByName(search) {
  const lowercased = search.toLowerCase();
  return astronauts.filter(({ firstName, lastName }) => {
    return (
      firstName.toLowerCase().includes(lowercased) ||
      lastName.toLowerCase().includes(lowercased)
    );
  });
}

export async function createAstronaut(newAstronaut) {
  const created = {
    ...newAstronaut,
    id: ++astronautId,
  };
  astronauts = [...astronauts, created];
  return created;
}

export async function getAstronautById(astronautId) {
  return astronauts.find(({ id }) => id === astronautId);
}

export async function replaceAstronautById(astronautId, astronautReplacement) {
  const index = astronauts.findIndex(({ id }) => id === astronautId);

  if (-1 === index) {
    return;
  }

  const newAstronaut = { ...astronautReplacement, id: astronautId };

  astronauts = [
    ...astronauts.slice(0, index),
    newAstronaut,
    ...astronauts.slice(index + 1),
  ];

  return newAstronaut;
}

export async function deleteAstronautById(astronautId) {
  const index = astronauts.findIndex(({ id }) => id === astronautId);

  if (-1 === index) {
    return;
  }

  const deleted = astronauts[index];
  astronauts = [...astronauts.slice(0, index), ...astronauts.slice(index + 1)];
  return deleted;
}

export async function updateAstronautById(astronautId, updates) {
  const index = astronauts.findIndex(({ id }) => id === astronautId);

  if (-1 === index) {
    return;
  }

  const oldAstronaut = astronauts[index];
  const updated = { ...oldAstronaut, ...updates, id: astronautId };

  astronauts = [
    ...astronauts.slice(0, index),
    updated,
    ...astronauts.slice(index + 1),
  ];

  return updated;
}
