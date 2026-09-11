import { seedDatabase } from '../utils/seedData';

seedDatabase().then(() => {
  console.log('Seeding complete');
  process.exit(0);
});
