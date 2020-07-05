import { CreateNewsDto } from './create-new.dto';
import { NewsType } from '../../entity/newsType.entity'
export class CreateNewsWithDetailDto extends CreateNewsDto {
    newsType: NewsType;
}
