function create(data: Record<string, unknown>) {
  const result = { ...data, id: "uuid" };

  return result;
}

function findById(id: string): Record<string, unknown> | null {
  const user = create({ name: "John Doe" });
  user.id = id;
  return user;
}

function update(id: string, data: Partial<Record<string, unknown>>) {
  const existingUser = findById(id);
  if (!existingUser) {
    return null;
  }
  const updatedUser = { ...existingUser, ...data };
  return updatedUser;
}

function remove(id: string) {
  const existingUser = findById(id);
  return existingUser !== null;
}

function findAll() {
  return [create({ id: "uuid", name: "John Doe" })];
}

export const GenericTestRepository = {
  create,
  findById,
  update,
  remove,
  findAll,
};

export type GenericTestRepository = typeof GenericTestRepository;
