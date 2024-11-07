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

	let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
	if (await connection.getTransport() !== "/epoxy/index.mjs") {
		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
	window.location.replace(__uv$config.prefix + __uv$config.encodeUrl(url))
}
redirect(new URLSearchParams(new URL(window.location).search))