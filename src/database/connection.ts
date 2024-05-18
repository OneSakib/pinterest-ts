import { connect } from "mongoose";
const db_connection = connect(
  `mongodb://${process.env.DATABASE_DOMAIN}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
);
export default db_connection;
