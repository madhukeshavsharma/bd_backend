import express from 'express';
import import_routes from './import/route.js';
import export_routes from './export/route.js';
import {authenticate_admin} from '../../middlewares/auth.middleware.js';
import buyer_routes from './buyer/route.js';
import supplier_routes from './supplier/route.js';
// import export_routes from './export/route.js';
const routes = express.Router();

routes.use('/admin/buyer', buyer_routes.admin_routes);
routes.use('/buyer', buyer_routes.customer_routes);

routes.use('/admin/supplier', supplier_routes.admin_routes);
routes.use('/supplier', supplier_routes.customer_routes);

routes.use('/admin/import', import_routes.admin_routes);
routes.use('/import', import_routes.customer_routes);

routes.use('/admin/export', export_routes.admin_routes);
routes.use('/export', export_routes.customer_routes);

export default routes;
