import { CreateNewsDto } from './create-new.dto';
import { CmsNewsTypeEntity } from '../entity'
export class CreateNewsWithDetailDto extends CreateNewsDto{
    newsType:CmsNewsTypeEntity;
}
