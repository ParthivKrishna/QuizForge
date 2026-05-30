function requireBuilder(
  req,
  res,
  next
) {

  if (
    req.user.role !== 'builder'
  ) {

    return res.status(403).json({
      success: false,
      message:
        'Builders only'
    })

  }

  next()

}

module.exports = {
  requireBuilder
}