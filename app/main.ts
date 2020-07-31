import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

//platform browser dynamic é recomendado somente em ambiente de DEV 
//just in time compilation
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

