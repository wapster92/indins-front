////////////////////////////////////////////////////////////////////////////////////
// UKISP TAG VAR
////////////////////////////////////////////////////////////////////////////////////

CKEDITOR.plugins.add( 'ukisptagvar', {
	requires: 'widget',
	init: function( editor ) {
		CKEDITOR.dialog.add('ukisptagvar', function(editor)
		{
			return {
				title: 'Редактировать переменную',
				minWidth: 300,
				minHeight: 100,
				contents: [
					{
						id: 'info',
						elements: [
							{
								type: 'select',
								id: 'selectedVar',
								label: 'Выберите переменную',
								items: [ ],
								onLoad: function(api) {
									let widget = this;
									let nuxtItems = $nuxt.$store.state.api.inlineVariables.items;
									nuxtItems.forEach(function(item, i, arr) {
										widget.add(item.name, '#' + item.keyword);
									});
								},
								setup: function( widget ) {
									if(widget.data)
									{
										this.setValue( widget.data.selectedVar );
									}
								},
								commit: function( widget ) {
									if(widget.data)
									{
										widget.setData( 'selectedVar', this.getValue() );
									}
								}
							},
						]
					}
				]
			};
		});

		editor.widgets.add( 'ukisptagvar', {
			button: 'Добавить переменную',
			dialog: 'ukisptagvar',
			icons: 'ukisp',
			template:
				'<span class="ukisptagvar">' +
					'<span class="ukisptagvar-title">Переменная</span>' +
				'</span>',

			/*
			editables: {
				title: {
					selector: '.ukisptagvar-title'
				},
			},
			*/

			allowedContent:
				'span(!ukisptagvar,align-left,align-right,align-center){width};' +
				'span(!ukisptagvar-title)',

			requiredContent: 'span(ukisptagvar)',

			init: function() {
				let ch = this.element.getHtml();
				this.setData( 'selectedVar', ch);
			},

			data: function() {
				if ( this.data.selectedVar )
				{
					this.element.setHtml(this.data.selectedVar);
				}
			},

			upcast: function( element ) {
				return element.name == 'span' && element.hasClass( 'ukisptagvar' );
			}

		} );
	}
});
