require("dotenv").config();
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const Admin = require('../modals/Admin')

const Patients = require('../modals/Patients');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  
  resources:[{
    resource: Patients,
    options: {
      parent:{
        name: 'Patient',
      },
      properties: {
        _id: {
          isVisible: {
            show: false,
          }
        }
      }
    }
  },{
  resource: Admin,
    options: {
      parent:{
        name: 'Admin',
      },
      properties: {
        _id: {
          isVisible: {
            show: false,
          }
        },
        Heading: {
          type: 'text'
        },
      }
    }
  },
],
  rootPath: '/admin',
  branding: {
    logo: 'https://image.flaticon.com/icons/png/128/924/924874.png',
    companyName: 'helpIndia',
  }
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin',
  password: process.env.ADMIN_PASSWORD || 'password'
} 

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-long-password',
  authenticate: async (email, password) => {
    if(email === ADMIN.email && password === ADMIN.password){
      return ADMIN
    }
    return null;
  }
})

module.exports = router;