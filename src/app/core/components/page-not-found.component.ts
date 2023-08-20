import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <mat-card class="card">
      <mat-card-title>404: Page Not Found</mat-card-title>
      <mat-card-content>
        We couldn't find that page! Not even with x-ray vision.
      </mat-card-content>
      <mat-card-actions fxLayout="column">
        <button mat-raised-button color="primary" routerLink="/">
          Take Me Home
        </button>

        <s>Absolutely not a John Denver's reference.</s>
      </mat-card-actions>
      <mat-card> </mat-card
    ></mat-card>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }
      .card {
        background: white;
        padding: 3rem;
      }
    `,
  ],
})
export class PageNotFoundComponent {}
