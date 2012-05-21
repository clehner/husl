// Adapter from less.js
function hsl_to_rgb(h, s, l) {
    h = (h % 360) / 360;
    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var m1 = l * 2 - m2;
    return [
    	hue(h + 1/3),
        hue(h),
        hue(h - 1/3),
    ];
    function hue(h) {
        h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
        if      (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
        else if (h * 2 < 1) return m2;
        else if (h * 3 < 2) return m1 + (m2 - m1) * (2/3 - h) * 6;
        else                return m1;
    }
}
function hslToHex(h, s, l) {
	var rgb = hsl_to_rgb(h, s / 100, l / 100);
	return $.colorspaces.converter('sRGB', 'hex')(rgb);
}
$(function() {
	$('.tagline span').each(function(index){
		$(this).css('color', $.husl.husl(index / 17 * 360, 90, 50));
	})
	var L = 50;
	function set($canvas, func) {
		var width = $canvas.width();
		var height = $canvas.height();
		var c = $canvas.get(0).getContext("2d");
		var imageData = c.createImageData(width, height);
		for (var x = 0; x < width; x ++) {
			for (var y = 0; y < height; y ++) {
				var rgb = func(x / width * 360, y / height * 100);
				var r = rgb[0] * 256;
				var g = rgb[1] * 256;
				var b = rgb[2] * 256;
				index = (x + y * imageData.width) * 4;
				imageData.data[index+0] = r;
				imageData.data[index+1] = g;
				imageData.data[index+2] = b;
				imageData.data[index+3] = 256;
			}
		}
		c.putImageData(imageData, 0, 0);
	}
	function randomHue() {
	  return Math.floor(Math.random() * 360);
	}
	$('#demo1').click(function() {
		$(this).closest('div').find('.demo').each(function() {
			$(this).css('background-color', $.husl.husl(randomHue(), 90, 60));
		});
	});
	$('#demo2').click(function() {
		$(this).closest('div').find('.demo').each(function() {
			$(this).css('background-color', hslToHex(randomHue(), 90, 60));
		});
	});
	$('#demo1').click();
	$('#demo2').click();
	for (var i=0; i<10; i++) {
		$('#rainbow-husl').append($('<div></div>'));
	}
	for (var i=0; i<10; i++) {
		$('#rainbow-hsl').append($('<div></div>'));
	}
	$('#rainbow-husl div').each(function(index) {
		$(this).css('background-color', $.husl.husl(index * 36, 90, 60));
	});
	$('#rainbow-hsl div').each(function(index) {
		$(this).css('background-color', hslToHex(index * 36, 90, 60));
	});
});

