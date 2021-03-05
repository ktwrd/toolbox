module.exports = 
{
	forEach: async(arr,cb) =>
	{
		if (arr === undefined) throw "Array is undefined";
		if (cb  === undefined) throw "Callback is not defined";
<<<<<<< HEAD
		for (let index = 0; index < arr.length; index++) {
			await callback(arr[index], index, arr)
=======
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array)
>>>>>>> d855eeed84480bc8049d65df6e1d6c464606c21c
		}
	}
}
