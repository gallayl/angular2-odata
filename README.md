# angular2-odata
OData service for Angular

##Usage example:
```
import { ODataConfiguration, ODataServiceFactory } from "angular2-odata";
import { bootstrap } from "angular2/platform/browser";
    
@Injectable()
class MyODataConfig extends ODataConfiguration{
    constructor() {
        super("http://myODataHost/odata",myGlobalErrorHandler));
    }
}

bootstrap(app,[
    provide(ODataConfiguration, {useClass:MyODataConfig}),
    ODataServiceFactory,
]

//An example model interface
interface INotification extends IHasType {
    Id: number;
    CommentId: number;
    Comment: Comment;
    FromHandle: string;
    From: IResource;
    Priority: number;
    SendDate: Date;
    IsArchived: boolean;
    Text: string;
    Instances:Array<INotificationInstance>
    TempOldId?: number;
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
        this.odata.Get(id)
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
