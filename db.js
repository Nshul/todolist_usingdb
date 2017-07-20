/**
 * Created by anshulmittal on 12/7/17.
 */
const Sequelize= require('sequelize');
var curr_pos;

const db= new Sequelize({
    host: 'localhost',
    username: 'testuser',
    password: 'password',
    database: 'elixir',
    dialect: 'mysql'
});



db.authenticate().then(()=>{
    console.log("Connection established Successfully");
})
    .catch(()=>{
    console.error("Unable to connect to database:",err)
    });

const Todoslist = db.define('Todoslist',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    task: Sequelize.DataTypes.STRING,
    done: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    },
    position: {
        type: Sequelize.DataTypes.INTEGER,
    }
});

db.sync().then(()=>{
    console.log("Database is Ready");
});

function addTodos(task) {
    return Todoslist.create({
        task: task
    })
}

function getTodos() {
    return Todoslist.findAll({
        order: db.col('position')
    });
}

function moveupTodo(dataid){
    Todoslist.update({
        position: 0
    },{
        where:{
            position: dataid-1
        }
    })
    Todoslist.update({
        position: dataid-1
    },{
        where:{
            position: dataid
        }
    })
    Todoslist.update({
        position: dataid
    },{
        where:{
            position: 0
        }
    })
}

function movedownTodo(dataid){
    Todoslist.update({
        position: 0
    },{
        where:{
            position: Number(dataid)+1
        }
    })
    Todoslist.update({
        position: Number(dataid)+1
    },{
        where:{
            position: dataid
        }
    })
    Todoslist.update({
        position: dataid
    },{
        where:{
            position: 0
        }
    })
}

function delTodos(dataid){
    Todoslist.destroy({
      where:{
          position: dataid
      }
    });
    Todoslist.update({
        position: Sequelize.literal('position-1')
    },{
        where:{
            position: {
                $gt: dataid
            }
        }
    })
}
function settodo(dataid){
    Todoslist.update({
        done: Sequelize.literal('not done')
    },{
        where:{
            position: dataid
        }
    })
}

function getpositions() {
    db.query("update Todoslists set position=id where position is NULL");
}

function removealldone() {
    Todoslist.destroy({
        where:{
            done: true
        }
    });
}

module.exports={
    addTodos,getTodos,getpositions,delTodos,moveupTodo,movedownTodo,settodo,removealldone
};
