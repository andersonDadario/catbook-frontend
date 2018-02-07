import { User } from './user';

export class Skill {
    public endorsed: boolean;
    
    constructor(
        public id: number,
        public name: string,
        public user_id: number,
        public total_of_endorsers: number,
        public endorsers: User[],
    ) { }

    public static generateEmptySkill(): Skill {
       return new Skill(null, '', 0, 0, []);
    }

}
