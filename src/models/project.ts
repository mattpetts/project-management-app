namespace App {
    // project custom type
    export enum ProjectStatus {
        ToDo,
        Active,
        Qa,
        Finished
    }
    export class Project {
        constructor(
            public id: string, 
            public title: string, 
            public description: string, 
            public people: number, 
            public status: ProjectStatus
        ) {}
    }
}