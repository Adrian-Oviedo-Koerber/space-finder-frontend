import { Space } from "../model/Model";

export class DataService {
    public async getSpaces(): Promise<Space[]>{
        const result: Space[]  = [];
        result.push({
            spaceId: '1',
            name: 'Space 1',
            location: 'Location 1'
        });
        result.push({
            spaceId: '2',
            name: 'Space 2',
            location: 'Location 2'
        });
        result.push({
            spaceId: '3',
            name: 'Space 3',
            location: 'Location 3'
        });
        return result;
    }
}