# angular2-odata
The goal is to create a fluent API for querying, creating, updating and deleting OData resources in Angular2.
OData service for Angular.

If you are using OData with Angular>2 please check also my other related project, [FuryTech.OdataTypescriptServiceGenerator](https://github.com/gallayl/FuryTech.OdataTypescriptServiceGenerator)

##Usage example:
Get the package from NPM:
npm install angular2-odata

```
import { ODataConfiguration, ODataServiceFactory, ODataService } from "angular2-odata";
import { bootstrap } from "angular2/platform/browser";
    
@Injectable()
class MyODataConfig extends ODataConfiguration{
    baseUrl="http://localhost:54872/odata/";
}

bootstrap(app,[
    provide(ODataConfiguration, {useClass:MyODataConfig}),
    ODataServiceFactory,
]

//An example model interface
interface INotification {
    Id: number;
    CommentId: number;
    Comment: IComment;
    FromId: number;
    From: IResource;
    Priority: number;
    SendDate: Date;
    IsArchived: boolean;
    Text: string;
}

//An example component
@Component({
  ...
})
export class NotyListComponent{
    private odata:ODataService<INotification>;
    constructor(private odataFactory:ODataServiceFactory, ...){
        this.odata = this.odataFactory.CreateService<INotification>("notification");
    }
    
    getOneNoty(id:int){
        this.odata.Get(id).Select("Id,Text").Expand("From,To").Exec()
        .subscribe(
            singleNoty=>{...},
            error=>{...}
        );
    }
      
      
    getNotys(){
        this.odata
        .Query()                    //Creates a query object
        .Top(this.top)    
        .Skip(this.skip)
        .Expand("Comment,From")
        .OrderBy("SendDate desc")
        .Filter(this.filterString)
        .Exec()                     //Fires the request
        .subscribe(                 //Subscribes to Observable<Array<T>>
        notys => {
            this.notys = notys;     //Do something with the result
        },
        error => {
            ...                     //Local error handler
        });
    
    }
}
```
