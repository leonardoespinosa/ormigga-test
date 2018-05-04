import { Component } from '@angular/core';
import { GitService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  /**
   * AppComponent Constructor
   * @param {GitService} _gitService
   */
  constructor(_gitService: GitService) {

    var stopStyle = ['font-family: Roboto, "Helvetica Neue", sans-serif',
      'font-size: 1.7rem',
      'color: Red',
      'font-weight: 600'].join(';');
    console.log('%c Stop!!', stopStyle);
    var msgStyle = ['font-family: Roboto, "Helvetica Neue", sans-serif',
      'font-size: 1.4rem',
      'color: #114b5f',
      'font-weight: 500'].join(';');
    console.log('%c This browser function is intended for developers. If someone tells you to copy and paste something here to enable a function or to "hack" someone\'s account, it is a fraud. If you do, this person can access your account.', msgStyle);
  }
}
