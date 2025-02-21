import { Client } from 'pg';
import { argv } from 'process';

const command = argv[2];
const migrationFile = argv[3];

if (!command || !migrationFile) {
	process.exit(1);
}

async function main() {
	try {
		const migration = await import(migrationFile);
		if (!migration[command]) {
			throw new Error(`Migration file does not export '${command}' function`);
		}

		const client = new Client({
			host: 'localhost',
			port: Number(5432),
			user: 'postgres',
			password: 'mysecretpassword',
			database: 'test_db',
		});

		await client.connect();

		await migration[command](client);

		await client.end();
	} catch (error) {
		process.exit(1);
	}
}

main();
