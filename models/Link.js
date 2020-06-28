const {Schema, model, Types} = require('mongoose')

//указуем поля для ccылки
const schema = new Schema({
    from: { type: String, required:true },
    to: {type: String, required:true, unique:true},
    code:{type: String, required:true, unique:true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default:0},
    owner: {type: Types.ObjectId, ref:'User'}
})


//Экспортируем из модуля функцию model, в которой даем название 'Link' и схему schema, по которой будет работать модель
module.exports = model('Link', schema)