const express = require('express');
const app = express();
// const authRouter = require(__dirname + '/routers/authRouter');
const bearsRouter = require(__dirname + '/routers/bearsRouter');
const lionsRouter = require(__dirname + '/routers/lionsRouter');
const tigersRouter = require(__dirname + '/routers/tigersRouter');
const ohMyRouter = require(__dirname + '/routers/ohMyRouter');
const mongoose = require('mongoose');

// app.use('/api', authRouter);
app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});
app.use('/api', bearsRouter);
app.use('/api', lionsRouter);
app.use('/api', tigersRouter);
app.use('/api', ohMyRouter);
app.use('/*', (req, res) => {
  res.status(404).json({ msg: '404 not found' });
});

module.exports = exports = function(port, mongooseConnect, callBack) {
  mongoose.connect(mongooseConnect);
  return app.listen(port, callBack);
};
