function displayNum(){
var dataLocal = JSON.parse(localStorage.getItem('agregar_a_favorito'));
let num = 0;
for(var item in dataLocal){
num++
}
$('.numshow').html(num);
}
displayNum();

var limitagregar_a_favorito = 100;
var agregar_a_favorito = (function(){
list = [];

//Structure Push to Object New Item
function Item(id,name,status,type,link,img){
this.id = id;
this.name = name;
this.status = status;
this.type = type;
this.link = link;
this.img = img;
}

//Event Saving to Local Storage
function setagregar_a_favorito(){
localStorage.setItem('agregar_a_favorito', JSON.stringify(list));
}

function loadagregar_a_favorito() {
list = JSON.parse(localStorage.getItem('agregar_a_favorito'));
}

if (localStorage.getItem("agregar_a_favorito") != null) {
loadagregar_a_favorito();
}

obj = {};
//Add New Item Object to Array
obj.addItemToagregar_a_favorito = function(id,name,status,type,link,img) {
var item = new Item(id,name,status,type,link,img),
itemList = list;
if(itemList != null){
same = itemList.find(item =>{return item.id == id;});
if(list.length<limitagregar_a_favorito){
if(!same){
list.push(item);
setagregar_a_favorito();
}
}
}else{
list.push(item);
setagregar_a_favorito();
}
}

//Remove Bookmark    
obj.removeThisItem = function(id) {
for(var item in list) {
if(list[item].id === id) {
list.splice(item, 1);
break;
}
}
setagregar_a_favorito();
}

return obj;
})();

$('.agregar_a_favorito').each(function(event) {
const getData = JSON.parse(localStorage.getItem('agregar_a_favorito'));
for(var i in getData){
if(getData[i].id == $(this).data('id')){
$(this).html('agregado_a_favorito')
$(this).addClass('agregado_a_favorito')
}
}
$(this).click(function(){
const list = JSON.parse(localStorage.getItem('agregar_a_favorito'));
//Retrieve Data From Post
const id = $(this).data('id'),
name = $('.info .title').text().replace('\n',''),
link = location.protocol + '//' + location.hostname +  location.pathname,
img = $('#info .thumb div img').attr('src'),
status = $('.meta .status span').text().replace('\n',''),
type = $('.meta .type span a').text().replace('\n','');

//Set To Function Bookmark
if(list == null){
if(!$(this).hasClass('agregado_a_favorito')){
agregar_a_favorito.addItemToagregar_a_favorito(id,name,status,type,link,img);
$(this).addClass('agregado_a_favorito')
$(this).html('agregado_a_favorito')
}else{
agregar_a_favorito.removeThisItem(id);
$(this).html('agregar_a_favorito')
$(this).removeClass('agregado_a_favorito')
}
}else{
if(!$(this).hasClass('agregado_a_favorito')){
if(list.length<limitagregar_a_favorito){
agregar_a_favorito.addItemToagregar_a_favorito(id,name,status,type,link,img);
$(this).addClass('agregado_a_favorito')
$(this).html('agregado_a_favorito')
}
}else{
agregar_a_favorito.removeThisItem(id);
$(this).html('agregar_a_favorito ')
$(this).removeClass('agregado_a_favorito')
}
}
displayNum();
})
});