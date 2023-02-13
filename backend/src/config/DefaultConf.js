require('dotenv').config()
export const defaultConf = {
  url: "http://localhost:8080/blend/api/",
  baseUrl: process.env.REACT_BASE_URL,
  uploadUrl:  "http://localhost:8080/blend/api/uploads/",
  downloadUrl: "http://localhost:8080/blend/api/download/",
  pasien_role_id: "6357b57bd9ff5ca93acb1d5d",
  dokter_role_id: "6357b565d9ff5ca93acb1d53",
  dokter_admin_role_id: "63a3056cdba1616c0b08345f",
  perawat_role_id: "6357b572d9ff5ca93acb1d58",
}
