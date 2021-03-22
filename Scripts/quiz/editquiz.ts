import Swal from 'sweetalert2';

export default class EditQuiz {
	constructor() {
		this.setupQuestionButtons();
		this.setupAnswerButtons();
		this.setupSaveButton();
	}

	private setupSaveButton(): void {
		const quizId = new URL(window.location.href).searchParams.get('quizId');

		$(document).on('click', '#save-quiz', () => {
			$.ajax('/EditQuiz/SaveQuiz', {
				data: {
					__RequestVerificationToken: $(
						'input[name="__RequestVerificationToken"]'
					).val() /* Verify the request using an ASP token */,
					quizId,
					questions: this.getQuestionsFromPage()
				},
				method: 'post',
				success(response) {
					if (response.success) {
						Swal.fire({
							title: 'Success',
							text: 'Quiz saved successfully',
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

	private getQuestionsFromPage(): Array<{
		Question: string;
		Order: number;
		Answers: Array<{ Answer: string; Order: number }>;
	}> {
		const result: Array<{
			Question: string;
			Order: number;
			Answers: Array<{ Answer: string; Order: number }>;
		}> = [];

		let questionNumber = 0;

		for (const question of $('#question-container .list-group>.list-group-item')) {
			const questionText = $(question).find('input').val() as string;

			const Answers: Array<{ Answer: string; Order: number }> = [];

			let answerNumber = 0;

			for (const answer of $(question).parent().find('#answer-container .list-group-item')) {
				const answerText = $(answer).find('input').val() as string;

				Answers.push({ Answer: answerText, Order: (answerNumber += 1) });
			}

			result.push({ Question: questionText, Order: (questionNumber += 1), Answers });
		}

		return result;
	}

	private setupQuestionButtons(): void {
		EditQuiz.updateQuestionButtonStates();

		$(document).on('click', '#move-question-up', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			listGroup.prev().insertAfter(listGroup);

			EditQuiz.updateQuestionButtonStates();
		});
		$(document).on('click', '#move-question-down', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			listGroup.next().insertBefore(listGroup);

			EditQuiz.updateQuestionButtonStates();
		});
		$(document).on('click', '#add-question', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			listGroup.clone().insertAfter(listGroup);

			EditQuiz.updateQuestionButtonStates();
		});
		$(document).on('click', '#remove-question', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			$(listGroup).remove();

			EditQuiz.updateQuestionButtonStates();
		});
	}

	private setupAnswerButtons(): void {
		EditQuiz.updateAnswerButtonStates();

		$(document).on('click', '#move-answer-up', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			listGroup.prev().insertAfter(listGroup);

			EditQuiz.updateAnswerButtonStates();
		});
		$(document).on('click', '#move-answer-down', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			listGroup.next().insertBefore(listGroup);

			EditQuiz.updateAnswerButtonStates();
		});
		$(document).on('click', '#add-answer', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			listGroup.clone().insertAfter(listGroup);

			EditQuiz.updateAnswerButtonStates();
		});
		$(document).on('click', '#remove-answer', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			$(listGroup).remove();

			EditQuiz.updateAnswerButtonStates();
		});
	}

	private static updateQuestionButtonStates(): void {
		const listGroupSelector = $('.list-group');

		for (const element of listGroupSelector) {
			// If it can't be moved any more, hide the up arrow.
			if ($(element).prev().length) $(element).find('#move-question-up').show();
			else $(element).find('#move-question-up').hide();

			// If it can't be moved any more, hide the down arrow.
			if ($(element).next().length) $(element).find('#move-question-down').show();
			else $(element).find('#move-question-down').hide();

			// If it's the only element, don't let them remove it. Otherwise they can't add more!
			if (listGroupSelector.length > 1) $(element).find('#remove-question').show();
			else $(element).find('#remove-question').hide();
		}
	}

	private static updateAnswerButtonStates(): void {
		const listGroupItemSelector = $('.list-group-item');

		for (const element of listGroupItemSelector) {
			// If it can't be moved any more, hide the up arrow.
			if ($(element).prev().length) $(element).find('#move-answer-up').show();
			else $(element).find('#move-answer-up').hide();

			// If it can't be moved any more, hide the down arrow.
			if ($(element).next().length) $(element).find('#move-answer-down').show();
			else $(element).find('#move-answer-down').hide();

			// If it's the only element, don't let them remove it. Otherwise they can't add more! (Makes sure to only check items within this question)
			if ($(element).parent().children('.list-group-item').length > 1) $(element).find('#remove-answer').show();
			else $(element).find('#remove-answer').hide();
		}
	}
}
