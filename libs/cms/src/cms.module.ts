import { Module } from '@nestjs/common';
import { CmsService } from './cms.service';
import { ContactModule } from './contact/contact.module';
import { NewsModule } from './news/news.module';
import { BlogModule } from './blog/blog.module';

@Module({
  providers: [CmsService],
  exports: [CmsService],
  imports: [
    ContactModule, 
    NewsModule, 
    // BlogModule
  ],
})
export class CmsModule { }
