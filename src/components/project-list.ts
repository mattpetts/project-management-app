/// <reference path="./base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
    // Project List class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

        assignedProjects: Project[];

        constructor(private type: 'todo' | 'active' | 'qa' | 'finished') {
            super('project-list', 'swimlanes', false, `${type}-projects`);

            this.assignedProjects = [];

            this.configure();
            this.renderContent();
        }

        @autobind
        dragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable')
            }
        }

        @autobind
        dragLeaveHandler(_: DragEvent) {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable')
        }

        @autobind
        dropHandler(event: DragEvent) {
            const prjId = event.dataTransfer!.getData('text/plain');
            let status: ProjectStatus = ProjectStatus.ToDo;

            if (this.type === 'active') {
                status = ProjectStatus.Active;
            }

            if (this.type === 'qa') {
                status = ProjectStatus.Qa;
            }

            if (this.type === 'finished') {
                status = ProjectStatus.Finished;
            }

            projectState.moveProject(prjId, status)
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);

            projectState.addListener((projects: Project[]) => {
                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'todo') {
                        return prj.status === ProjectStatus.ToDo;
                    } else if (this.type === 'active') {
                        return prj.status === ProjectStatus.Active;
                    } else if (this.type === 'qa') {
                        return prj.status === ProjectStatus.Qa;
                    } else {
                        return prj.status === ProjectStatus.Finished;
                    }
                })
                this.assignedProjects = relevantProjects;
                this.renderProjects()
            });
        }

        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase()
        }

        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul')!.id, prjItem)
            }
        }
    }
}