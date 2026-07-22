import { Follower } from "../models/Follower";

const followers: Follower[] = [];

export function getAllFollowers(): Follower[] {
    return followers;
}

export function getFollowerById(id: number): Follower | undefined {
    return followers.find(f => f.follower_id === id);
}

export function createFollower(follower: Follower): void {
    followers.push(follower);
}

export function editFollower(id: number, follower: Follower): boolean {
    const followerIndex = followers.findIndex(f => f.follower_id === id);
    if (followerIndex === -1) {
        return false;
    }
    followers[followerIndex] = { ...follower, follower_id: id };
    return true;
}

export function deleteFollower(id: number): boolean {
    const followerIndex = followers.findIndex(f => f.follower_id === id);
    if (followerIndex === -1) {
        return false;
    }
    followers.splice(followerIndex, 1);
    return true;
}