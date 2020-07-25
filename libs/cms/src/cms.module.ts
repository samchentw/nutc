import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { ContactModule } from './contact/contact.module';
import { NewsModule } from './news/news.module';

@Module({
  providers: [CmsService],
  exports: [CmsService],
  imports: [
    ContactModule, 
    NewsModule, 
  ],
})
export class CmsModule { }
