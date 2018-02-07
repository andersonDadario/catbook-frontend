import { User } from './user';
import { Skill } from './skill';

export class SkillEndorsement {    
    constructor(
        public id: number,
        public user: User,
        public skill: Skill
    ) { }

}
