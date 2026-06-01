import { v4 as uuidv4 } from 'uuid';

export const users = new Map();

export function createUser(userData) {
  const user = {
    id: uuidv4(),
    ...userData,
    created_at: new Date().toISOString(),
    last_login: null
  };
  users.set(user.id, user);
  return user;
}

export function findUserByEmail(email) {
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return null;
}

export function findUserById(id) {
  return users.get(id);
}

export function updateUser(id, updates) {
  const user = users.get(id);
  if (!user) return null;
  const updated = { ...user, ...updates };
  users.set(id, updated);
  return updated;
}

export function getAllUsers() {
  return Array.from(users.values());
}

export function getUsersByRole(role) {
  return Array.from(users.values()).filter(u => u.role === role);
}
