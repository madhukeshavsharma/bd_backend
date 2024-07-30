import jwt from 'jsonwebtoken';
import {UserType} from '../../enum.js';

export default (user_type, entity) => {
  
  
  
  

  return jwt.sign(entity, process.env.JWT_ACCESS_PRIVATE_KEY, {
    expiresIn:"4h"
  });
};
