import Swal from 'sweetalert2';

export default class EditQuiz {
	constructor() {
		this.setupQuestionButtons();
		this.setupAnswerButtons();
		this.setupSaveButton();
	}

	private setupSaveButton(): void {
		const quizId = new URL(window.location.href).searchParams.get('quizId');

		$(document).on('click', '#saveQuiz', () => {
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
		this.updateQuestionArrows();

		$(document).on('click', '#moveQuestionUp', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			listGroup.prev().insertAfter(listGroup);

			this.updateQuestionArrows();
		});
		$(document).on('click', '#moveQuestionDown', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			listGroup.next().insertBefore(listGroup);

			this.updateQuestionArrows();
		});
		$(document).on('click', '#addQuestion', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			listGroup.clone().insertAfter(listGroup);

			this.updateQuestionArrows();
		});
		$(document).on('click', '#removeQuestion', (data) => {
			const listGroup = $(data.target).parents('.list-group');

			$(listGroup).remove();

			this.updateQuestionArrows();
		});
	}

	private setupAnswerButtons(): void {
		this.updateAnswerArrows();

		$(document).on('click', '#moveAnswerUp', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			listGroup.prev().insertAfter(listGroup);

			this.updateAnswerArrows();
		});
		$(document).on('click', '#moveAnswerDown', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			listGroup.next().insertBefore(listGroup);

			this.updateAnswerArrows();
		});
		$(document).on('click', '#addAnswer', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			listGroup.clone().insertAfter(listGroup);

			this.updateAnswerArrows();
		});
		$(document).on('click', '#removeAnswer', (data) => {
			const listGroup = $(data.target).parents('.list-group-item');

			$(listGroup).remove();

			this.updateAnswerArrows();
		});
	}

	private updateQuestionArrows(): void {
		for (const element of $('.list-group')) {
			if ($(element).prev().length) $(element).find('#moveQuestionUp').show();
			else $(element).find('#moveQuestionUp').hide();
			if ($(element).next().length) $(element).find('#moveQuestionDown').show();
			else $(element).find('#moveQuestionDown').hide();
		}
	}

	private updateAnswerArrows(): void {
		for (const element of $('.list-group-item')) {
			if ($(element).prev().length) $(element).find('#moveAnswerUp').show();
			else $(element).find('#moveAnswerUp').hide();
			if ($(element).next().length) $(element).find('#moveAnswerDown').show();
			else $(element).find('#moveAnswerDown').hide();
		}
	}
}
