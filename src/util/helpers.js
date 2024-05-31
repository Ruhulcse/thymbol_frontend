import moment from 'moment';
import Swal from 'sweetalert2';

export const dateTime = timestamp => {
	return !timestamp ? '' : moment(timestamp).format('DD-MM-YYYY, hh:mm A');
};

export const humanDate = timestamp => {
	return moment(timestamp).format('dddd, MMMM Do, YYYY');
};

export const moneyFormatter = (amount, currency = '', precision = 2) => {
	if (amount && !isNaN(amount)) {
		const number = parseFloat(amount).toFixed(precision);
		const result = Intl.NumberFormat('en-US').format(number);
		return `${result} ${currency}`;
	} else if (!isNaN(amount)) {
		return `${amount} ${currency}`;
	}
};

export function swalConfirm(msg, title, cText) {
	try {
		const result = Swal.fire({
			title: title || 'Are you sure',
			text: msg || 'you want to proceed?',
			icon: 'warning',
			showCloseButton: true,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: cText || 'Yes, Confirm',
			allowOutsideClick: false,
		});
		return result;
	} catch (e) {
		// Fail!
		console.error(e);
		return false;
	}
}

// Error Message
export function swalError(msg, title = 'Oops...') {
	try {
		const result = Swal.fire({
			icon: 'error',
			title: title,
			text: msg,
			showCloseButton: true,
			showConfirmButton: true,
			allowOutsideClick: true,
			timer: 60000,
		});
		return result;
	} catch (e) {
		// Fail!
		console.error(e);
		return false;
	}
}

// Success Message
export function swalSuccess(
	$text = 'Your work has been saved!',
	title = 'Success!',
	$html = false
) {
	try {
		let result = '';
		if ($html != false) {
			result = Swal.fire({
				icon: 'success',
				title: title,
				html: $html,
				showCloseButton: true,
				showConfirmButton: true,
				allowOutsideClick: true,
				timer: 60000,
			});
		} else {
			result = Swal.fire({
				icon: 'success',
				title: title,
				text: $text,
				showCloseButton: true,
				showConfirmButton: true,
				allowOutsideClick: true,
				timer: 60000,
			});
		}
		return result;
	} catch (e) {
		// Fail!
		console.error(e);
		return false;
	}
}

export function convertMoneyStringToNumber(moneyString) {
	let stringWithoutCommas = moneyString.replace(/,/g, '');
	let numberValue = parseFloat(stringWithoutCommas);
	return numberValue;
}

export function formatTimeOrDate(dateInput) {
	const momentDate = moment(dateInput);
	const now = moment();

	// Check if the date is today or yesterday
	if (now.diff(momentDate, 'days') < 1) {
		// It's today
		return momentDate.fromNow();
	} else if (now.startOf('day').diff(momentDate.startOf('day'), 'days') === 1) {
		// It's yesterday
		return 'Yesterday at ' + momentDate.format('HH:mm');
	} else {
		// Use a formatted date
		return momentDate.format('MMM DD, YYYY');
	}
}
