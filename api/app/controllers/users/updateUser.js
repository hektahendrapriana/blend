const User = require('../../models/user')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')
const { emailExistsExcludingMyself } = require('../../middleware/emailer')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
  try {
    var user_id = req.user._id;
    req = matchedData(req)
    
    const updateData = req;
    updateData.modifiedBy = user_id;
    updateData.mobile_phone = '+62' + formatMobilePhone(req.mobile_phone)
    updateData.phone_number = formatPhonetoSave(req.phone_number)
    updateData.user_name = typeof(updateData.user_name) !== 'undefined' ? updateData.user_name.toLowerCase() : ''
    updateData.email = typeof(updateData.email) !== 'undefined' ? updateData.email.toLowerCase() : ''
    
    const id = await isIDGood(updateData.id)
    const doesEmailExists = await emailExistsExcludingMyself(id, updateData.email)
    if (!doesEmailExists) {
      res.status(200).json(await updateItem(id, User, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
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

module.exports = { updateUser }
