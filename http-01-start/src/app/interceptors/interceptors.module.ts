import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHeaderInterceptor } from '../auth.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHeaderInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorsModule {}
