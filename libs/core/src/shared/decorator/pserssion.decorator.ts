import { SetMetadata } from '@nestjs/common';

export const pserssion = (...pserssion: string[]) => SetMetadata('pserssion', pserssion);