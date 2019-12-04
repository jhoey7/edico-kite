'use strict'
const model = require('../models/appModel')
const response = require('../../config/response.js')
const emailValidator = require('email-validator')
const validator = require('validatorjs')

exports.getAllUsers = (req, res, next) => {
	try {
		model.getAllUsers(req.user.company, (data) => {
			if (data.length > 0) {
				response.ok(data, "Terdapat " + data.length + " data users.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.createUser = (req, res, next) => {
	if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
		response.mandatoryField("Please provide name, email, password and role.", res)
	} else {
		if (emailValidator.validate(req.body.email) === false) {
			response.validate("Email Not Valid.", res);
		} else {
			try {
				req.body.kode_trader = req.user.company
				model.createUser(req.body, (data) => {
					if (data.length > 0) {
						response.ok(data, "Data User Created Successfully.", res)
					} else {
						response.conflict("Email Already Exist.", res)
					}
				}, (error) => {
					next(error)
				})
			} catch (error) {
				next(error)
			}
		}
	}
}

exports.getUsersById = (req, res, next) => {
	try {
		var key = { user_id: req.params.userId, id_trader: req.user.company }
		model.getUsersById(key, (data) => {
			if (data.length > 0) {
				response.ok(data[0], "Terdapat " + data.length + " data users.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}

}

exports.updateUser = (req, res, next) => {
	try {
		if (!req.body.name || !req.body.role) {
			response.mandatoryField("Please provide name and role.", res)
		} else {
			var key = { user_id: req.params.userId, id_trader: req.user.company }
			model.updateUserById(key, req.body, (user) => {
				if (user.length > 0) {
					response.ok(user, "Data User Updated Successfully.", res)
				} else {
					response.badRequest(res)
				}
			}, (error) => {
				next(error)
			})
		}
	} catch (error) {
		next(error)
	}
}

exports.deleteUser = (req, res, next) => {
	try {
		var key = { user_id: req.params.userId, id_trader: req.user.company }
		model.deleteUserbyId(key, (user) => {
			response.ok({}, "Data User Deleted Successfully.", res)
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.getAllSuppliers = (req, res, next) => {
	try {
		model.getAllSuppliers(req.user.company, (data) => {
			if (data.length > 0) {
				response.ok(data, "Data Supplier Found.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.getSupplierById = (req, res, next) => {
	try {
		var key = { id: req.params.id, id_trader: req.user.company }
		model.getSupplierById(key, (data) => {
			if (data.length > 0) {
				response.ok(data[0], "Data Supplier Found.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}

}

exports.createSupplier = (req, res, next) => {
	if (!req.body.name || !req.body.address || !req.body.flag_code || !req.body.npwp) {
		response.mandatoryField("Please provide name, address, npwp and flag_code.", res)
	} else {
		try {
			req.body.kode_trader = req.user.company
			model.createSupplier(req.body, (data) => {
				if (data.length > 0) {
					response.ok(data[0], "Data Supplier Created Successfully.", res)
				} else {
					response.conflict("NPWP Already Exist.", res)
				}
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}

exports.updateSupplier = (req, res, next) => {
	try {
		if (!req.body.name || !req.body.address || !req.body.flag_code || !req.body.npwp) {
			response.mandatoryField("Please provide name, address, npwp and flag_code.", res)
		} else {
			var key = { id: req.params.id, id_trader: req.user.company }
			model.updateSupplierById(key, req.body, (supplier) => {
				if (supplier.length > 0) {
					response.ok(supplier[0], "Data Supplier Updated Successfully.", res)
				} else {
					response.badRequest(res)
				}
			}, (error) => {
				next(error)
			})
		}
	} catch (error) {
		next(error)
	}
}

exports.deleteSupplier = (req, res, next) => {
	try {
		var key = { id: req.params.id, id_trader: req.user.company }
		model.deleteSupplierById(key, (supplier) => {
			if (supplier.length > 0) {
				response.ok({}, "Data Supplier Deleted Successfully.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.getAllWarehouse = (req, res, next) => {
	try {
		model.getAllWarehouse(req.user.company, (data) => {
			if (data.length > 0) {
				response.ok(data, "Data Warehouse Found.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.getWarehouseById = (req, res, next) => {
	try {
		var key = { id: req.params.id, id_trader: req.user.company }
		model.getWarehouseById(key, (data) => {
			if (data.length > 0) {
				response.ok(data[0], "Data Warehouse Found.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}

}

exports.createWarehouse = (req, res, next) => {
	if (!req.body.name || !req.body.code) {
		response.mandatoryField("Please provide code & name.", res)
	} else {
		try {
			req.body.kode_trader = req.user.company
			req.body.user_id = req.user.username
			model.createWarehouse(req.body, (data) => {
				if (data.length > 0) {
					response.ok(data[0], "Data Warehouse Created Successfully.", res)
				} else {
					response.conflict("Warheouse Already Exist.", res)
				}
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}

exports.updateWarehouse = (req, res, next) => {
	try {
		if (!req.body.name) {
			response.mandatoryField("Please provide name.", res)
		} else {
			var key = { id: req.params.id, id_trader: req.user.company }
			model.updateWarehouseById(key, req.body, (warehouse) => {
				if (warehouse.length > 0) {
					response.ok(warehouse[0], "Data Warehouse Updated Successfully.", res)
				} else {
					response.badRequest(res)
				}
			}, (error) => {
				next(error)
			})
		}
	} catch (error) {
		next(error)
	}
}

exports.deleteWarehouse = (req, res, next) => {
	try {
		var key = { id: req.params.id, id_trader: req.user.company }
		model.deleteWarehouseById(key, (warehouse) => {
			if (warehouse.length > 0) {
				response.ok({}, "Data Warehouse Deleted Successfully.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.getAllItem = (req, res, next) => {
	try {
		model.getAllItem(req.user.company, (data) => {
			if (data.length > 0) {
				response.ok(data, "Items Found.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.getItemById = (req, res, next) => {
	try {
		var key = { id: req.params.id, id_trader: req.user.company }
		model.getItemById(key, (data) => {
			if (data.length > 0) {
				response.ok(data[0], "Items Found.", res)
			} else {
				response.badRequest(res)
			}
		}, (error) => {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}

exports.createItem = (req, res, next) => {
	let rulesData = {
		'kode_hs': 'string',
		'kode_barang': 'required',
		'jns_barang': { 'in': ['1', '2', '3', '4', '5'] },
		'uraian_barang': 'required',
		'kode_satuan': 'required',
		'kode_satuan_terkecil': 'string',
		'konversi_satuan': 'required',
		'details.*.kode_gudang': 'required'
	}

	let validation = new validator(req.body, rulesData);
	if (validation.passes() == false) {
		response.mandatoryField('Terdapat filed mandatory yang kosong. Silahkan check kembali data Anda.', res)
	} else {
		req.body.kode_trader = req.user.company
		req.body.user_id = req.user.username

		try {
			model.createItem(req.body, (data) => {
				if (data.error == true) {
					response.conflict(data.message, res)
				} else {
					response.ok({}, data.message, res)
				}
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}

exports.createGrnAllElement = (req, res, next) => {
	req.body.show_aju = req.user.show_aju
	let rulesData = {
		'show_aju': 'required',
		'no_grn': 'required',
		'tgl_grn': 'required',
		'source_dokumen': 'required',
		'kode_partner': 'required',
		'kode_valuta': 'required',
		'jns_dokumen': ['required', { 'in': ['20', '25', 'LOKAL', 'SUBKONTRAK'] }],
		'nomor_aju': [{ required_if: ['show_aju', 'Y'] }],
		'nomor_daftar': 'required',
		'tanggal_daftar': 'required',
		'realisasi': ['required', { 'in': ['Y', 'N'] }],
		'details.*.kode_barang': 'required',
		'details.*.kode_satuan': 'required',
		'details.*.jml_satuan': 'required',
		'details.*.unit_price': 'required',
		'details.*.kode_negara_asal': 'required',
		'details.*.kode_gudang': 'required',
		'details.*.barang_impor': 'required'
	}

	let validation = new validator(req.body, rulesData);
	if (validation.passes() == false) {
		response.mandatoryField('Terdapat filed mandatory yang kosong. Silahkan check kembali data Anda.', res)
	} else {
		req.body.kode_trader = req.user.company
		req.body.user_id = req.user.username
		req.body.fasilitas_perusahaan = req.user.fasilitas_perusahaan

		try {
			model.createGrnAllElement(req.body, (data) => {
				if (data.error == true) {
					response.conflict(data.message, res)
				} else {
					response.ok({}, data.message, res)
				}
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}

exports.createGrn = (req, res, next) => {
	req.body.tipe_dokumen = req.user.tipe_dokumen
	req.body.show_aju = req.user.show_aju
	let rulesData = {
		'tipe_dokumen': 'required',
		'show_aju': 'required',
		'no_grn': [{ required_if: ['tipe_dokumen', '1'] }],
		'tgl_grn': [{ required_if: ['tipe_dokumen', '1'] }],
		'source_dokumen': 'required',
		'kode_partner': 'required',
		'kode_valuta': 'required',
		'jns_dokumen': [{ required_if: ['tipe_dokumen', '0'] }, { 'in': ['20', '25', 'LOKAL', 'SUBKONTRAK'] }],
		'nomor_aju': [{ required_if: ['tipe_dokumen', '0'] }],
		'nomor_aju': [{ required_if: ['show_aju', 'Y'] }],
		'nomor_daftar': [{ required_if: ['tipe_dokumen', '0'] }],
		'tanggal_daftar': [{ required_if: ['tipe_dokumen', '0'] }],
		'realisasi': ['required', { 'in': ['Y', 'N'] }],
		'details.*.kode_barang': 'required',
		'details.*.kode_satuan': 'required',
		'details.*.jml_satuan': 'required',
		'details.*.unit_price': 'required',
		'details.*.kode_negara_asal': 'required',
		'details.*.kode_gudang': 'required',
		'details.*.barang_impor': 'required'
	}

	let validation = new validator(req.body, rulesData);
	if (validation.passes() == false) {
		response.mandatoryField('Terdapat filed mandatory yang kosong. Silahkan check kembali data Anda.', res)
	} else {
		req.body.kode_trader = req.user.company
		req.body.user_id = req.user.username
		req.body.show_aju = req.user.show_aju

		try {
			model.createGrnAllElement(req.body, (data) => {
				if (data.error == true) {
					response.conflict(data.message, res)
				} else {
					response.ok({}, data.message, res)
				}
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}

exports.realisasiGrn = (req, res, next) => {
	req.body.tipe_dokumen = req.user.tipe_dokumen
	req.body.show_aju = req.user.show_aju

	let rulesData = {
		'tipe_dokumen': 'required',
		'show_aju': 'required',
		'source_dokumen': 'required',
		'no_grn': [{ required_if: ['tipe_dokumen', '1'] }],
		'tgl_grn': [{ required_if: ['tipe_dokumen', '1'] }],
		'jns_dokumen': [{ required_if: ['tipe_dokumen', '0'] }, { 'in': ['20', '25', 'LOKAL', 'SUBKONTRAK'] }],
		'nomor_aju': [{ required_if: ['tipe_dokumen', '0'] }],
		'nomor_aju': [{ required_if: ['show_aju', 'Y'] }],
		'nomor_daftar': [{ required_if: ['tipe_dokumen', '0'] }],
		'tanggal_daftar': [{ required_if: ['tipe_dokumen', '0'] }],
		'tgl_realisasi': 'required'
	}

	let validation = new validator(req.body, rulesData);
	if (validation.passes() == false) {
		response.mandatoryField('Terdapat filed mandatory yang kosong. Silahkan check kembali data Anda.', res)
	} else {
		req.body.kode_trader = req.user.company
		req.body.user_id = req.user.username
		req.body.fasilitas_perusahaan = req.user.fasilitas_perusahaan

		try {
			model.realisasiGrn(req.body, (data) => {
				if (data.error == true) {
					response.conflict(data.message, res)
				} else {
					response.ok({}, data.message, res)
				}
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}

exports.createGdnAllElement = (req, res, next) => {
	req.body.show_aju = req.user.show_aju
	let rulesData = {
		'show_aju': 'required',
		'no_grn': 'required',
		'tgl_grn': 'required',
		'source_dokumen': 'required',
		'kode_partner': 'required',
		'kode_valuta': 'required',
		'jns_dokumen': ['required', { 'in': ['20', '25', 'LOKAL', 'SUBKONTRAK'] }],
		'nomor_aju': [{ required_if: ['show_aju', 'Y'] }],
		'nomor_daftar': 'required',
		'tanggal_daftar': 'required',
		'realisasi': ['required', { 'in': ['Y', 'N'] }],
		'details.*.kode_barang': 'required',
		'details.*.kode_satuan': 'required',
		'details.*.jml_satuan': 'required',
		'details.*.unit_price': 'required',
		'details.*.kode_negara_asal': 'required',
		'details.*.kode_gudang': 'required',
		'details.*.barang_impor': 'required'
	}

	let validation = new validator(req.body, rulesData);
	if (validation.passes() == false) {
		response.mandatoryField('Terdapat filed mandatory yang kosong. Silahkan check kembali data Anda.', res)
	} else {
		req.body.kode_trader = req.user.company
		req.body.user_id = req.user.username
		req.body.fasilitas_perusahaan = req.user.fasilitas_perusahaan

		try {
			model.createGrdAllElement(req.body, (data) => {
				if (data.error == true) {
					response.conflict(data.message, res)
				} else {
					response.ok({}, data.message, res)
				}
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}

exports.createProduksi = (req, res, next) => {
	let rulesData = {
		'tipe_produksi': ['required', { 'in': ['rm', 'half', 'fg', 'scrap'] }],
		'no_inout_warehouse': 'required',
		'tgl_inout_warehouse': 'required',
		'keterangan': 'string',
		'realisasi': ['required', { 'in': ['Y', 'N'] }],
		'details.*.nomor_konversi': [{ required_if: ['tipe_produksi', 'fg'] }],
		'details.*.kode_barang': 'required',
		'details.*.kode_satuan': 'required',
		'details.*.jml_satuan': 'required',
		'details.*.kode_gudang': 'required',
		'details.*.keterangan': 'string'
	}

	let validation = new validator(req.body, rulesData);
	if (validation.passes() == false) {
		response.mandatoryField('Terdapat filed mandatory yang kosong. Silahkan check kembali data Anda.', res)
	} else {
		req.body.kode_trader = req.user.company
		req.body.user_id = req.user.username
		req.body.show_aju = req.user.show_aju

		try {
			model.createProduksi(req.body, (data) => {
				response.ok(data, '', res)
			}, (error) => {
				next(error)
			})
		} catch (error) {
			next(error)
		}
	}
}