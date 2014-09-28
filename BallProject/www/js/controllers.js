function OControllers(canvas)
{	this.canvas = canvas;

	this.start = function() {
		if (!this.canvas.started) {

			this.canvas.started = 1;

			$('#start').attr('disabled', true);
			$('#start').parent().addClass('ui-state-disabled');
			$('#pause').attr('disabled', false);
			$('#pause').parent().removeClass('ui-state-disabled');

			this.canvas.work();

		}
	};

	this.pause = function() {

		if ( (this.canvas.paused =- this.canvas.paused) < 0) {

			/*$('#pause').val('Pause');
			alert('Pause'+$('#pause').parent().html())
			$('#pause').parent().html('Pause'+$('#pause').parent().html().substring(8));*/
			this.canvas.work();

		}/* else {
			$('#pause').val('Continue');
			str = 'Continue' + $('#pause').parent().html().substring(5);
			$('#pause').parent().html(str);
		}*/
	};

	this.reset = function() {

		this.canvas.started = 0;
		this.canvas.paused = -1;

		$('#pause').val('Pause') 
		$('#pause').attr('disabled', true);
		$('#pause').parent().addClass('ui-state-disabled');
		$('#start').attr('disabled', false);
		$('#start').parent().removeClass('ui-state-disabled');

		this.canvas.init();

	}
}