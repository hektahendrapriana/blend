const { matchedData } = require('express-validator')
const { updateItem, getFilebyName } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const uploadOrderMiddleware = require('../../middleware/utils/UploadFileBukti')
const Order = require('../../models/order')
const pdfjsLib = require("pdfjs-dist")
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// const pdfjsworker = require("pdfjs-dist/legacy/build/pdf.worker.entry.js");

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsworker

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const uploadBukti = async (req, res) => {
  try {
    const id = await isIDGood(req.params.id)
    await uploadOrderMiddleware(req, res);

    if(!req.files)
    {
      res.send({
          status: false,
          message: 'No file uploaded'
      });
    }
    else
    {
      let data = [];
      req.files.map( p =>
        data = {
          id: id,
          payment_status: req.body.payment_status,
          filename: p.originalname,
          upload_file: __upload_path + 'buktipembayaran/' + p.originalname,
          thumbnail: __upload_path + 'buktipembayaran/' + "_thumb_" + p.originalname,
          mimetype: p.mimetype,
          size: p.size,
          modifiedBy: req.user._id
        }
      )
      
      console.log('data', data)

      res.status(200).json(await updateItem(id, Order, data))
    }
  } catch (error) {
    handleError(res, error)
  }
}

const downloadBukti = async (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + __upload_path + 'buktipembayaran/';

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(203).send({
        status: 203,
        code: 203,
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = { uploadBukti, downloadBukti }
