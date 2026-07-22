import { Creator } from "../models/Creator";

const creators: Creator[] = [];

export function getAllCreators(): Creator[] {
    return creators;
}

export function getCreatorById(id: number): Creator | undefined {
    return creators.find(c => c.creator_id === id);
}

export function createCreator(creator: Creator): void {
    creators.push(creator);
}

export function editCreator(id: number, creator: Creator): boolean {
    const creatorIndex = creators.findIndex(c => c.creator_id === id);
    if (creatorIndex === -1) {
        return false;
    }
    creators[creatorIndex] = { ...creator, creator_id: id };
    return true;
}

export function deleteCreator(id: number): boolean {
    const creatorIndex = creators.findIndex(c => c.creator_id === id);
    if (creatorIndex === -1) {
        return false;
    }
    creators.splice(creatorIndex, 1);
    return true;
}