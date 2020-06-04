import axios from 'axios';
import { deleteNotesForAuthor } from './notesApi';

const apiUrl = 'http://localhost:3001';

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem('loggedUser'));
}

export function getAllUsers() {
  return axios.get(`${apiUrl}/users`);
}

export function getUserById(id) {
  return axios.get(`${apiUrl}/users/${id}`);
}

export async function login(userData) {
  const users = (await getAllUsers()).data;
  const user = users.find(u => u.email === userData.email && u.password.toString() === userData.password);
  
  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    return;
  }

  throw new Error('Incorrect credentials');
}

export async function register(userData) {
  const users = (await getAllUsers()).data;

  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already exists');
  }

  userData = {
    ...userData,
    "isAdmin": false,
    "picture": "https://picsum.photos/200/300?random=6"
  }
  return axios.post(`${apiUrl}/users`, userData)
}

export function logout() {
  localStorage.removeItem('loggedUser');
}

export function saveUser(userData) {
  if (userData.id) {
    return axios.put(`${apiUrl}/users/${userData.id}`, userData);
  }

  return register(userData);
}

export function deleteUser(id) {
  deleteNotesForAuthor(id);
  return axios.delete(`${apiUrl}/users/${id}`);
}