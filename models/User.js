const {Schema, model, Types} = require('mongoose')

//указуем поля для пользователя
const schema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    links: [{ type: Types.ObjectId, ref:'Link'}]
})


//Экспортируем из модуля функцию model, в которой даем название 'User' и схему schema, по которой будет работать модель
module.exports = model('User', schema)