import { Component } from '@angular/core';
@Component({
    selector: 'app-main',
    template: `
        <h1>{{name}}!</h1> 
    `
})
export class AppComponent {
    name = 'Minimal Angular App';
}