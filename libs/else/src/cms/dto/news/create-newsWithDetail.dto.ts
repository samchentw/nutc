import { CreateNewsDto } from './create-new.dto';
import { NewsType } from '../../entity'
export class CreateNewsWithDetailDto extends CreateNewsDto {
    newsType: NewsType;
}
