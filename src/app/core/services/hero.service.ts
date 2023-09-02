import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Observable, finalize, tap, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = `${environment.baseUrl}/heroes`;

  loading = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // GET /heroes
  getAll(): Observable<Hero[]> {
    this.loading = true;
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((heroes) =>
        this.log(
          `fetched ${heroes.length} ${heroes.length > 1 ? 'heroes' : 'hero'}`
        )
      ),
      finalize(() => (this.loading = false))
    );
  }

  // GET /heroes?name=term
  search(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((heroes) =>
          heroes.length
            ? this.log(`found ${heroes.length} hero(es) matching "${term}"`)
            : this.log(`no hero(es) matching "${term}"`)
        )
      );
  }

  // POST /heroes
  create(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(tap((hero) => this.log(`fetched ${this.descAttributes(hero)}`)));
  }
  // GET /heroes/id
  getOne(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(this.getUrl(id))
      .pipe(tap((hero) => this.log(`fetched ${this.descAttributes(hero)}`)));
  }
  // PUT /heroes/id
  update(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(this.getUrl(hero.id), hero)
      .pipe(tap((hero) => this.log(`updated ${this.descAttributes(hero)}`)));
  }

  // DELETE /heroes/id
  delete(hero: Hero): Observable<never> {
    return this.http
      .delete<never>(this.getUrl(hero.id))
      .pipe(tap((hero) => this.log(`deleted ${this.descAttributes(hero)}`)));
  }

  private descAttributes(hero: Hero): string {
    return `Hero ID=${hero.id} and Name=${hero.name}`;
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
}
