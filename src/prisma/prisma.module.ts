import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], //Quais services serão disponibilizados dentro do módulo atual
  exports: [PrismaService], //Quais services serão exportados para outros módulos caso eles importem o módulo atual
})
export class PrismaModule {}
