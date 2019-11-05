import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

export interface Lang {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  selectedLang: string;
  languages: Lang[] = [
    {value: 'pl', viewValue: 'Polski'},
    {value: 'en', viewValue: 'English'}
  ];

  constructor(private translate: TranslateService,
  ) {
    this.selectedLang = 'pl';
    translate.use('pl');
    translate.setDefaultLang('pl');
  }

  ngOnInit() {
  }

  useLanguage(lang: string) {
    console.log('Swapping lang to ' + lang);
    this.translate.use(lang);
  }

  changeLanguage() {
    this.useLanguage(this.selectedLang);
  }
}
