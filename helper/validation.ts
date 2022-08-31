import * as yup from "yup";


export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name should be required please"),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
  zipPostalCode: yup.number().positive().integer(),
  houseBuildingNo: yup.number().positive().integer(),
  countries: yup.string().required(),
  cities: yup.string().nullable(),
  states:yup.string(),
  cityId:yup.number()
});



export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});


export const editUpdateUserSchema = yup.object().shape({
  firstName: yup.string().required("First Name should be required please"),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
})

export const addressBookSchema = yup.object().shape({
  addressName: yup.string().required(),
  address: yup.string().required(),
  countries: yup.string().required(),
  zipPostalCode: yup.number().positive().integer(),
  houseBuildingNo: yup.number().positive().integer(),
  check: yup.boolean(),
  cities: yup.string().nullable(),
  states:yup.string(),
  cityId:yup.string()
})


export const changePasswordSchema = yup.object().shape({
  password: yup.string().min(8).max(15).required(),
  newpassword: yup.string().min(8).max(15).required(),
  confpassword: yup.string().min(8).max(15).required(),
})



export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),

})

export const verficationCodeSchema = yup.object().shape({
  verfication: yup.number().positive().required()
})

export const resetpasswordschema = yup.object().shape({
  newpassword: yup.string().min(8).max(15).required(),
  confirmnewpassword: yup.string().min(8).max(15).required(),
})


export const addToWishListSchema = yup.object().shape({
  title: yup.string().required(),
})


export const orderBySchema = yup.object().shape({
  orderBy:yup.string()
})

export const contactSchema = yup.object().shape({
  name:yup.string().required(),
  email:yup.string().email().required(),
  message:yup.string().required()
})


export const checkoutSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone:yup.number().positive().required()
});