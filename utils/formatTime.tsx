const pad = (n, z) => {
    z = z || 2;
    return ('00' + n).slice(-z);
}

export  const  msToTime = (s) => {
	if(isNaN(s)){
		return s
	}
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;

	return pad(hrs.toString().replace("-"," ").trim(),2 ) + ':' + pad(mins.toString().replace("-"," ").trim(),2) + ':' + pad(secs.toString().replace("-"," ").trim(),2) ;
}

export  const  timeToMs = (t) => {
	var s1 = t.slice(0,-2);
	var a = s1.split(':');
	var seconds =  ((+a[0]) * 60 * 60 )+ (+a[1]) * 60 + (+a[2]) ;
	return seconds*1000 ;
}

export  const  hmsToMs = (t) => {
	var a = t.split(':');
	var seconds =  ((+a[0]) * 60 * 60 )+ (+a[1]) * 60 + (+a[2]) ;
	return seconds*1000 ;
}

export const msToPace = (duration) => {
			
			if(!duration){
			  return null;
			}
			
			var milliseconds = (duration%1000)/100
			, seconds = Math.round((duration/1000)%60)
			, minutes = (duration/(1000*60))

			minutes = (minutes < 10) ?  parseInt("0" + minutes) : minutes;
			seconds = (seconds < 10) ? parseInt("0" + seconds) : seconds;

			return minutes + ":" + seconds;
		}
		
const distanceToDisplay = (distance,metric) =>{
			if(distance == 0){
					return distance;
			}
			
			if(metric == 1){		
				if(distance < 1000){
					return distance + "m"			
				}else{
					return distance/1000 + "km"	
				}	
			}else{
				return getMiles(distance).toFixed(2) + "mi";
			}
		}

const getMiles = (i) => {
			return i*0.000621371192
}
		
export function calculatePace(dist, s, type ,name) {
	if(type === 1){
		dist= getMiles(dist)
	}

	var format :string ;
	var pace :any ;

	if(name.match(/bike/gi)){
		format = 'km/hr'
		pace = dist/ (s/3600) 
    	pace = Math.floor( pace * 10 ) / 10
    	if(pace =='Infinity' || pace == 'NaN'){
			return '---'
		}
	} else if(name.match(/swim/gi) || type == 6){
		format = '/100m'
	    var sec_meters = (s/1000)/(dist)
	    var pace_seconds :any  = sec_meters * 100 
	   	if(pace_seconds =='Infinity' || pace_seconds == 'NaN'){
			return '---'
		}
		pace = msToPace(pace_seconds*1000)
	}
	else {
		format = '/km'
		var calculatedPace = Math.floor(s/dist);
	    var paceMins = Math.floor(calculatedPace/60);
	    var paceSecs = calculatedPace - (paceMins*60);
	    if(paceMins =='Infinity' || paceSecs == 'NaN'){
			return '---'
		}
		pace = paceMins + ":" + paceSecs;
	}
	

    return `${pace} ${format}`;
}


const time2float = (time) => {
		  const minutes = time.split(':')[0];
		  const seconds = time.split(':')[1];
		  const integer = Number.parseInt(minutes, 10);
		  const decimal = seconds / 60;
		  return integer + decimal;
		};