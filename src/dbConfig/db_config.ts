import mongoose from "mongoose";

const connect = async () => {


  try {

    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {

      console.log("MONGO DB CONNECTION SUCCESS");
    })
  } catch (error) {

    console.log(
      "DB CONFIG TS FILE :could not connect to database "
    );

  }




}


export default connect
