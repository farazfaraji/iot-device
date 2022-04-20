export default () => ({
  security: {
    jwt_secret: process.env.jwt_secret || 'test',
  },
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
