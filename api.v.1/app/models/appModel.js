'user strict'
const connection = require('../../config/database.js');
const bcrypt = require('bcryptjs');
const dateFormat = require('dateformat')
var arrResult = [];
//User object constructor
var Model = {}

Model.createUser = (req, callback, next) => {
    const pwd = req.password;
    const values = [
        [req.email, bcrypt.hashSync(req.password, 10).replace("$2a$", "$2y$"), req.name, req.address, req.phone, "1", req.role, req.kode_trader]
    ]

    try {
        const user = findUserByEmail(req.email);
        user.then((row) => {
            if (row.length == 0) {
                connection.query("INSERT INTO tm_user (email, password, nama, alamat, telepon, status, user_role, kode_trader) VALUES ?", [values], (err, result) => {
                    if (err) {
                        next(err);
                    } else {
                        if (result.affectedRows) {
                            arrResult = [{ user_id: result.insertId }]
                        }
                        callback(arrResult);
                    }
                });
            } else {
                callback(arrResult);
            }
        }, (error) => {
            next(error);
        })
    } catch (error) {
        next(error);
    }
}

Model.getUsersById = (param, callback, next) => {
    connection.query("SELECT email, nama, alamat, telepon, status FROM tm_user WHERE id = ? and kode_trader = ? ",
        [param.user_id, param.id_trader], (err, users) => {
            if (err) {
                next(err);
            } else {
                if (users.length > 0) {
                    arrResult = users
                }
                callback(arrResult);
            }
        });
}

Model.getAllUsers = (company_id, callback, next) => {
    connection.query("SELECT email, nama, alamat, telepon, status FROM tm_user WHERE kode_trader = ?",
        company_id, (err, users) => {
            if (err) {
                next(err);
            } else {
                if (users.length > 0) {
                    arrResult = users
                }
                callback(arrResult);
            }
        });
}

Model.updateUserById = (key, user, callback, next) => {
    connection.query("UPDATE tm_user SET nama = ?, user_role = ?, alamat = ?, telepon = ? WHERE id = ? AND kode_trader = ?",
        [user.name, user.role, user.address, user.phone, key.user_id, key.id_trader], (err, res) => {
            if (err) {
                next(err);
            } else {
                if (res.affectedRows) {
                    arrResult = [user]
                }
                callback(arrResult);
            }
        });
}

Model.deleteUserbyId = (param, callback, next) => {
    connection.query("DELETE FROM tm_user WHERE id = ? AND kode_trader = ?",
        [param.user_id, param.id_trader], (err, res) => {
            if (err) {
                next(err);
            } else {
                if (res.affectedRows) {
                    arrResult = [res.affectedRows]
                }
                callback(arrResult);
            }
        });
}

Model.getAllSuppliers = (company_id, callback, next) => {
    connection.query("SELECT nm_supplier as name, almt_supplier as address, kd_negara as flag_code, npwp_supplier as npwp FROM reff_supplier WHERE kode_trader = ?",
        company_id, (err, supplier) => {
            if (err) {
                next(err);
            } else {
                if (supplier.length > 0) {
                    arrResult = supplier
                }
                callback(arrResult);
            }
        });
}

Model.getSupplierById = (param, callback, next) => {
    connection.query("SELECT nm_supplier as name, almt_supplier as address, kd_negara as flag_code, npwp_supplier as npwp FROM reff_supplier WHERE kd_supplier = ? and kode_trader = ? ",
        [param.id, param.id_trader], (err, supplier) => {
            if (err) {
                next(err);
            } else {
                if (supplier.length > 0) {
                    arrResult = supplier
                }
                callback(arrResult);
            }
        });
}

Model.createSupplier = (req, callback, next) => {
    const checkNPWP = new Promise((resolve, reject) => {
        connection.query("SELECT npwp_supplier FROM reff_supplier WHERE npwp_supplier = ? AND kode_trader = ?", [req.npwp, req.kode_trader],
            (err, rows) => {
                if (err)
                    reject(err)
                resolve(rows)
            })
    })

    try {
        checkNPWP.then((row) => {
            if (row.length == 0) {
                const values = [
                    [req.name, req.address, req.flag_code, req.npwp, req.kode_trader]
                ]
                connection.query("INSERT INTO reff_supplier (nm_supplier, almt_supplier, kd_negara, npwp_supplier, kode_trader) VALUES ?", [values],
                    (err, result) => {
                        if (err) {
                            next(err);
                        } else {
                            if (result.affectedRows) {
                                arrResult = [{ supplier_id: result.insertId }]
                            }
                            callback(arrResult);
                        }
                    });
            } else {
                callback(arrResult);
            }
        }, (error) => {
            next(error);
        })
    } catch (error) {
        next(error)
    }
}

Model.updateSupplierById = (key, supplier, callback, next) => {
    connection.query("UPDATE reff_supplier SET nm_supplier = ?, almt_supplier = ?, kd_negara = ?  WHERE kd_supplier = ? AND kode_trader = ?",
        [supplier.name, supplier.address, supplier.flag_code, key.id, key.id_trader], (err, res) => {
            if (err) {
                next(err);
            } else {
                if (res.affectedRows) {
                    arrResult = [supplier]
                }
                callback(arrResult);
            }
        });
}

Model.deleteSupplierById = (param, callback, next) => {
    connection.query("DELETE FROM reff_supplier WHERE kd_supplier = ? AND kode_trader = ?",
        [param.id, param.id_trader], (err, res) => {
            if (err) {
                next(err);
            } else {
                if (res.affectedRows) {
                    arrResult = [res.affectedRows]
                }
                callback(arrResult);
            }
        });
}

Model.getAllWarehouse = (company_id, callback, next) => {
    connection.query("SELECT kode as code, nama as name, uraian as description FROM tm_warehouse WHERE kode_trader = ?",
        company_id, (err, warehouse) => {
            if (err) {
                next(err);
            } else {
                if (warehouse.length > 0) {
                    arrResult = warehouse
                }
                callback(arrResult);
            }
        });
}

Model.getWarehouseById = (param, callback, next) => {
    connection.query("SELECT kode as code, nama as name, uraian as description FROM tm_warehouse WHERE id = ? and kode_trader = ? ",
        [param.id, param.id_trader], (err, warehouse) => {
            if (err) {
                next(err);
            } else {
                if (warehouse.length > 0) {
                    arrResult = warehouse
                }
                callback(arrResult);
            }
        });
}

Model.createWarehouse = (req, callback, next) => {
    const checkWarehouseName = new Promise((resolve, reject) => {
        connection.query("SELECT kode FROM tm_warehouse WHERE kode = ? AND kode_trader = ?", [req.code, req.kode_trader],
            (err, rows) => {
                if (err)
                    reject(err)
                resolve(rows)
            })
    })

    try {
        checkWarehouseName.then((row) => {
            if (row.length == 0) {
                const values = [
                    [req.code, req.name, req.description, req.user_id, req.kode_trader]
                ]
                connection.query("INSERT INTO tm_warehouse (kode, nama, uraian, created_by, kode_trader) VALUES ?", [values],
                    (err, result) => {
                        if (err) {
                            next(err);
                        } else {
                            if (result.affectedRows) {
                                arrResult = [{ warehouse_id: result.insertId }]
                            }
                            callback(arrResult);
                        }
                    });
            } else {
                callback(arrResult);
            }
        }, (error) => {
            next(error);
        })
    } catch (error) {
        next(error)
    }
}

Model.updateWarehouseById = (key, data, callback, next) => {
    connection.query("UPDATE tm_warehouse SET nama= ?, uraian = ? WHERE id = ? AND kode_trader = ?",
        [data.name, data.description, key.id, key.id_trader], (err, res) => {
            if (err) {
                next(err);
            } else {
                if (res.affectedRows) {
                    arrResult = [data]
                }
                callback(arrResult);
            }
        });
}

Model.deleteWarehouseById = (param, callback, next) => {
    connection.query("DELETE FROM tm_warehouse WHERE id = ? AND kode_trader = ?",
        [param.id, param.id_trader], (err, res) => {
            if (err) {
                next(err);
            } else {
                if (res.affectedRows) {
                    arrResult = [res.affectedRows]
                }
                callback(arrResult);
            }
        });
}

Model.getAllItem = (company_id, callback, next) => {
    let arrData = []
    let x = 0
    try {
        connection.query("SELECT a.id, a.kd_brg, a.jns_brg, a.nm_brg, a.kd_satuan, a.kd_satuan_terkecil, a.nilai_konversi, a.kd_hs, a.stock_akhir, b.saldo, c.kode as kode_gudang FROM tm_barang a LEFT JOIN tm_barang_gudang b ON a.id = b.id_barang LEFT JOIN tm_warehouse c ON c.id = b.id_gudang WHERE a.kode_trader ", [company_id], (err, rows) => {
            if (err) next(err)

            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    let findBarang = arrData.findIndex(y => y.kd_brg === rows[i].kd_brg);
                    if (findBarang < 0) {
                        arrData[x] = {
                            "kd_brg": rows[i].kd_brg,
                            "jns_brg": rows[i].jns_brg,
                            "nm_brg": rows[i].nm_brg,
                            "kd_satuan": rows[i].kd_satuan,
                            "kd_satuan_terkecil": rows[i].kd_satuan_terkecil,
                            "nilai_konversi": rows[i].nilai_konversi,
                            "kd_hs": rows[i].kd_hs,
                            "stock_akhir": rows[i].stock_akhir,
                            "data_gudang": [
                                {
                                    'kode_gudang': rows[i].kode_gudang,
                                    'saldo': rows[i].saldo
                                }
                            ]
                        }
                        x++;
                    } else {
                        arrData[findBarang].data_gudang.push(
                            {
                                'kode_gudang': rows[i].kode_gudang,
                                'saldo': rows[i].saldo
                            }
                        )
                    }
                }
                arrResult = arrData;
            }
            callback(arrResult)
        })
    } catch (error) {
        next(error)
    }
}

Model.getItemById = (param, callback, next) => {
    let arrData = []
    let x = 0

    try {
        connection.query("SELECT a.id, a.kd_brg, a.jns_brg, a.nm_brg, a.kd_satuan, a.kd_satuan_terkecil, a.nilai_konversi, a.kd_hs, a.stock_akhir, b.saldo, c.kode as kode_gudang FROM tm_barang a LEFT JOIN tm_barang_gudang b ON a.id = b.id_barang LEFT JOIN tm_warehouse c ON c.id = b.id_gudang WHERE a.id = ? AND a.kode_trader = ? ", [param.id, param.kode_trader], (err, rows) => {
            if (err) next(err)

            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    let findBarang = arrData.findIndex(y => y.kd_brg === rows[i].kd_brg);
                    if (findBarang < 0) {
                        arrData[x] = {
                            "kd_brg": rows[i].kd_brg,
                            "jns_brg": rows[i].jns_brg,
                            "nm_brg": rows[i].nm_brg,
                            "kd_satuan": rows[i].kd_satuan,
                            "kd_satuan_terkecil": rows[i].kd_satuan_terkecil,
                            "nilai_konversi": rows[i].nilai_konversi,
                            "kd_hs": rows[i].kd_hs,
                            "stock_akhir": rows[i].stock_akhir,
                            "data_gudang": [
                                {
                                    'kode_gudang': rows[i].kode_gudang,
                                    'saldo': rows[i].saldo
                                }
                            ]
                        }
                        x++;
                    } else {
                        arrData[findBarang].data_gudang.push(
                            {
                                'kode_gudang': rows[i].kode_gudang,
                                'saldo': rows[i].saldo
                            }
                        )
                    }
                }
                arrResult = arrData;
            }
            callback(arrResult)
        })
    } catch (error) {
        next(error)
    }
}

Model.createItem = (req, callback, next) => {
    let gudang = [];
    var findWarehouse;

    try {
        findWarehouseByTrader(req.kode_trader).then((row) => {
            for (let i = 0; i < req.details.length; i++) {
                findWarehouse = row.find(dataGudang =>
                    (dataGudang.kode === req.details[i].kode_gudang)
                )

                if (findWarehouse != undefined) {
                    gudang[i] = {
                        "id_gudang": findWarehouse.id
                    }
                }
            }
            return gudang
        }, (error) => {
            next(error);
        }).then((data) => {
            console.log(data);
        });

        // findBarangByIdTrader(req.kode_trader).then((row) => {
        //     const findBarang = row.find(y =>
        //         (y.kd_brg === req.kode_barang) && (y.jns_brg === req.jns_barang)
        //     )
        //     if (findBarang == undefined) {

        //     }
        // }, (error) => {
        //     next(error);
        // }).then((data) => {
        //     console.log(data);
        // });
    } catch (error) {
        next(error)
    }
}

Model.createGrnAllElement = (req, callback, next) => {
    let err = 0;
    let values = [];
    let message = "";
    let arrData = [];
    let status_realisasi = "D";
    let status_detil = "00";
    let valDtl = [];
    let inout = [];
    let log_in = [];
    let jml_inout = 0;
    let sql = "";
    let where = [];
    let title = "";

    let findDataGRN = new Promise((resolve, reject) => {
        if (req.realisasi.toUpperCase() === "N") {
            if (req.tipe_dokumen === "0") {
                if (req.show_aju.toUpperCase() === "Y") {
                    sql = "SELECT nomor_aju FROM tpb_hdr WHERE nomor_aju = ? AND jns_dokumen = ? AND kode_trader = ?"
                    where = [req.nomor_aju, req.jns_dokumen, req.kode_trader]
                    title = "Jenis Dokumen dan Nomor Aju"
                } else {
                    sql = "SELECT no_daftar FROM tpb_hdr WHERE no_daftar = ? AND tgl_daftar = ? AND kode_trader = ?"
                    where = [req.nomor_daftar, req.tanggal_daftar, req.kode_trader]
                    title = "Nomor Daftar dan Tanggal Daftar"
                }
            } else {
                sql = "SELECT no_inout FROM tpb_hdr WHERE no_inout = ? AND DATE_FORMAT(tgl_inout, '%Y-%m-%d') = ? AND kode_trader = ?"
                where = [req.no_grn, dateFormat(req.tgl_grn, "yyyy-mm-dd"), req.kode_trader]
                title = "Nomor GRN dan Tanggal GRN"
            }
        } else {
            sql = "SELECT no_inout FROM tpb_hdr WHERE no_inout = ? AND DATE_FORMAT(tgl_inout, '%Y-%m-%d') = ? AND kode_trader = ?"
            where = [req.no_grn, dateFormat(req.tgl_grn, "yyyy-mm-dd"), req.kode_trader]
            title = "Nomor GRN dan Tanggal GRN"
        }

        connection.query(sql, where, (err, rows) => {
            if (err) reject(err)

            if (rows.length > 0) {
                resolve('exist')
            } else {
                let arrData = findBarangByIdTrader(req.kode_trader)
                resolve(arrData)
            }
        })
    })

    try {
        findDataGRN.then((row) => {
            if (row == "exist") {
                return arrResult = {
                    error: true,
                    message: title + ' sudah ada.'
                }
            } else {
                return new Promise((resolve, reject) => {
                    connection.query("SELECT npwp_supplier as kode, kd_supplier as id FROM reff_supplier WHERE kode_trader = ? AND npwp_supplier = ?", [req.kode_trader, req.kode_partner], (error, res) => {
                        if (error) reject(error);

                        if (res.length > 0) {
                            for (let i = 0; i < req.details.length; i++) {
                                const findBarang = row.find(y =>
                                    (y.kd_brg === req.details[i].kode_barang) && (y.kd_satuan === req.details[i].kode_satuan || y.kd_satuan_terkecil === req.details[i].kode_satuan) && (y.kode_gudang === req.details[i].kode_gudang)
                                )

                                if (findBarang == undefined) {
                                    err += 1
                                    message += req.details[i].kode_barang + ", " + req.details[i].kode_satuan + ", " + req.details[i].kode_gudang + "<br/>"
                                } else {
                                    if (req.realisasi.toUpperCase() === "Y") {
                                        if (req.details[i].kode_satuan != findBarang.kd_satuan) {
                                            jml_inout = findBarang.nilai_konversi * req.details[i].jml_satuan
                                        } else {
                                            jml_inout = req.details[i].jml_satuan
                                        }
                                    } else {
                                        jml_inout = req.details[i].jml_satuan
                                    }

                                    values[i] = {
                                        'id_brg': findBarang.id_brg,
                                        'id_gudang': findBarang.id_gudang,
                                        'jml_satuan': req.details[i].jml_satuan,
                                        'kode_satuan': req.details[i].kode_satuan,
                                        'unit_price': req.details[i].unit_price,
                                        'price': (req.details[i].unit_price * req.details[i].jml_satuan),
                                        'asal_barang': 'I',
                                        'seri_barang': (i + 1),
                                        'kd_negara_asal': req.details[i].kode_negara_asal,
                                        'jml_inout': jml_inout
                                    }
                                }
                            }

                            if (err > 0) {
                                arrResult = {
                                    error: true,
                                    message: 'Terdapat kode barang / kode satuan / kode gudang yang tidak terdaftar di inventory, yaitu : ' + message
                                }
                            } else {
                                arrResult = {
                                    'jns_inout': 'IN',
                                    'no_inout': req.no_grn,
                                    'tgl_inout': req.tgl_grn,
                                    'source_dokumen': req.source_dokumen,
                                    'jns_dokumen': req.jns_dokumen,
                                    'nomor_aju': req.nomor_aju,
                                    'no_daftar': req.nomor_daftar,
                                    'tgl_daftar': req.tanggal_daftar,
                                    'kd_valuta': req.kode_valuta,
                                    'created_by': req.user_id,
                                    'kode_trader': req.kode_trader,
                                    'partner_id': res[0].id,
                                    'realisasi_flag': req.realisasi,
                                    'tgl_realisasi': req.tgl_realisasi,
                                    'details': values
                                }
                            }
                        } else {
                            arrResult = {
                                error: true,
                                message: 'partner_id: ' + req.kode_partner + ' tidak dikenali'
                            }
                        }
                        resolve(arrResult)
                    });
                })
            }
        }, (error) => {
            next(error);
        }).then((data) => {
            if (data.error === true) {
                arrData = {
                    error: true,
                    message: data.message
                }
                callback(arrData)
            } else {
                if (data.realisasi_flag.toUpperCase() === "Y") {
                    status_realisasi = "R"
                    status_detil = "04"
                }

                const val = [
                    [data.jns_inout, data.no_inout, data.tgl_inout, data.source_dokumen, data.tgl_realisasi, data.jns_dokumen, data.nomor_aju, data.no_daftar, data.tgl_daftar, data.kd_valuta, status_realisasi, data.created_by, data.partner_id, data.kode_trader]
                ]

                connection.query("INSERT INTO tpb_hdr (jns_inout, no_inout, tgl_inout, source_dokumen, tgl_realisasi, jns_dokumen, nomor_aju, no_daftar, tgl_daftar, kd_valuta, status, created_by, partner_id, kode_trader) VALUES ?", [val], (err, res) => {
                    if (err) next(err)

                    for (let i = 0; i < data.details.length; i++) {
                        valDtl[i] = [data.details[i].jml_satuan, data.details[i].kode_satuan, data.details[i].unit_price, data.details[i].price, data.details[i].asal_barang, data.details[i].seri_barang, data.details[i].kd_negara_asal, data.created_by, status_detil, data.details[i].id_brg, res.insertId, data.details[i].id_gudang]

                        if (data.realisasi_flag.toUpperCase() == "Y") {
                            inout[i] = ['GATE-IN', data.details[i].jml_inout, data.tgl_realisasi, data.created_by, res.insertId, data.details[i].id_brg, data.details[i].id_gudang, data.kode_trader]

                            log_in[i] = [data.details[i].jml_inout, data.details[i].unit_price, data.details[i].jml_inout, 'N']
                        }
                    }

                    connection.query("INSERT INTO tpb_dtl (jml_satuan, kd_satuan, unit_price, price, asal_barang, seri_barang, kd_negara_asal, created_by, status, id_barang, id_hdr, id_warehouse) VALUES ? ", [valDtl], (err, result) => {
                        if (err) next(err)

                        if (data.realisasi_flag.toUpperCase() == "Y") {
                            for (let i = 0; i < inout.length; i++) {
                                if (i == 0) {
                                    inout[i].push(result.insertId)
                                } else {
                                    inout[i].push(result.insertId + 1)
                                }
                            }

                            connection.query("INSERT INTO tr_inout (tipe, jml_satuan, tgl_realisasi, created_by, id_hdr, id_brg, id_gudang, kode_trader, id_dtl) VALUES ? ", [inout], (errors, resData) => {
                                if (errors) next(errors)

                                if (req.fasilitas_perusahaan == "2" || req.fasilitas_perusahaan == "5") {
                                    for (let x = 0; x < log_in.length; x++) {
                                        if (x == 0) {
                                            log_in[x].push(resData.insertId)
                                        } else {
                                            log_in[x].push(resData.insertId + 1)
                                        }
                                    }

                                    connection.query("INSERT INTO tr_logbook_in (jml_satuan, unit_price, saldo, flag_tutup, inout_id) VALUES ? ", [log_in], (err, res) => {
                                        if (err) next(err)
                                    })
                                }
                                callback(arrData = {
                                    error: false,
                                    message: "Data berhasil diproses."
                                })
                            })
                        } else {
                            callback(arrData = {
                                error: false,
                                message: "Data berhasil diproses."
                            })
                        }
                    })
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

Model.realisasiGrn = (req, callback, next) => {
    let warning = 0;
    let message = "";
    let jml_inout = 0;
    let inout = [];
    let log_in = [];
    let sql = "";
    let set = [];
    let date_ob = new Date();
    let updated_time = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2) + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds();

    let findGrn = new Promise((resolve, reject) => {
        connection.query("SELECT id, status, no_inout, no_daftar, DATE_FORMAT(tgl_daftar, '%Y-%m-%d') AS tgl_daftar, jns_dokumen, nomor_aju FROM tpb_hdr WHERE jns_inout = 'IN' AND source_dokumen = ? AND kode_trader = ?", [req.source_dokumen, req.kode_trader], (err, rows) => {
            if (err) reject(err)

            if (rows.length > 0) {
                if (rows[0].status === "R" && req.no_grn == rows[0].no_inout) {
                    resolve({ error: true, message: 'Source Dokumen & No GRN sudah direalisasi.' })
                } else {
                    resolve({ error: false, id: rows[0].id })
                }
            } else {
                resolve({ error: true, message: 'Source Dokumen tidak ditemukan.' })
            }
        })
    })

    try {
        findGrn.then((row) => {
            if (row.error === true) callback(row)

            connection.query("SELECT b.jml_satuan, b.kd_satuan, b.id as dtl_id, c.kd_brg, c.kd_satuan as kd_satuan_barang, b.unit_price, c.kd_satuan_terkecil, c.nilai_konversi, c.id as id_barang, d.id_gudang as id_warehouse, e.nama as nama_gudang FROM tpb_dtl b LEFT JOIN tm_barang c on c.id = b.id_barang AND c.kode_trader = ? LEFT JOIN tm_barang_gudang d on d.id_barang = c.id AND b.id_warehouse = d.id_gudang LEFT JOIN tm_warehouse e on e.id = b.id_warehouse AND c.kode_trader = e.kode_trader WHERE b.id_hdr = ? AND b.status = '00' ORDER BY b.id ASC", [req.kode_trader, row.id], (err, result) => {
                if (err) next(err)

                if (result.length == 0) callback({ error: true, message: 'Detil Barang Tidak Ditemukan.' })

                for (let i = 0; i < result.length; i++) {
                    if (result[i].id_barang === null) {
                        warning += 1
                        message += "Kode Barang " + result[i].kd_brg + " tidak dikenali.<br/>"
                    }

                    if (result[i].id_warehouse === null) {
                        warning += 1
                        message += "Gudang " + result[i].nama_gudang + " tidak dikenali."
                    }

                    if (warning === 0) {
                        if (result[i].kd_satuan != result[i].kd_satuan_terkecil) {
                            jml_inout = result[i].nilai_konversi * result[i].jml_satuan
                        } else {
                            jml_inout = result[i].jml_satuan
                        }

                        inout[i] = ['GATE-IN', jml_inout, req.tgl_realisasi, req.user_id, row.id, result[i].dtl_id, result[i].id_barang, result[i].id_warehouse, req.kode_trader]

                        log_in[i] = [jml_inout, result[i].unit_price, jml_inout, 'N']

                    }
                }

                if (warning > 0) callback({ error: true, message: message })

                if (req.tipe_dokumen === "0") {
                    if (req.show_aju.toUpperCase() === "Y") {
                        sql = "UPDATE tpb_hdr SET tgl_realisasi = ?, jns_dokumen = ?, nomor_aju = ?, no_daftar = ?, tgl_daftar = ?, updated_by = ?, updated_time = ?, status = ? WHERE id = ?"
                        set = [req.tgl_realisasi, req.jns_dokumen, req.nomor_aju, req.nomor_daftar, req.tgl_daftar, req.user_id, updated_time, 'R', row.id]
                    } else {
                        sql = "UPDATE tpb_hdr SET tgl_realisasi = ?, jns_dokumen = ?, no_daftar = ?, tgl_daftar = ?, updated_by = ?, updated_time = ?, status = ? WHERE id = ?"
                        set = [req.tgl_realisasi, req.jns_dokumen, req.nomor_daftar, req.tgl_daftar, req.user_id, updated_time, 'R', row.id]
                    }
                } else {
                    sql = "UPDATE tpb_hdr SET no_inout = ?, tgl_inout = ?, tgl_realisasi = ?, updated_by = ?, updated_time = ?, status = ? WHERE id = ?"
                    set = [req.no_grn, req.tgl_grn, req.tgl_realisasi, req.user_id, updated_time, 'R', row.id]
                }

                connection.query(sql, set, (err, res) => {
                    if (err) next(err)

                    connection.query("UPDATE tpb_dtl SET status = ? WHERE id_hdr = ?", ['04', row.id], (err, res) => {
                        if (err) next(err)

                        connection.query("INSERT INTO tr_inout (tipe, jml_satuan, tgl_realisasi, created_by, id_hdr, id_dtl, id_brg, id_gudang, kode_trader) VALUES ? ", [inout], (errors, resData) => {
                            if (errors) next(errors)

                            if (req.fasilitas_perusahaan == "2" || req.fasilitas_perusahaan == "5") {
                                for (let x = 0; x < log_in.length; x++) {
                                    if (x == 0) {
                                        log_in[x].push(resData.insertId)
                                    } else {
                                        log_in[x].push(resData.insertId + 1)
                                    }
                                }

                                connection.query("INSERT INTO tr_logbook_in (jml_satuan, unit_price, saldo, flag_tutup, inout_id) VALUES ? ", [log_in], (err, res) => {
                                    if (err) next(err)
                                })
                            }

                            callback({
                                error: false,
                                message: "Data berhasil direalisasi."
                            })
                        })
                    })
                })
            })
        }, (error) => {
            next(error);
        })
    } catch (error) {
        next(error)
    }
}

Model.createGdnAllElement = (req, callback, next) => {
    let err = 0;
    let values = [];
    let message = "";
    let arrData = [];
    let status_realisasi = "D";
    let status_detil = "00";
    let valDtl = [];
    let inout = [];
    let log_in = [];
    let jml_inout = 0;
    let sql = "";
    let where = [];
    let title = "";

    let findDataGDN = new Promise((resolve, reject) => {
        if (req.realisasi.toUpperCase() === "N") {
            if (req.tipe_dokumen === "0") {
                if (req.show_aju.toUpperCase() === "Y") {
                    sql = "SELECT nomor_aju FROM tpb_hdr WHERE nomor_aju = ? AND jns_dokumen = ? AND kode_trader = ?"
                    where = [req.nomor_aju, req.jns_dokumen, req.kode_trader]
                    title = "Jenis Dokumen dan Nomor Aju"
                } else {
                    sql = "SELECT no_daftar FROM tpb_hdr WHERE no_daftar = ? AND tgl_daftar = ? AND kode_trader = ?"
                    where = [req.nomor_daftar, req.tanggal_daftar, req.kode_trader]
                    title = "Nomor Daftar dan Tanggal Daftar"
                }
            } else {
                sql = "SELECT no_inout FROM tpb_hdr WHERE no_inout = ? AND DATE_FORMAT(tgl_inout, '%Y-%m-%d') = ? AND kode_trader = ?"
                where = [req.no_grn, dateFormat(req.tgl_grn, "yyyy-mm-dd"), req.kode_trader]
                title = "Nomor GRN dan Tanggal GRN"
            }
        } else {
            sql = "SELECT no_inout FROM tpb_hdr WHERE no_inout = ? AND DATE_FORMAT(tgl_inout, '%Y-%m-%d') = ? AND kode_trader = ?"
            where = [req.no_grn, dateFormat(req.tgl_grn, "yyyy-mm-dd"), req.kode_trader]
            title = "Nomor GDN dan Tanggal GDN"
        }

        connection.query(sql, where, (err, rows) => {
            if (err) reject(err)

            if (rows.length > 0) {
                resolve('exist')
            } else {
                let arrData = findBarangByIdTrader(req.kode_trader)
                resolve(arrData)
            }
        })
    })

    try {
        findDataGDN.then((row) => {
            if (row == "exist") {
                return arrResult = {
                    error: true,
                    message: title + ' sudah ada.'
                }
            } else {
                return new Promise((resolve, reject) => {
                    connection.query("SELECT npwp_supplier as kode, kd_supplier as id FROM reff_supplier WHERE kode_trader = ? AND npwp_supplier = ?", [req.kode_trader, req.kode_partner], (error, res) => {
                        if (error) reject(error);

                        if (res.length > 0) {
                            for (let i = 0; i < req.details.length; i++) {
                                const findBarang = row.find(y =>
                                    (y.kd_brg === req.details[i].kode_barang) && (y.kd_satuan === req.details[i].kode_satuan || y.kd_satuan_terkecil === req.details[i].kode_satuan) && (y.kode_gudang === req.details[i].kode_gudang)
                                )

                                if (findBarang == undefined) {
                                    err += 1
                                    message += req.details[i].kode_barang + ", " + req.details[i].kode_satuan + ", " + req.details[i].kode_gudang + "<br/>"
                                } else {
                                    if (req.realisasi.toUpperCase() === "Y") {
                                        if (req.details[i].kode_satuan != findBarang.kd_satuan) {
                                            jml_inout = findBarang.nilai_konversi * req.details[i].jml_satuan
                                        } else {
                                            jml_inout = req.details[i].jml_satuan
                                        }
                                    } else {
                                        jml_inout = req.details[i].jml_satuan
                                    }

                                    values[i] = {
                                        'id_brg': findBarang.id_brg,
                                        'id_gudang': findBarang.id_gudang,
                                        'jml_satuan': req.details[i].jml_satuan,
                                        'kode_satuan': req.details[i].kode_satuan,
                                        'unit_price': req.details[i].unit_price,
                                        'price': (req.details[i].unit_price * req.details[i].jml_satuan),
                                        'asal_barang': 'I',
                                        'seri_barang': (i + 1),
                                        'kd_negara_asal': req.details[i].kode_negara_asal,
                                        'jml_inout': jml_inout
                                    }
                                }
                            }

                            if (err > 0) {
                                arrResult = {
                                    error: true,
                                    message: 'Terdapat kode barang / kode satuan / kode gudang yang tidak terdaftar di inventory, yaitu : ' + message
                                }
                            } else {
                                arrResult = {
                                    'jns_inout': 'IN',
                                    'no_inout': req.no_grn,
                                    'tgl_inout': req.tgl_grn,
                                    'source_dokumen': req.source_dokumen,
                                    'jns_dokumen': req.jns_dokumen,
                                    'nomor_aju': req.nomor_aju,
                                    'no_daftar': req.nomor_daftar,
                                    'tgl_daftar': req.tanggal_daftar,
                                    'kd_valuta': req.kode_valuta,
                                    'created_by': req.user_id,
                                    'kode_trader': req.kode_trader,
                                    'partner_id': res[0].id,
                                    'realisasi_flag': req.realisasi,
                                    'tgl_realisasi': req.tgl_realisasi,
                                    'details': values
                                }
                            }
                        } else {
                            arrResult = {
                                error: true,
                                message: 'partner_id: ' + req.kode_partner + ' tidak dikenali'
                            }
                        }
                        resolve(arrResult)
                    });
                })
            }
        }, (error) => {
            next(error);
        }).then((data) => {
            if (data.error === true) {
                arrData = {
                    error: true,
                    message: data.message
                }
                callback(arrData)
            } else {
                if (data.realisasi_flag.toUpperCase() === "Y") {
                    status_realisasi = "R"
                    status_detil = "04"
                }

                const val = [
                    [data.jns_inout, data.no_inout, data.tgl_inout, data.source_dokumen, data.tgl_realisasi, data.jns_dokumen, data.nomor_aju, data.no_daftar, data.tgl_daftar, data.kd_valuta, status_realisasi, data.created_by, data.partner_id, data.kode_trader]
                ]

                connection.query("INSERT INTO tpb_hdr (jns_inout, no_inout, tgl_inout, source_dokumen, tgl_realisasi, jns_dokumen, nomor_aju, no_daftar, tgl_daftar, kd_valuta, status, created_by, partner_id, kode_trader) VALUES ?", [val], (err, res) => {
                    if (err) next(err)

                    for (let i = 0; i < data.details.length; i++) {
                        valDtl[i] = [data.details[i].jml_satuan, data.details[i].kode_satuan, data.details[i].unit_price, data.details[i].price, data.details[i].asal_barang, data.details[i].seri_barang, data.details[i].kd_negara_asal, data.created_by, status_detil, data.details[i].id_brg, res.insertId, data.details[i].id_gudang]

                        if (data.realisasi_flag.toUpperCase() == "Y") {
                            inout[i] = ['GATE-IN', data.details[i].jml_inout, data.tgl_realisasi, data.created_by, res.insertId, data.details[i].id_brg, data.details[i].id_gudang, data.kode_trader]

                            log_in[i] = [data.details[i].jml_inout, data.details[i].unit_price, data.details[i].jml_inout, 'N']
                        }
                    }

                    connection.query("INSERT INTO tpb_dtl (jml_satuan, kd_satuan, unit_price, price, asal_barang, seri_barang, kd_negara_asal, created_by, status, id_barang, id_hdr, id_warehouse) VALUES ? ", [valDtl], (err, result) => {
                        if (err) next(err)

                        if (data.realisasi_flag.toUpperCase() == "Y") {
                            for (let i = 0; i < inout.length; i++) {
                                if (i == 0) {
                                    inout[i].push(result.insertId)
                                } else {
                                    inout[i].push(result.insertId + 1)
                                }
                            }

                            connection.query("INSERT INTO tr_inout (tipe, jml_satuan, tgl_realisasi, created_by, id_hdr, id_brg, id_gudang, kode_trader, id_dtl) VALUES ? ", [inout], (errors, resData) => {
                                if (errors) next(errors)

                                if (req.fasilitas_perusahaan == "2" || req.fasilitas_perusahaan == "5") {
                                    for (let x = 0; x < log_in.length; x++) {
                                        if (x == 0) {
                                            log_in[x].push(resData.insertId)
                                        } else {
                                            log_in[x].push(resData.insertId + 1)
                                        }
                                    }

                                    connection.query("INSERT INTO tr_logbook_in (jml_satuan, unit_price, saldo, flag_tutup, inout_id) VALUES ? ", [log_in], (err, res) => {
                                        if (err) next(err)
                                    })
                                }
                                callback(arrData = {
                                    error: false,
                                    message: "Data berhasil diproses."
                                })
                            })
                        } else {
                            callback(arrData = {
                                error: false,
                                message: "Data berhasil diproses."
                            })
                        }
                    })
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM tm_user WHERE email = ? ", email, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    })
}

function findBarangByIdTrader(kode_trader) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT a.id AS id_brg, a.kd_brg, a.jns_brg, a.nilai_konversi, a.kd_satuan, a.kd_satuan_terkecil, b.id as id_gudang_barang, b.id_gudang, b.saldo as saldo_gudang, c.kode AS kode_gudang FROM tm_barang a INNER JOIN tm_barang_gudang b ON a.id = b.id_barang INNER JOIN tm_warehouse c ON c.id = b.id_gudang WHERE a.kode_trader = ? ORDER BY a.id ASC", [kode_trader], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

function findWarehouseByTrader(kode_trader) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT kode, id, nama, uraian FROM tm_warehouse WHERE kode_trader = ?", [kode_trader], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

module.exports = Model