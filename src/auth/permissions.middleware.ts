export function checkPermissions (role) {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        } else {
            res.status(401).send('Permission denied.');
        }
    }
}



