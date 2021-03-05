module.exports = 
{
	forEach: async(arr,cb) =>
	{
		if (arr === undefined) throw "Array is undefined";
		if (cb  === undefined) throw "Callback is not defined";
		for (let index = 0; index < arr.length; index++) {
			await callback(arr[index], index, arr)
		}
	}
}