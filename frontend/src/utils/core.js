export async function postReq(apiurl, body, type="POST") {
	try {
		const header = {
			"Content-Type": "application/json",
		};
    const token =localStorage.getItem("meet_token")??null
		if (token)
			header["authorization"] = `Bearer ${token}`;
		let res = await fetch("http://localhost:3004/api/" + apiurl, {
			method: type,
			headers: header,
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			throw new Error("Failed to register user");
		} else {
			return await res.json();
		}
	} catch (er) {
		return {
			message: "Something went wrong on client side.",
			success: false,
		};
	}
}

export async function getReq(apiurl) {
	try {
		const header = {
			"Content-Type": "application/json",
		};
    const token =localStorage.getItem("meet_token")??null
		if (token)
			header["authorization"] = `Bearer ${token}`;
		let res = await fetch("http://localhost:3004/api/" + apiurl, {
			method: "GET",
			headers: header,
		});
		if (!res.ok) {
			throw new Error("Failed to register user");
		} else {
			return await res.json();
		}
	} catch (er) {
		return {
			message: "Something went wrong on client side.",
			success: false,
		};
	}
}
