import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { Project } from '../interfaces/project.inferface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public project$: BehaviorSubject<Project[] | []> = new BehaviorSubject<
    Project[] | []
  >([]);

  constructor(private http: HttpClient) {}

  // J'instancie le BehaviourSubject
  public getProjects() {
    return this.http.get<Project[]>('/api/project').pipe(
      tap((projects) => {
        this.project$.next(projects);
      })
    );
  }

  // Je peux récupèrer le projet directement à partir du BehaviourSubject
  // Je map pour recuprer d'une veuleur du tableau
  public getOneProject(index: number | null) {
    return this.project$.pipe(
      filter((projects: Project[]) => {
        return projects !== null;
      }),
      map((projects: Project[]) => {
        const result = projects.filter(
          (project: Project) => project.id == index
        );

        return result;
      })
    );
  }

  public createProject(project: Project): Observable<Project> {
    return this.http.post<Project>('api/project', project).pipe(
      tap((project: any) => {
        const allProject = this.project$.value;
        this.project$.next([...allProject, project]);
      })
    );
  }

  public deleteProject(index: number) {
    return this.http.delete('api/project/' + index).pipe(
      tap((deleteProject: any) => {
        const allProject = this.project$.value;
        const newProjet = allProject.filter(
          (projet) => projet.id !== deleteProject.id
        );
        this.project$.next(newProjet);
      })
    );
  }

  public updateProject(id: number | undefined, project: Project) {
    return this.http.put<Project>('api/project/' + id, project).pipe(
      tap((updateProject: any) => {
        const allProject = this.project$.value;
        const newProjet = allProject.filter(
          (projet) => projet.id !== updateProject.id
        );
        this.project$.next([...newProjet, updateProject]);
      })
    );
  }
}
