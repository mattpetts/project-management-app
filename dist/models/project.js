export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ToDo"] = 0] = "ToDo";
    ProjectStatus[ProjectStatus["Active"] = 1] = "Active";
    ProjectStatus[ProjectStatus["Qa"] = 2] = "Qa";
    ProjectStatus[ProjectStatus["Finished"] = 3] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
export class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
//# sourceMappingURL=project.js.map