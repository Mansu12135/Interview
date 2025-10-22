import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, Observable, tap } from "rxjs";
import { TreeNode as TreeNodeDto } from "./dtos/tree-node";
import { HttpClient } from "@angular/common/http";

export type ExtendTreeRequest = {
  parentId?: number;
  title: string;
  value: number;
};

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private static readonly _url = 'http://localhost:8080/api/tree';

  private readonly _treeSubject = new BehaviorSubject<TreeNodeDto | null>(null);
  public readonly tree$: Observable<TreeNodeDto> = this._treeSubject.asObservable().pipe(
    filter((t): t is TreeNodeDto => t !== null)
  );

  constructor(private readonly _http: HttpClient) {
    // Load initial tree
    this.refresh().subscribe();
  }

  refresh(): Observable<TreeNodeDto> {
    return this.getTree$().pipe(tap(tree => this._treeSubject.next(tree)));
  }

  extendTree(request: ExtendTreeRequest): Observable<TreeNodeDto> {
    return this._http.post<TreeNodeDto>(`${DataProviderService._url}/extend`, request)
      .pipe(tap(tree => this._treeSubject.next(tree)));
  }

  private getTree$(): Observable<TreeNodeDto> {
    return this._http.get<TreeNodeDto>(DataProviderService._url).pipe(
      delay(1000)
    );
  }
}
