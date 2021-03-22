import Swal from 'sweetalert2';

export default class Quiz {
	constructor() {
		this.addAnswerClickHandler();
		this.addSaveClickHandler();
	}

	private addAnswerClickHandler(): void {
		$(document).on('click', '#answer-container a.list-group-item', () => {
			$(this).toggleClass('active');
		});
	}

	private addSaveClickHandler(): void {
		$(document).on('click', '#save-quiz', () => {
			Swal.fire({ title: 'Error', text: 'This feature has not yet been implemented.', icon: 'error' });
		});
	}
}
