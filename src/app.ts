/// <reference path="components/project-input.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
    new ProjectList('todo');
    new ProjectList('active');
    new ProjectList('qa');
    new ProjectList('finished');
    new ProjectInput();
}