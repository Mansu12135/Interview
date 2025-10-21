import { Injectable } from '@angular/core';
import { delay, Observable, shareReplay } from "rxjs";
import { TreeNode } from "./models/tree-node";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private static readonly _url = 'http://localhost:5000/api/tree';

  constructor(private readonly _http: HttpClient) { }

  tree$: Observable<TreeNode> = this.getTree$();

  private getTree$(): Observable<TreeNode> {
    return this._http.get<TreeNode>(DataProviderService._url).pipe(
        delay(1000),
        shareReplay(1));
  }
}
