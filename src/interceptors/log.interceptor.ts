import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();

    const request = context.switchToHttp().getRequest();

    return next
      .handle()
      .pipe(tap(() => console.log(request.url)))
      .pipe(tap(() => console.log(request.method)))
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    //O "tap" serve para executar uma ação antes ou depois da requisição pegando o resultado dela e fazendo algo com ele
  }
}