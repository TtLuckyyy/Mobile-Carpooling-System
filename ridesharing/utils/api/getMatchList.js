export default (params) => {
	// console.log('upload !!!');
	// console.log(params.data);
	return request({
		url: '/work/sync',
		method: 'post',
		queryParams: {
			...params.queryParams
		},
		data: params.data,
		header: {
			"Content-Type": 'application/json',
		},
	})
}