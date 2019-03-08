import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {finalize, map, share, tap} from 'rxjs/operators';

@Injectable()
export class SvgRegistryService {
  private iconsByUrl = new Map<string, SVGElement>();
  private iconsLoadingByUrl = new Map<string, Observable<SVGElement>>();

  constructor(private http: HttpClient) {
  }

  loadSvg(url: string): Observable<SVGElement> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    const o = <Observable<SVGElement>>this.http.get(url, {headers, responseType: 'text'}).pipe(
      map((res: any) => {
        const div = document.createElement('div');
        div.innerHTML = res;
        return <SVGElement>div.querySelector('svg');
      }),
      tap(svg => {
        this.iconsByUrl.set(url, svg);
      }),
      finalize(() => {
        this.iconsLoadingByUrl.delete(url);
      }),
      share()
    );

    this.iconsLoadingByUrl.set(url, o);
    return o;
  }
}
