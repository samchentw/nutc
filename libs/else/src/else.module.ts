import { Module } from '@nestjs/common';
import { ElseService } from './else.service';


import { ArticleModule } from './article/article.module';
import { CmsModule } from './cms/cms.module';
import { TreeModule } from './tree/tree.module';
import { ChatModule } from './chat/chat.module';
import { PracticeModule } from './practice/practice.module';

@Module({
  imports:[
    ArticleModule,
    CmsModule,
    TreeModule,
    ChatModule,
    PracticeModule,
  ],
  providers: [ElseService],
  exports: [ElseService],
})
export class ElseModule {}
