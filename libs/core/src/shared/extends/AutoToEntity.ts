export class AutoToEntity{
    public DtoToEntity(data):this{
        Object.keys(data).map(value=>{
            this[value]=data[value];
        });
        return this;
    }
}