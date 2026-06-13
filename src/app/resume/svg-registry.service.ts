import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {finalize, map, share, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SvgRegistryService {
  private http = inject(HttpClient);
  private iconsByUrl = new Map<string, SVGElement>();
  private iconsLoadingByUrl = new Map<string, Observable<SVGElement>>();

  loadSvg(url: string): Observable<SVGElement> {
    const headers = new HttpHeaders({'Accept': 'image/svg+xml'});
    const o = this.http.get(url, {headers, responseType: 'text'}).pipe(
      map((res: string) => {
        const div = document.createElement('div');
        div.innerHTML = res;
        return div.querySelector('svg') as SVGElement;
      }),
      tap(svg => this.iconsByUrl.set(url, svg)),
      finalize(() => this.iconsLoadingByUrl.delete(url)),
      share()
    ) as Observable<SVGElement>;

    this.iconsLoadingByUrl.set(url, o);
    return o;
  }
}
