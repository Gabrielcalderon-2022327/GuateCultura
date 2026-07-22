import { User } from "../models/User";

const users: User[] = [];

export function getAllUsers(): User[]{
    return users;
}

export function getUserById(id: number): User | undefined{
    return users.find(u => u.user_id === id);
}

export function createUser(user: User): void{
    users.push(user);
}

export function editUser(id: number, user: User): boolean {
    const userIndex = users.findIndex(u => u.user_id === id);
    if (userIndex === -1){
        return false;
    }
    users[userIndex] = { ...user, user_id: id };
    return true;
}

export function deleteUser(id: number): boolean{
    const userIndex = users.findIndex(u => u.user_id === id);
    if (userIndex === -1){
        return false;
    }
    users.splice(userIndex,1);
    return true;
}