$(function() {
	var L = 50;
	function set($canvas, func) {
		var c = $canvas.get(0).getContext("2d");
		var width = $canvas.width();
		var height = $canvas.height();
		var imageData = c.createImageData(width, height);
		for (var x = 0; x < width; x ++) {
			for (var y = 0; y < height; y ++) {
				var rgb = func(x, y);
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
	function plot($canvas, func) {
		var c = $canvas.get(0).getContext("2d");
		var width = $canvas.width();
		var height = $canvas.height();
		var imageData = c.createImageData(width, height);
		for (var x = 0; x < width; x ++) {
			var y = Math.round(func(x));
			index = (x + y * imageData.width) * 4;
			imageData.data[index+0] = 0;
			imageData.data[index+1] = 0;
			imageData.data[index+2] = 0;
			imageData.data[index+3] = 256;
		}
		c.putImageData(imageData, 0, 0);
	}
	function cielchuv(x, y) {
		var color = $.colorspaces.make_color('CIELCHuv', [L, y, x]);
		if (!color.is_displayable()) rgb = [0, 0, 0];
		else rgb = color.as('sRGB');
		return rgb;
	}
	function husl(x, y) {
		return $.husl.husl(x, y / 2, L)
	}
	set($('#cielchuv'), cielchuv);
	plot($('#husl'), function(x) { return $.husl._maxChroma(L, x); });
});
