import { Module } from '@nestjs/common';
import { ElseService } from './else.service';


import { ArticleModule } from './article/article.module';
import { TreeModule } from '../../core/src/tree/tree.module';
import { ChatModule } from './chat/chat.module';
import { PracticeModule } from './practice/practice.module';

@Module({
  imports:[
    // ArticleModule,
    // CmsModule,
    // ChatModule,
    // PracticeModule,
  ],
  providers: [ElseService],
  exports: [ElseService],
})
export class ElseModule {}
