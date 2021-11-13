import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'golden-race';

  private idiomas: Array<string>;

  constructor(public translate: TranslateService) {
    this.idiomas = ['es', 'en'];
    translate.addLangs(this.idiomas);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  
}
