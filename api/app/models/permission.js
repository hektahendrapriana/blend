const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PermissionSchema = new mongoose.Schema(
  {
    role_id: {
      type: String,
      ref: "Role"
    },
    page_id: {
      type: String,
      ref: "Page"
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
PermissionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Permission', PermissionSchema)
