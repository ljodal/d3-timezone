(function d3_timezone() {
    function d3_timezone_interval(local, step, number, zone) {

        function round(date) {
            var d0 = local(date), d1 = offset(d0, 1);
            return date - d0 < d1 - date ? d0 : d1;
        }

        function ceil(date) {
            step(date = local(new timezoneJS.Date(date-1, zone)), 1);
            return date;
        }

        function offset(date, k) {
            step(date = new timezoneJS.Date(+date, zone), k);
            return date;
        }

        function range(t0, t1, dt) {
            var time = ceil(t0), times = [];
            if (dt > 0) {
                while (time < t1) {
                    if (!(number(time) % dt)) times.push(new timezoneJS.Date(+time, zone));
                    step(time, 1);
                }
            } else {
                while (time < t1) times.push(new timezoneJS.date(+time, zone)), step(time, 1);
            }
            return times;
        }

        local.floor = local;
        local.round = round;
        local.ceil = ceil;
        local.offset = offset;
        local.range = range;

        return local;
    }

    function d3_timezone_day(zone) {
        d3.time.day[zone] = d3_timezone_interval(function(date) {
            var day = new timezoneJS.Date(2000, 0, zone);
            day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            return day;
        }, function(date, offset) {
            date.setDate(date.getDate() + offset);
        }, function(date) {
            return date.getDate() - 1;
        }, zone);

        d3.time.days[zone] = d3.time.day[zone].range;
    }

    function d3_timezone_hour(zone) {
        d3.time.hour[zone] = d3_timezone_interval(function(date) {
            var timezone = date.getTimezoneOffset() / 60;
            return new timezoneJS.Date((Math.floor(date / 36e5 - timezone) + timezone) * 36e5, zone);
        }, function(date, offset) {
            date.setTime(date.getTime() + Math.floor(offset) * 36e5); // DST breaks setHours
        }, function(date) {
            return date.getHours();
        }, zone);

        d3.time.hours[zone] = d3.time.hour[zone].range;
    }

    function d3_timezone_minute(zone) {
        d3.time.minute[zone] = d3_timezone_interval(function(date) {
            return new timezoneJS.Date(Math.floor(date / 6e4) * 6e4, zone);
        }, function(date, offset) {
            date.setTime(date.getTime() + Math.floor(offset) * 6e4); // DST breaks setMinutes
        }, function(date) {
            return date.getMinutes();
        }, zone);

        d3.time.minutes[zone] = d3.time.minute[zone].range;
    }

    function d3_timezone_month(zone) {
        d3.time.month[zone] = d3_timezone_interval(function(date) {
            date = d3.time.day[zone](date);
            date.setDate(1);
        }, function(date, offset) {
            date.setMonth(date.getMonth() + offset);
        }, function(date) {
            return date.getMonth();
        }, zone);

        d3.time.months[zone] = d3.time.month[zone].range;
    }

    function d3_timezone_second(zone) {
        d3.time.second[zone] = d3_timezone_interval(function(date) {
            return new timezoneJS.Date(Math.floor(date / 1e3) * 1e3, zone);
        }, function(date, offset) {
            date.setTime(date.getTime() + Math.floor(offset) * 1e3); // DST breaks setSeconds
        }, function(date) {
            return date.getSeconds();
        }, zone);

        d3.time.seconds[zone] = d3.time.second[zone].range;
    }

    function d3_timezone_year(zone) {
        d3.time.year[zone] = d3_timezone_interval(function(date) {
            date = d3.time.day[zone](date);
            date.setMonth(0, 1);
            return date;
        }, function(date, offset) {
            date.setFullYear(date.getFullYear() + offset);
        }, function(date) {
            return date.getFullYear();
        }, zone);

        d3.time.seconds[zone] = d3.time.second[zone].range;
    }

    function d3_timezone_week(tz) {
        var daySymbols = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        daySymbols.forEach(function(day, i) {
            day = day.toLowerCase();
            i = 7-i;

            var interval = d3.time[day][tz] = d3_timezone_interval(function(date) {
                (date = d3.time.day[tz](date)).setDate(date.getDate() - (date.getDay() + i) % 7);
                return date;
            }, function(date, offset) {
                date.setDate(date.getDate() + Math.floor(offset) * 7);
            }, function(date) {
                var day = d3.time.year[tz](date).getDay();
                return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
            });

            d3.time[day + "s"][tz] = interval.range;
        });
    }

    var timezones = timezoneJS.timezone.zones;

    for (var tz in timezones) {
        /**
        * Insert functions into d3.time
        */
        d3_timezone_second(tz);
        d3_timezone_minute(tz);
        d3_timezone_hour(tz);
        d3_timezone_day(tz);
        d3_timezone_month(tz);
        d3_timezone_year(tz);
        d3_timezone_week(tz);
    }
})();
