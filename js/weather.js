
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send('Key==认证Key'+city);
    //注册后就有认证Key，在控制台查看
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
}

function showWeather(result) {
    result = JSON.parse(result);
    var list = result.HeWeather6
    var loc = list[0].basic.location;
    
	// 获取当天的日期和时间
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    var week = today.getDay();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds(); 
    var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

    month = month<10 ? "0"+month:month;
    day = day<10 ? "0"+day:day;
    hours  = hours<10  ? "0"+hours : hours;
    minutes = minutes<10 ? "0"+minutes : minutes;
    seconds = seconds<10 ? "0"+seconds : seconds;
    var date = year +"年"+month+"月"+day+"日"+','+weekday[week];
    var time = hours +":"+minutes+":"+seconds;

	// 获取当天的天气情况
    var max = Math.round(list[0].daily_forecast[0].tmp_max)+' °C';
    var min = Math.round(list[0].daily_forecast[0].tmp_min)+' °C';
    var temperature = min +'~' + max;
    var description = list[0].daily_forecast[0].cond_txt_d;
    var wind_dir = '风向：'+list[0].daily_forecast[0].wind_dir;
    var wind_spd = '风速：'+list[0].daily_forecast[0].wind_spd+'m/s';
    var pcpn = '降水概率：'+list[0].daily_forecast[0].pcpn;
    var pop = '降水量：'+list[0].daily_forecast[0].pop;

    var message = '<p>'+wind_dir+ list[0].daily_forecast[0].wind_sc +'</p>'+'<br/>'+'<p>'+wind_spd +'</p>'+'<br/>'+'<p>'+pcpn +'</p>'+'<br/>'+'<p>'+pop +'</p>';
    
	// 显示后5天的天气
	var div = '';
    for (var i=1; i<6; i++){
        if( 0<i || i<6 ){
            div += '<div class=item >';
            div += '<p>'+list[0].daily_forecast[i].date+'</p>';
            div += '<p>'+list[0].daily_forecast[i].cond_txt_d+'</p>';
            div += '<p>'+list[0].daily_forecast[i].tmp_max+' °C</p>';
            div += '<p>'+list[0].daily_forecast[i].tmp_min+' °C</p>';
            div += '</div>';
            console.log(i);
        }
    }
    document.getElementById('message').innerHTML = div;
    document.getElementById('loc').innerHTML = loc;
    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;
    document.getElementById('temperature').innerHTML = temperature;
    document.getElementById('weather').innerHTML = description;
    document.getElementById('wind').innerHTML = message;
}
var city = localStorage.city;
city = city?city:'beijing';
var url = 'https://free-api.heweather.com/s6/weather/forecast?location='+city+'&key=认证Key';
httpRequest(url, showWeather);
