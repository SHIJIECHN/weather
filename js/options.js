/**
 * Created by Administrator on 2018/4/26.
 */
var city = localStorage.city;
city = city?city:'beijing';
document.getElementById('city').value = city;
document.getElementById('save').onclick = function(){
    localStorage.city = document.getElementById('city').value;
    alert('保存成功');
};