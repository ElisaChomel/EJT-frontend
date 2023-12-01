import { isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { IConfig } from './../models/config/config';

export const configFactory = (config: ConfigService) => () =>
  config.loadAppConfig();

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  // keep track of config
  private config = new BehaviorSubject<IConfig|null>(null);

  private static _config: IConfig;

  static get Config(): IConfig {
    return this._config;
  }

  private _createConfig(config: any, withError: boolean): void {
    // cast all keys as are
    const _config = { ...(<IConfig>config) };

    // with error
    _config.withError = withError;

    // set static member
    ConfigService._config = _config;

    // next
    this.config.next(config);
  }

  loadAppConfig(): Observable<boolean> {
    console.log(`isDevMode : ${isDevMode()}`);
    let file = isDevMode() ? "/localdata/development.json" : "/localdata/config.json";

    return this.http.get(file).pipe(
      map((response) => {
        this._createConfig(response, false);
        return true;
      })
    );
  }
}