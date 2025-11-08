export default () => ({
  port: process.env.PORT,
  db: { url: process.env.DB_URL },
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
});
