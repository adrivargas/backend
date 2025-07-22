import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [User],
  ssl: {
    rejectUnauthorized: false,
  },
});


async function seedAdmin() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOneBy({ username: 'admin' });

  if (existing) {
    console.log('ℹ️ El usuario admin ya existe.');
  } else {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = userRepo.create({
      nombre: 'Admin Principal',
      correo: 'admin@admin.com',
      celular: '0999999999',
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    });

    await userRepo.save(admin);
    console.log('✅ Usuario admin creado con éxito.');
  }

  await AppDataSource.destroy();
}

seedAdmin();
