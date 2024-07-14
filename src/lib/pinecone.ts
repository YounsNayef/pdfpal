import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: '4e7b7905-58ce-4e79-881a-a3bec0e198a4'
});

const index = pc.index('quickstart');

export { index };
