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