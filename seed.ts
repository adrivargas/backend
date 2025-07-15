import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { MenuService } from './src/menu/menu.service';
import { MenuItem } from './src/menu/schemas/menu-item.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const menuService = app.get(MenuService);

  const items: MenuItem[] = [
    { name: "Empanada de Viento", sizes: ["Pequeña", "Mediana", "Gigante"] },
    { name: "Empanada de Morocho", sizes: ["Pequeña", "Grande"] },
    { name: "Pristiños", sizes: ["Pequeño", "Mediano", "Grande"] },
    { name: "Empanada de Verde", sizes: ["Pequeña", "Grande", "Bonitísima"] },
    { name: "Humitas" },
    { name: "Bolones" },
    { name: "Salchipapas" },
    { name: "Mote con Chicharrón" },
    { name: "Fritada" },
    { name: "Llapingacho" },
    { name: "Locro de Papa" },
    { name: "Seco de Chivo" },
    { name: "Ponche" },
    { name: "Colada Morada" },
    { name: "Chocolate de Ambato" },
    { name: "Canelazo" },
    { name: "Vino Hervido" },
    { name: "Morocho" },
    { name: "Cerveza" },
    { name: "Micheladas" },
    { name: "Batidos" },
    { name: "Limonadas" },
    { name: "Jugos" },
    { name: "Colas" },
    { name: "Aguas" },
    { name: "Colada de Machica" },
  ];

  await menuService['menuModel'].deleteMany({}); // Limpia la colección (opcional)
  await menuService['menuModel'].insertMany(items); // Inserta en lote

  console.log('✅ Menú insertado correctamente en MongoDB');
  await app.close();
}
bootstrap();
