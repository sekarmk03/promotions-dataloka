const { t_banner_promosi: Promotion } = require('../models');
const schema = require('../common/validation_schema');
const err = require('../common/error');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = {
    index: async (req, res, next) => {
        try {
            let {
                page = "1", limit = "90"
            } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);
            let start = 0 + (page - 1) * limit;
            let end = page * limit;

            const promotions = await Promotion.findAndCountAll({
                where: {
                    deleted: 0
                },
                limit: limit,
                offset: start
            });

            let count = promotions.count;
            let pagination = {};
            pagination.totalRows = count;
            pagination.totalPages = Math.ceil(count / limit);
            pagination.thisPageRows = promotions.rows.length;
            pagination.currentPage = page;
            pagination.next = end < count ? page + 1 : null;
            pagination.prev = start > 0 ? page - 1 : null;

            return res.status(200).json({
                status: 'OK',
                message: 'Get all promotions',
                pagination,
                data: promotions.rows
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            const { id } = req.params;
            const promotion = await Promotion.findOne({
                where: {
                    id_banner_promosi: id,
                    deleted: 0
                },
            });

            if (!promotion) return err.not_found(res, 'Promotion not found');

            return res.status(200).json({
                status: 'OK',
                message: 'Get promotion success',
                data: promotion
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;
            
            const val = v.validate(body, schema.promotion.create_promotion);
            if (val.length) return err.bad_request(res, val[0].message);

            const { judul_promosi, tanggal_awal, tanggal_akhir, banner, isi, url_target, tags } = body;
            const createdBy = req.user.fullname;
            const deleted = 0;

            const createdPromotion = await Promotion.create({
                judul_promosi,
                tanggal_awal,
                tanggal_akhir,
                banner,
                isi,
                url_target,
                tags,
                deleted,
                created_by: createdBy
            });

            return res.status(201).json({
                status: 'CREATED',
                message: 'New promotion successfully created',
                data: createdPromotion
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            let { judul_promosi, tanggal_awal, tanggal_akhir, banner, isi, url_target, tags } = body;
            
            const val = v.validate(body, schema.promotion.update_promotion);
            if (val.length) return err.bad_request(res, val[0].message);

            const promotion = await Promotion.findOne({
                where: {
                    id_banner_promosi: id,
                    deleted: 0
                }
            });
            if (!promotion) return err.not_found(res, 'Promotion not found');

            if (!judul_promosi) judul_promosi = promotion.judul_promosi;
            if (!tanggal_awal) tanggal_awal = promotion.tanggal_awal;
            if (!tanggal_akhir) tanggal_akhir = promotion.tanggal_akhir;
            if (!banner) banner = promotion.banner;
            if (!isi) isi = promotion.isi;
            if (!url_target) url_target = promotion.url_target;
            if (!tags) tags = promotion.tags;

            const update = await promotion.update({
                judul_promosi,
                tanggal_awal,
                tanggal_akhir,
                banner,
                isi,
                url_target,
                tags
            });

            return res.status(200).json({
                status: 'OK',
                message: 'Update promotion success',
                data: update
            })
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const promotion = await Promotion.findOne({
                where: {
                    id_banner_promosi: id,
                    deleted: 0,
                }
            });

            if(!promotion) return err.not_found(res, 'Promotion not found');

            await promotion.update({
                deleted: 1
            });

            return res.status(200).json({
                status: 'OK',
                message: 'Delete promotion success',
                data: {
                    id: promotion.id_banner_promosi,
                    judul_promosi: promotion.judul_promosi
                },
            });
        } catch (error) {
            next(error);
        }
    }
}