// src/hash.ts

import * as bcrypt from 'bcrypt';

async function run() {
  const hash = await bcrypt.hash(
    'fire777',
    10,
  );

  console.log(hash);
}

run();