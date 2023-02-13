const uuid = require('uuid')
const Otp = require('../../../models/otp')
const {
  getIP,
  getBrowserInfo,
  getCountry,
  buildErrObject
} = require('../../../middleware/utils')

const axios = require('axios');

/**
 * Creates a new password forgot
 * @param {Object} req - request object
 */
const saveOTP = (req = {}, data = {}) => {
  return new Promise((resolve, reject) => {

    const random = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
    const otp = new Otp({
        user_id: data._id,
        mobile_phone: formatMobilePhone(data.mobile_phone),
        code: random,
        verification: data.verification,
        ipRequest: getIP(req),
        browserRequest: getBrowserInfo(req)
    })
    otp.save(async (err, item) => {
      if (err) {
        return reject(buildErrObject(203, err.message))
      }
      const dataOTP = {
        apikey: "feab48b57f5cd5ac97c67a25ce3409dd",
        callbackurl: "",
        datapacket: [
            {
              number: item.mobile_phone,
              message: `Pakai kode OTP ${item.code} untuk masuk ke akun Meditech+. JANGAN KASIH KODENYA KE SIAPA PUN, bahkan yang ngaku Pegawai Meditech+.`
            }
        ]
      }
      const headers = { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept-Encoding": "gzip,deflate,compress",
        "Accept": "application/json"
      };

      await axios.post('https://sms114.xyz/sms/api_sms_otp_send_json.php', dataOTP, { headers })
      delete item.code
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
  return mobile
}

module.exports = { saveOTP }
