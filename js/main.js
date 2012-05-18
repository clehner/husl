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
	function cielchuv(x, y) {
		var color = $.colorspaces.make_color('CIELCHuv', [L, 200 - y * 2, x]);
		if (!color.is_displayable()) rgb = [0, 0, 0];
		else rgb = color.as('sRGB');
		return rgb;
	}
	function husl(x, y) {
		return $.husl.husl(x, 100 - y, L, true)
	}
	function hsl(x, y) {
		return hsl_to_rgb(x, (100 - y) / 100, L / 100)
	}
	function hsl_lightness(x, y) {
		var rgb = hsl_to_rgb(x, (100 - y) / 100, L / 100)
		var color = $.colorspaces.make_color('sRGB', rgb);
		var l = color.as('CIELUV')[0] / 100;
		return [l, l, l];
	}
	function hsl_chroma(x, y) {
		var rgb = hsl_to_rgb(x, (100 - y) / 100, L / 100)
		var color = $.colorspaces.make_color('sRGB', rgb);
		var C = color.as('CIELCHuv')[1];
		var red = $.colorspaces.make_color('CIELCHuv', [L, C, 0]);
		return red.as('sRGB');
	}
	function husl_chroma(x, y) {
		var rgb = $.husl.husl(x, 100 - y, L, true)
		var color = $.colorspaces.make_color('sRGB', rgb);
		var C = color.as('CIELCHuv')[1];
		var red = $.colorspaces.make_color('CIELCHuv', [L, C, 0]);
		return red.as('sRGB');
	}
	function cielchuv_chroma(x, y) {
		var color = $.colorspaces.make_color('CIELCHuv', [L, 200 - y * 2, x]);
		if (!color.is_displayable()) return [0, 0, 0];
		var C = color.as('CIELCHuv')[1];
		var red = $.colorspaces.make_color('CIELCHuv', [L, C, 0]);
		return red.as('sRGB');
	}
	function husl_low(x, y) {
		return $.husl.husl(x, 100 - y, 10, true)
	}
	function husl_high(x, y) {
		return $.husl.husl(x, 100 - y, 95, true)
	}
	set($('#cielchuv'), cielchuv);
	set($('#husl'), husl);
	set($('#hsl'), hsl);
	set($('#hsl_lightness'), hsl_lightness);
	set($('#hsl_chroma'), hsl_chroma);
	set($('#husl_chroma'), husl_chroma);
	set($('#cielchuv_chroma'), cielchuv_chroma);
	set($('#husl_low'), husl_low);
	set($('#husl_high'), husl_high);
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

