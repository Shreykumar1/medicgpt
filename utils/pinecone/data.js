// import { Pinecone } from "@pinecone-database/pinecone";
import fs from 'fs';

import { Pinecone } from '@pinecone-database/pinecone';


async function run() {
  // Initialize Pinecone client
try {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
  });
  const index = pc.index('medical-1');
  const vectors = JSON.parse(fs.readFileSync('./output_embeddings2.json', 'utf8')).slice(10500, 10601);
  const vect1 = vectors.map((v) => ({
    id: `vec${v.id}`,
    values: v.values,
    metadata: v.metadata
  }));
//   console.log(vect1);
  await index.namespace('ns1').upsert(vect1);
}
catch(error){
  console.log(error);
}

}

run().catch(console.error);
