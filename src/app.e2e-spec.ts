import { FileModule } from '@app/core/file/file.module';
import { ExcelFactory } from '@app/core/shared';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { AppModule } from './app.module';
import { ShopController } from './shop/controller/shop.controller';
import { Shop } from './shop/entity/shop.entity';
import { ShopService } from './shop/service/shop.service';
import { ShopTypeEnum } from './shop/enum/enum';
import { CreateShopDto } from './shop/dto/create-shop.dto';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let shopService: ShopService;
  let shopController: ShopController;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        FileModule,
        TypeOrmModule.forRoot({
          "type": "mysql",
          "host": "localhost",
          "port": 3306,
          "username": "root",
          "password": "",
          "database": "nutc1",
          "entities": ["dist/**/*.entity{.ts,.js}"],
          "autoLoadEntities": true,
          "synchronize": true,
        }),
        AppModule,
      ],
      controllers: [ShopController],
      providers: [
        ExcelFactory, ShopService,
        {
          provide: getRepositoryToken(Shop),
          useClass: Repository,
        },
      ],
    }).compile();
    shopService = moduleFixture.get<ShopService>(ShopService);
    shopController = moduleFixture.get<ShopController>(ShopController);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('新增商家', async () => {
    let input: CreateShopDto = new CreateShopDto();
    input.name = "123";
    input.isDelete = false;
    input.description = "hi";
    input.phone = "";
    input.remark = "";
    input.imageIds = [];
    input.shopType = ShopTypeEnum.一般商店;
    input.address = "789";
    await shopController.create(input)
    let shop = await shopController.getAll();
    expect(shop.length).toBeGreaterThan(0);
  });

  it('刪除商家', async () => {
    let shop = await shopController.getAll();
    console.log("ddd", shop)
    for (let i = 0; i < shop.length; i++) {
      await shopController.delete(shop[i].id);
    }
    let check = await shopController.getAll();
    expect(check.length).toBe(0);
  });

  afterEach(async () => {
    if (app) {
      await getConnection().synchronize(true);
      await app.close();
    }
  });

});
