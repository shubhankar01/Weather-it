var openWeatherApiKey = '3f6b34a3094815e31014f99a779eb25d',
		                       
		openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast'
		openWeatherUrlCurrent='http://api.openweathermap.org/data/2.5/weather'
		  
		$(document).ready(function(){
			$('.btn-metric').click(function() {
				prepareDataForecast('metric')
			})
			$('.btn-metric-current').click(function() {
				prepareDatacurrent('metric')
			
			})
		})
		
		var prepareDataForecast = function(units) {
			var cityName = $('#city-name').val()
			if (cityName!= ''){
				cityName = cityName.trim()
				getData(openWeatherUrl, cityName, openWeatherApiKey, units)
			}
			else {
				alert('Please enter the city name')
			}
		}
		
		function getData (url, cityName, appId, units) {
			var request = $.ajax({
				url: url,
				dataType: "jsonp",
				data: {q: cityName, appid: appId, units: units},
				jsonpCallback: "fetchData",
				type: "GET"
			}).fail(function(error){
				console.error(error)
				alert('Error sending request')
			})
		}
		function fetchData (forecast) {
			console.log(forecast)
			var html = '',
			  cityName = forecast.city.name,
				country = forecast.city.country
			html += '<h3> Weather Forecast for ' + cityName + ', ' + country + '</h3>'
			
			var i=0
			var xlist = []
			var ylist = []
			forecast.list.forEach(function(forecastEntry, index, list){
			    xlist.push(forecastEntry.dt_txt)
				ylist.push(forecastEntry.main.temp)
				i=i+1
			})
			var data = [{
			  x: xlist,
			  y: ylist,
			  type: 'bar'
			}];
            
            Plotly.newPlot('graph', data);
			$('#log').show()
			$('#graph').show()
			$('#log').html(html)
			Plotly.newPlot('graph', data);
			$("#currentlog").hide()
			
			
		}
		
		var prepareDatacurrent=function(units){
		    var cityName = $('#city-name').val()
			if (cityName!= ''){
				cityName = cityName.trim()
				getDatacurrent(openWeatherUrlCurrent, cityName, openWeatherApiKey, units)
			}
			else {
				alert('Please enter the city name')
			}
		
		}
		function getDatacurrent(url, cityName, appId,units)
		{ 
		   var request = $.ajax({
				url: url,
				dataType: "jsonp",
				data: {q: cityName, appid: appId, units: units},
				jsonpCallback: "fetchDataCurrent",
				type: "GET"
			}).fail(function(error){
				console.error(error)
				alert('Error sending request')
			})
		
		}
		
		function fetchDataCurrent (current) {
			console.log(current)
			var html = '',
			cityName = current.name,
			country = current.sys.country,
			temperature=current.main.temp,
			description=current.weather[0].description,
			humidity=current.main.humidity
			
			html += '<h3> Current Weather  for ' + cityName + ', ' + country + '</h3>';
			html +='<p>Temperature :'+ temperature+'&#8451;  </p>';
			html +='<p>Humidity :'+ humidity +'%  </p>'; 
			html +='<p>Description:'+ description+'  </p>';
			$('#currentlog').show()
			$('#currentlog').html(html)
			$("#log").hide()
			$("#graph").hide()
		}	
  
