const baseUrl = 'localhost:8080';
const test = '';


export function get(uri ,data){
	uni.request({
		url,
		data: data.data,
		header: data.header,
		method: data.method || 'GET',
		timeout: 3000,
		success: (res) => {
			return res;
		}
	})
}