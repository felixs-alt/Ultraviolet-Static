const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
var url = ""
async function redirect(params) {
	if(params.has("dest")) {
		url = decodeURIComponent(params.get("dest"));
	} else {
		url = "https://gmspace.netlify.app"
	}
	try {
		await registerSW();
	} catch (err) {
		throw err;
	}
	let frame = document.getElementById("uv-frame");
	frame.style.display = "block";
	let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
	if (await connection.getTransport() !== "/epoxy/index.mjs") {
		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
	frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
	const otMeta = document.createElement('meta');
	otMeta.httpEquiv = 'origin-trial';
	otMeta.content = 'TOKEN_GOES_HERE';
	document.head.append(otMeta);
}
redirect(new URLSearchParams(new URL(window.location).search))
