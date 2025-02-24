const Role = require("../../models/role.model")
const prefixAdmin = require("../../config/system")
//[GET] /admin/roles/index
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const roles = await Role.find(find);
    res.render("admin/pages/roles/index", {
        roles: roles
    });
}

//[GET] /admin/roles/create
module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create");
}

//[POST] /admin/roles/create
module.exports.createItem = async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.redirect(`${prefixAdmin.prefixAdmin}/roles`);
    } catch (error) {
        console.log(error);
    }
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            _id: id,
            deleted: false
        }
        const role = await Role.findOne(find);
    
        res.render("admin/pages/roles/edit", {
            role: role
        });
    } catch (error) {
        res.status(404).send("Not found");
    }
}

//[PATCH] /admin/roles/edit/:id
module.exports.editItem = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            _id: id,
            deleted: false
        }
        const update = req.body;
        await Role.findOneAndUpdate(find, update);
        res.redirect(`${prefixAdmin.prefixAdmin}/roles`);
    } catch (error) {
        res.status(404).send("Not found");
    }
}

//[GET] /admin/roles/detail
module.exports.detail = async (req, res) => {
    const find = {
        _id: req.params.id,
        deleted: false
    }

    const role = await Role.findOne(find);
    res.render("admin/pages/roles/detail", {
        role: role
    });
}