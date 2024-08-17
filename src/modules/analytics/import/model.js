
import Joi from 'joi';

const search_text = Joi.object({
  hs_code: Joi.array().items(Joi.string()),
  product_name: Joi.array().items(Joi.string()),
}).or('hs_code', 'product_name');

const filters = Joi.object({
  buyer_name: Joi.array().items(Joi.string()),
  supplier_name: Joi.array().items(Joi.string()),
  port_code: Joi.array().items(Joi.string()),
  unit: Joi.array().items(Joi.string()),
  country: Joi.array().items(Joi.string())
});

const pagination = Joi.object({
  page_index: Joi.string().min(1).required(),
  page_size: Joi.string().default(25),
});

const duration = Joi.object({
  start_date: Joi.date().required().less(Joi.ref('end_date')),
  end_date: Joi.date().required(),
});

export const search_import = Joi.object({
  search_text: search_text.required(),
  filters: filters,
  duration: duration.required(),
  pagination: pagination.required(),
  download_sub: Joi.boolean().default(false),
  chapter_code: Joi.string().min(2).required(),
});

