import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TASK } from 'src/model/task';
import { USER } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  constructor(private hs:HttpClient) {

   }
   public getAllTask():Observable<TASK[]>
   {

     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
     });
     let requestOption= {headers:httpHeaders}
     return this.hs.get<TASK[]>("http://localhost:8086/usertodo/user/getalltask", requestOption);
   }
   public getUserName():Observable<USER>
   {

     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
     });
     let requestOption= {headers:httpHeaders}
     return this.hs.get<USER>("http://localhost:8086/usertodo/user/getusername",requestOption);
   }
   public getTaskByPriority(priority:string):Observable<TASK[]>
   {

     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
     });
     let requestOption= {headers:httpHeaders}
     return this.hs.get<TASK[]>(`http://localhost:8086/usertodo/user/getalltaskbypriority/${priority}`, requestOption);
   }
   public getTaskByTitle(title:any):Observable<TASK[]>
   {

     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
     });
     let requestOption= {headers:httpHeaders}
     return this.hs.get<TASK[]>(`http://localhost:8086/usertodo/user/getalltaskbytitle/${title}`, requestOption);
   }
   public getTaskByCompletedStatus(isCompleted:boolean):Observable<TASK[]>
   {

     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
     });
     let requestOption= {headers:httpHeaders}
     return this.hs.get<TASK[]>(`http://localhost:8086/usertodo/user/getalltaskbystatus/${isCompleted}`, requestOption);
   }

   addTask(task: TASK): Observable<TASK> {
     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
     });
     let requestOption= {headers:httpHeaders}
     return this.hs.post<TASK>("http://localhost:8086/usertodo/user/addtask", task,requestOption);
     }


      public deleteAllTask(){
       let httpHeaders=new HttpHeaders({
         'Content-Type':'application/json',
         Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
       });
       let requestOption= {headers:httpHeaders}
       return this.hs.delete("http://localhost:8086/usertodo/user/deletealltask", requestOption);
      }

      public deleteTaskById(taskId:string){
        let httpHeaders=new HttpHeaders({
          'Content-Type':'application/json',
          Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
        });
        let requestOption= {headers:httpHeaders}
        return this.hs.delete(`http://localhost:8086/usertodo/user/deletetaskbyid/${taskId}`, requestOption);
       }

       public updateTask(task:TASK){
        let httpHeaders=new HttpHeaders({
          'Content-Type':'application/json',
          Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
        });
        let requestOption= {headers:httpHeaders}
        return this.hs.put("http://localhost:8086/usertodo/user/updatetask",task, requestOption);
       }
       public updateTaskStatus(task:TASK){
        let httpHeaders=new HttpHeaders({
          'Content-Type':'application/json',
          Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
        });
        let requestOption= {headers:httpHeaders}
        return this.hs.put("http://localhost:8086/usertodo/user/updatetaskstatus",task, requestOption);
       }

       public getAllArchiveTask(isArchieved:boolean)
       {        let httpHeaders=new HttpHeaders({
          'Content-Type':'application/json',
          Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
        });
        let requestOption= {headers:httpHeaders}
        return this.hs.get<TASK[]>(`http://localhost:8086/usertodo/user/getalltaskarchivebystatus/${isArchieved}`, requestOption);
       }
       public updateTaskAsArchiveTask(task:TASK){
        let httpHeaders=new HttpHeaders({
          'Content-Type':'application/json',
          Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
        });
        let requestOption= {headers:httpHeaders}
        return this.hs.put("http://localhost:8086/usertodo/user/updatetaskarhivestatus",task, requestOption);
       }

      public getAllTaskNotification():Observable<any>
   {

     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('tokenGenerated')
     });
     let requestOption= {headers:httpHeaders}
     return this.hs.get<any>("http://localhost:8086/usernotification/user/getallnotification", requestOption);
   }
}



