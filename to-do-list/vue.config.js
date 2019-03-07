module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/to_do_list/'
        : '/'
}
