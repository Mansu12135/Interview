import { Injectable } from '@angular/core';
import { delay, Observable, shareReplay } from "rxjs";
import { TreeNode as TreeNodeDto } from "./dtos/tree-node";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private static readonly _url = 'http://localhost:8080/api/tree';

  constructor(private readonly _http: HttpClient) { }

  tree$: Observable<TreeNodeDto> = this.getTree$();

  private getTree$(): Observable<TreeNodeDto> {
    return this._http.get<TreeNodeDto>(DataProviderService._url).pipe(
        delay(1000),
        shareReplay(1));
  }
}
