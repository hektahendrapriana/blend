const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')
const moment = require('moment')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = ({
  id_register_pasien = '',
  allow_remote = '',
  user_name = '',
  first_degree = '',
  first_name = '',
  middle_name = '',
  last_name = '',
  degree = '',
  golongandarah = '',
  bio = '',
  nik = '',
  mobile_phone = '',
  email = '',
  password = '',
  pin = '',
  role_id = '',
  phone_number = '',
  gender = '',
  avatar = '',
  additional_contacts = '',
  hospitals = '',
  services = '',
  date_of_birth = '',
  place_of_birth = '',
  createdBy = '',
}) => {
  return new Promise((resolve, reject) => {

    const [day, month, year] =  date_of_birth.split('-')
    date_of_birth = `${year}-${month}-${day}`
    mobile_phone = '+62' + formatMobilePhone(mobile_phone)
    phone_number = formatPhonetoSave(phone_number)

    const user = new User({
      id_register_pasien,
      user_name,
      allow_remote,
      first_degree,
      first_name,
      middle_name,
      last_name,
      degree,
      golongandarah,
      bio,
      nik,
      mobile_phone,
      email,
      password,
      pin,
      role_id,
      phone_number,
      gender,
      avatar,
      additional_contacts,
      hospitals,
      services,
      date_of_birth,
      place_of_birth,
      createdBy,
      // modifiedBy,
      verification: uuid.v4()
    })
    console.log(user);
    user.save((err, item) => {
      console.log(err)
      console.log(item)
      if (err) {
        reject(buildErrObject(203, err.message))
      }
      item = JSON.parse(JSON.stringify(item))

      delete item.password
      delete item.pin
      delete item.blockExpires
      delete item.loginAttempts

      resolve(item)
    })
  })
}

const formatMobilePhone = (mobile_no) => {
  let mobile = mobile_no;
  let firstNo = String(mobile.substring(0, 1));
  if( firstNo === '0' )
  {
      mobile = '+62' + mobile.slice(1);
  }
  let secondNo = String(mobile.substring(0, 2));
  if( secondNo === '62' )
  {
      mobile = '+62' + mobile.slice(2);
  }
  mobile = mobile.replace(' ', '');
  mobile = mobile.replace('+62', '');
  return mobile
}

const formatPhonetoSave = (phone_no) => {
  let phone = phone_no;
  let firstNo = String(phone.substring(0, 1));
  if( firstNo === '0' )
  {
      phone = '+62' + phone.slice(1);
  }
  let secondNo = String(phone.substring(0, 2));
  if( secondNo === '62' )
  {
      phone = '+62' + phone_no.slice(2);
  }

  let thirdNo = String(phone.substring(0, 3));
  if( secondNo === '062' )
  {
      phone = '+62' + phone_no.slice(3);
  }
  return phone
}
module.exports = { createItemInDb }
