module.exports = {
    create_promotion: {
        judul_promosi: 'string',
        tanggal_awal: 'string',
        tanggal_akhir: 'string',
        banner: 'string',
        isi: 'string',
        url_target: 'string',
        tags: 'string',
    },
    update_promotion: {
        judul_promosi: { type: 'string', optional: true },
        tanggal_awal: { type: 'string', optional: true },
        tanggal_akhir: { type: 'string', optional: true },
        banner: { type: 'string', optional: true },
        isi: { type: 'string', optional: true },
        url_target: { type: 'string', optional: true },
        tags: { type: 'string', optional: true },
    }
}