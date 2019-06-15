var dao = require('./server/dao');


db = dao.model('data');
console.log(db.getAll());
console.log(db.updateOne("31289999", "other", "555"));
console.log(db.getAll());
let c = {
    "test":"jj"
}
var uid = db.create( c)
console.log(db.getAll())
console.log(db.updateOne(uid, "test2", "oo"));
