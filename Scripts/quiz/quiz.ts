import Swal from 'sweetalert2';

export default class Quiz {
	constructor() {
		// Only add the click handler if the page isn't being viewed.
		if (!$('#quiz-question-list').hasClass('viewing')) this.addAnswerClickHandler();
		this.addSaveClickHandler();
	}

	private addAnswerClickHandler(): void {
		$(document).on('click', '#answer-container a.list-group-item', (data) => {
			$(data.target).toggleClass('active');
		});
	}

	private addSaveClickHandler(): void {
		const quizId = new URL(window.location.href).searchParams.get('quizId');
		$(document).on('click', '#save-quiz', () => {
			$.ajax('/Quiz/SubmitQuiz', {
				data: {
					__RequestVerificationToken: $(
						'input[name="__RequestVerificationToken"]'
					).val() /* Verify the request using an ASP token */,
					quizId,
					answers: this.getQuizAnswersFromPage()
				},
				method: 'post',
				success(response) {
					if (response.success) {
						Swal.fire({
							title: 'Success',
							text: 'Quiz submitted successfully',
							icon: 'success',
							onClose: () => {
								document.location.href = '/';
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
		});
	}

	private getQuizAnswersFromPage(): Array<{ Question: number; Answer: number }> {
		const answers: Array<{ Question: number; Answer: number }> = [];

		// Find all the selected (active) answers
		for (const answer of $('#answer-container a.list-group-item.active')) {
			// Retrieve the question and answer IDs stored on the element.
			const questionId = $(answer).data('questionId');
			const answerId = $(answer).data('answerId');

			answers.push({ Question: questionId, Answer: answerId });
		}

		return answers;
	}
}
