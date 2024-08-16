import { Space } from "../model/Model";

export class DataService {
    public async getSpaces(): Promise<Space[]>{
        const result: Space[]  = [];
        result.push({
            spaceId: '123',
            name: 'Beach',
            location: 'Location 1'
        });
        result.push({
            spaceId: '124',
            name: 'Hawaii',
            location: 'Location 2'
        });
        result.push({
            spaceId: '125',
            name: 'Nize',
            location: 'Location 3'
        });
        return result;
    }

    public async reserveSpace(spaceId: string): Promise<string | undefined> {
        if (spaceId === '123') {
            return('5555');
        } else {
            return undefined;
        }
    }
}