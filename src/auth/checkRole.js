//checkRole.js

//Middleware to restrict access based on roleId

function checkRole(roleId) {
    return (req, res, next) => {
        if (req.user.roleId !== roleId) {
            return res.status(403).send({ message: 'Access denied. Insufficient role.' });
        }
        next();
    };
}

module.exports = { checkRole };
