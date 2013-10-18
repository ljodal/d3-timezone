# d3-timezone
Extension to d3 to add support for timezones

## Requirements
* d3.js
* timezoneJS

## How it works
This extension reads the timezones available in timezoneJS.timezone.zones and adds properties to the respective d3.time objects.

## Status
_Working_:
* d3.time.days[timezone]
* d3.time.months[timezone]

_Probably broken by DST_:
* d3.time.minutes[timezone]
* d3.time.hours[timezone]

_Not working_:
* Weekdays (eg. d3.time.mondays[timezone])

_Unknown_:
* d3.time.seconds[timezone]
* d3.time.years[timezone]

## License
Copyright (C) 2013 Sigurd Ljødal, Markedskraft ASA

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
