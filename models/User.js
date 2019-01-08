const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema (
  {

    email:{
      type: String,
      required: true,
      unique:true
    },
    usertype:{
      type: String,
      enum:['agent','user'],
      required: true,
    },
    saldo:Number,
    bank:{
      name: String,
      bank: String,
      number: String,
      country: String
    },
    blockchain:{
      address: String,
      public: String,
      private: String
    }
    
    
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
)


userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model('User', userSchema);

