'use strict';
module.exports = function(app) {
  var ncrypter = require('../controllers/ncrypterController');

  // todoList Routes
  app.route('/info')
    .get(ncrypter.list_all_pieces)
    .post(ncrypter.create_a_piece);


  app.route('/info/:infoId')
    .get(ncrypter.read_a_piece)
    .put(ncrypter.update_a_piece)
    .delete(ncrypter.delete_a_piece)
    .post(ncrypter.update_a_piece);
};