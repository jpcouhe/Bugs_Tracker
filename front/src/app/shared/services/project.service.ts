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
  public getProjects(userId: number = 0) {
    return this.http.get<Project[]>('/api/project').pipe(
      map((projects: Project[]) => {
        if (userId === 0) {
          this.project$.next(projects);
          return projects;
        } else {
          const newArray: Project[] = [];
          for (let i = 0; i < projects.length; i++) {
            if (projects[i].contribution !== undefined) {
              for (let j = 0; j < projects[i].contribution!.length; j++) {
                if (projects[i].contribution![j].user.id == userId) {
                  newArray.push(projects[i]);
                }
              }
            }
          }
          this.project$.next(newArray);
          return newArray;
        }
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
          (project: Project) => project.id === index
        );

        return result;
      })
    );
  }

  public createProject(project: Project): Observable<Project> {
    return this.http.post<Project>('api/project', project).pipe(
      tap((project: Project) => {
        const allProject = this.project$.value;
        this.project$.next([...allProject, project]);
      })
    );
  }

  public deleteProject(index: number) {
    return this.http.delete<Project>('api/project/' + index).pipe(
      tap((deleteProject: Project) => {
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
      tap((updateProject: Project) => {
        const allProject = this.project$.value;
        const newProjet = allProject.filter(
          (projet) => projet.id !== updateProject.id
        );
        this.project$.next([...newProjet, updateProject]);
      })
    );
  }
}
