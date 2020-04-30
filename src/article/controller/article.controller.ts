import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, Res, Header, Req } from '@nestjs/common';
import { ArticleService } from '../service/base/article.service';
import { CreateArticleDto, UpdateArticleDto, ArticlePageDto, ArticleDto } from '../dto';
import { ValidationPipe } from '@app/core/shared';
import { ApiTags, ApiQuery, ApiParam, ApiDefaultResponse } from '@nestjs/swagger';
import { TestService } from '../service/test.service'
// import { fs } from 'memfs';
@ApiTags("Article")
@Controller("article")
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private TestService: TestService
  ) { }

  @Get("getAll")
  @ApiDefaultResponse({ type: ArticleDto, isArray: true })
  getAll() {
    return this.articleService.getAll();
  }

  @Get("get/:id")
  @ApiParam({ name: "id" })
  @ApiDefaultResponse({ type: ArticleDto })
  get(@Param('id') id) {
    return this.articleService.get(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiDefaultResponse({ type: ArticleDto })
  create(@Body() input: CreateArticleDto) {
    return this.articleService.create(input);
  }

  @Put(':id')
  @ApiDefaultResponse({ type: ArticleDto })
  @ApiParam({ name: 'id' })
  update(@Param('id') id, @Body() input: UpdateArticleDto) {
    return this.articleService.update1(id, input);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id) {
    return this.articleService.delete(id);
  }

  @Get("page")
  @ApiDefaultResponse({ type: ArticlePageDto })
  @ApiQuery({ name: "skip", required: false })
  @ApiQuery({ name: "take", required: false })
  @ApiQuery({ name: "title", required: false })
  @ApiQuery({ name: "text", required: false })
  @ApiQuery({ name: "tagId", required: false })
  async page(@Query() query, @Req() req) {
    var temp = await this.articleService.page({ skip: query.skip, take: query.take, text: query.text, title: query.title, tagId: query.tagId });
    var result = new ArticlePageDto();
    result.count = temp[1];
    result.items = temp[0];
    return result;
  }

  @Get("excel")
  excelTest(@Res() res) {
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment('test.xlsx');
    var result = this.TestService.testExcel();
    res.end(result, 'binary');

  }
  // @Get("readJson")
  // readJson(){
  //   console.log(__dirname)
  //   fs.readFile(__dirname +"/data.json","utf8",((err,x)=>{
  //     console.log(JSON.parse(x));          
  //     return x;
  //   }));
  // }

  //@Get("pdf/:name")
  //@ApiParam({name:"name",required:true})
  // @Header('Content-Type', 'application/pdf')
  // @Header('Content-Disposition', 'attachment; filename=test.pdf')
  //pdf(@Res() res,@Param("name") name){      
  // var html=this.pdfService.setHtmlForTable(name);
  // pdf.create(html).toStream((err, stream)=>{ 
  //   res.set('Content-Type', 'application/pdf');
  //   res.attachment('test.pdf');
  //   stream.pipe(res);
  // });     
  //}
}
