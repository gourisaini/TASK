const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken")

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure homepage" });
});

exports.currentUserInfo = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.id).select("-password");
    res.status(200).json({ user });
})

exports.usersignup = catchAsyncErrors(async (req, res, next) => {
    const user = await new User(req.body).save();
    sendtoken(user, 200, res);
});

exports.usersignin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select("+password").exec();
    if (!user)
        return next(
            new ErrorHandler("User Not Found", 404)
        );
    const isMatch = user.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credientials", 500));
    sendtoken(user, 200, res);

});

exports.usersignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('token');
    res.json({ message: 'Sucessfully SignOut!' });
});

exports.userupdate = catchAsyncErrors(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, req.body).exec();
    
    res.status(200).json({
        success: true,
        message: "User Updated sucessfully",
    })
});

exports.userList = catchAsyncErrors(async (req, res, next) => {
    const List = await User.find({}).sort({createdAt: -1});
    res.status(200).json(List);
})

exports.userDelete = catchAsyncErrors(async(req, res , next )=>{;
    await User.findByIdAndDelete(req.params.id);
})