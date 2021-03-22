import Swal from 'sweetalert2';

export default class Home {
	constructor() {
		this.addDeleteButtonHandler();
		this.addCreateButtonHandler();
		this.addResponseClickHandler();
	}

	private addResponseClickHandler(): void {
		$(document).on('click', '#view-responses', () => {
			Swal.fire({ title: 'Error', text: 'This feature has not yet been implemented.', icon: 'error' });
		});
	}

	private addDeleteButtonHandler(): void {
		$(document).on('click', '#delete-quiz', function () {
			// Fetch the quiz ID from the element
			const quizId = $(this).data('quizId');

			$.ajax('/DeleteQuiz', {
				data: {
					__RequestVerificationToken: $(
						'input[name="__RequestVerificationToken"]'
					).val() /* Verify the request using an ASP token */,
					quizId
				},
				method: 'post',
				success(response) {
					if (response.success) {
						Swal.fire({
							title: 'Success',
							text: 'Quiz deleted successfully',
							icon: 'success',
							onClose: () => document.location.reload()
						});
					} else {
						Swal.fire({ title: 'Error', text: response.message, icon: 'error' });
					}
				},
				error() {
					Swal.fire({ title: 'Error', text: 'There was an error in sending the request.', icon: 'error' });
				}
			});
		});
	}

	private static async showQuizNameDialog(): Promise<string> {
		const { value: quizName } = await Swal.fire({
			title: 'Enter the new quiz name',
			input: 'text',
			inputPlaceholder: 'Quiz name',
			showCancelButton: true
		});

		return quizName;
	}

	private addCreateButtonHandler(): void {
		$(document).on('click', '#add-quiz', () => {
			Home.showQuizNameDialog().then((quizName: string) => {
				// If they didn't press cancel.
				if (quizName !== undefined) {
					$.ajax('/CreateQuiz', {
						data: {
							__RequestVerificationToken: $(
								'input[name="__RequestVerificationToken"]'
							).val() /* Verify the request using an ASP token */,
							name: quizName
						},
						method: 'post',
						success(response) {
							if (response.success) {
								Swal.fire({
									title: 'Success',
									text: 'Quiz created successfully',
									icon: 'success',
									onClose: () => {
										document.location.href = response.redirect;
									}
								});
							} else {
								Swal.fire({ title: 'Error', text: response.message, icon: 'error' });
							}
						},
						error() {
							Swal.fire({ title: 'Error', text: 'There was an error in sending the request.', icon: 'error' });
						}
					});
				}
			});
		});
	}
}
