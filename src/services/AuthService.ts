import { User, UserAttribute } from "../model/Model";

export class AuthService {
    public async login(userName: string, password: string): Promise<User | undefined> {
        if (userName === 'user' && password === '1234') {
            return {
                userName: userName,
                email: 'some@email.com'
            }
        }
        else {
            return undefined;
        }
    }

    public async getUserAttributes(user: User): Promise<UserAttribute[]> {
        const result: UserAttribute[] = [];
        result.push({
            Name: 'Description',
            Value: 'Automation user'
        });
        result.push({
            Name: 'Job',
            Value: 'Enginner'
        });
        result.push({
            Name: 'Age',
            Value: '25'
        });
        return result;
    }
}