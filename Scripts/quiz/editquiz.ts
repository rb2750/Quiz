export default class EditQuiz {
	constructor() {
		this.setupQuestionButtons();
		this.setupAnswerButtons();
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
