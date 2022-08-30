const print = $('#print')
print.on('click', handlePrint)

function handlePrint(e) {
	e.preventDefault()
	window.print()
}