import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Observable, finalize, tap } from 'rxjs';
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
  getHeroes(): Observable<Hero[]> {
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

  // GET /heroes/id
  getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap((hero) => this.log(`fetched hero id=${id} and name=${hero.name}`))
      );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
