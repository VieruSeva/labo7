import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly apiKey = environment.supabaseAnonKey;

  constructor(private http: HttpClient) {}

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      apikey: this.apiKey,
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
  }

  getAll<T>(
    table: string,
    extraParams: Record<string, string> = {}
  ): Observable<T[]> {
    let params = new HttpParams().set('select', '*');

    for (const [key, value] of Object.entries(extraParams)) {
      params = params.set(key, value);
    }

    return this.http.get<T[]>(`${this.baseUrl}/${table}`, {
      headers: this.buildHeaders(),
      params
    });
  }

  getById<T>(table: string, id: string): Observable<T | null> {
    const params = new HttpParams()
      .set('select', '*')
      .set('id', `eq.${id}`)
      .set('limit', '1');

    return this.http
      .get<T[]>(`${this.baseUrl}/${table}`, {
        headers: this.buildHeaders(),
        params
      })
      .pipe(map(rows => (rows.length ? rows[0] : null)));
  }

  insert<T>(table: string, payload: any): Observable<T> {
    return this.http
      .post<T[]>(`${this.baseUrl}/${table}`, payload, {
        headers: this.buildHeaders().set('Prefer', 'return=representation')
      })
      .pipe(map(rows => rows[0]));
  }

  update<T>(table: string, id: string, payload: any): Observable<T> {
    const params = new HttpParams().set('id', `eq.${id}`);

    return this.http
      .patch<T[]>(`${this.baseUrl}/${table}`, payload, {
        headers: this.buildHeaders().set('Prefer', 'return=representation'),
        params
      })
      .pipe(map(rows => rows[0]));
  }

  delete(table: string, id: string): Observable<void> {
    const params = new HttpParams().set('id', `eq.${id}`);

    return this.http
      .delete(`${this.baseUrl}/${table}`, {
        headers: this.buildHeaders(),
        params
      })
      .pipe(map(() => void 0));
  }
}
