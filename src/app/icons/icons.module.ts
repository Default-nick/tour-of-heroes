import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faMask } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faMask);
  }
}
