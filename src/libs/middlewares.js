const isAdmin = (req,res,next) => {
	if (req.user.role == 'admin') {
		return next();
	} else {
		return res.send({
			message : 'Yetkisiz Kullanım '
		});
	}
}

const isOwner = async (req, res, next) => {
	if (req.user.role == 'admin' || req.user._id == req.params.user) {
		return next();
	} else {
		return res.send({
			message : 'Kendi meali degil'
		});
	}
}

const isUserManager = async (req, res, next) => {
	if (req.user.role == 'admin' || req.user.role == 'user manager') {
		return next();
	} else {
		return res.send({
			message : 'User yetkisi dışında'
		});
	}

}

module.exports = {
	isAdmin,
	isOwner,
	isUserManager,
};