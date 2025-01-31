import { v4 as uuidv4 } from 'uuid';

export function generateShortUid(): string {
    const uuidSubstring = uuidv4().substring(0, 8);
    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    return `${uuidSubstring}${randomNumber1}${randomNumber2}`
}