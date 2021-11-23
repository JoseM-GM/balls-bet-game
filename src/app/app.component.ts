import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private languages: Array<string>;

  constructor(public translate: TranslateService) {
    this.languages = ['es', 'en'];
    translate.addLangs(this.languages);
    translate.setDefaultLang(environment.defaultLanguage);
  }

  ngOnInit(): void {
  }

  
}
