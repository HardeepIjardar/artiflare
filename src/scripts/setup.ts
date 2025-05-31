import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setup() {
  try {
    // Install required dependencies
    console.log('Installing dependencies...');
    await execAsync('npm install firebase-admin');

    // Run the setup script
    console.log('Running Firestore setup...');
    await execAsync('ts-node src/scripts/setupFirestore.ts');

    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Error during setup:', error);
  }
}

setup(); 