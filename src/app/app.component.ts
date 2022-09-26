import { Component } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { AppState } from './store/reducers';

interface IAppState {
  loading: boolean;
  loadingBar: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ComponentStore],
})
export class AppComponent {
  loading$ = this.componentStore.select((state) => state.loading);
  loadingBar$ = this.componentStore.select((state) => state.loadingBar);

  constructor(
    private readonly componentStore: ComponentStore<IAppState>,
    private readonly store: Store<AppState>
  ) {
    this.componentStore.setState({
      loading: false,
      loadingBar: false,
    });
  }

  ngOnInit(): void {
    this.store.subscribe(({ authedUser, loadingBar }: AppState) => {
      this.componentStore.setState({
        loading: authedUser === null,
        loadingBar,
      });
    });
  }
}
