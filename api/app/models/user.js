const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: false
    },
    first_name: {
      type: String,
      required: true
    },
    middle_name: {
      type: String,
      required: false
    },
    last_name: {
      type: String,
      required: false
    },
    mobile_phone: {
      type: String,
      required: false
    },
    phone_number: {
      type: String
    },
    address: {
      type: String
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: false
    },
    password: {
      type: String,
      required: false,
      select: false
    },
    role_id: {
      type: String,
      required: true,
      ref: "Role"
    },
    verification: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      default: 'Male'
    },
    avatar: {
      type: String
    },
    place_of_birth: {
      type: String
    },
    date_of_birth: {
      type: String
    },
    loginAttempts: {
      type: Number,
      default: 0,
      // select: false
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      // select: true
    },
    createdBy: {
        type: String,
        ref: "User"
    },
    modifiedBy: {
        type: String,
        ref: "User"
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}


UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  else
  {
    return genSalt(that, SALT_FACTOR, next)
  }
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}
UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', UserSchema)
