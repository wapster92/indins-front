////////////////////////////////////////////////////////////////////////////////////
// UKISP TAG BLOCK
////////////////////////////////////////////////////////////////////////////////////

CKEDITOR.plugins.add( 'ukisptagblock', {
	requires: 'widget',
	init: function( editor ) {
		CKEDITOR.dialog.add('ukisptagblock', function(editor)
		{
			return {
				title: 'Редактировать блок',
				minWidth: 300,
				minHeight: 100,
				contents: [
					{
						id: 'info',
						elements: [
							{
								type: 'select',
								id: 'selectedBlock',
								label: 'Выберите блок',
								items: [ ],
								onLoad: function(api) {
									let widget = this;
									let nuxtItems = $nuxt.$store.state.api.blockVariables.items;
									nuxtItems.forEach(function(item, i, arr) {
										widget.add(item.name, '~' + item.keyword);
									});
								},
								setup: function( widget ) {
									if(widget.data)
									{
										this.setValue( widget.data.selectedBlock );
									}
								},
								commit: function( widget ) {
									if(widget.data)
									{
										widget.setData( 'selectedBlock', this.getValue() );
									}
								}
							},
							{
								type: 'button',
								id: 'button-block-contents',
								label: 'Редактировать содержимое блока',
								title: 'Редактировать содержимое блока',
								onClick: function() {
									let selectedKeyword = CKEDITOR.dialog.getCurrent().getValueOf('info', 'selectedBlock');
									let nuxtItems = $nuxt.$store.state.api.blockVariables.items;
									let selectedId = false;
									nuxtItems.forEach(function(item, i, arr) {
										if(selectedKeyword === '~' + item.keyword)
										{
											selectedId = item.id;
										}
									});

									if(selectedId !== false)
									{
										CKEDITOR.currentInstance.element.$.dispatchEvent(new CustomEvent('edit-block',{detail:{id:selectedId,label:selectedKeyword}}));
										CKEDITOR.dialog.getCurrent().hide();
									}
									else
									{
										alert('Выберите блок');
									}
								}
							}
						]
					}
				]
			};
		});

		editor.widgets.add( 'ukisptagblock', {
			button: 'Добавить Блок',
			dialog: 'ukisptagblock',
			icons: 'ukisp',
			template:
				'<div class="ukisptagblock">' +
					'<h2 class="simplebox-title">Блок</h2>' +
					'<div class="simplebox-content"><p>Блочище...</p></div>' +
				'</div>',

			/*
			editables: {
				title: {
					selector: '.simplebox-title'
				},
				content: {
					selector: '.simplebox-content'
				}
			},
			*/

			allowedContent:
				'div(!ukisptagblock,align-left,align-right,align-center){width};' +
				'div(!simplebox-content); h2(!simplebox-title)',

			requiredContent: 'div(ukisptagblock)',

			init: function() {
				let ch = this.element.getHtml();
				this.setData( 'selectedBlock', ch);
			},

			data: function() {
				if ( this.data.selectedBlock )
				{
					this.element.setHtml(this.data.selectedBlock);
				}
			},

			upcast: function( element ) {
				return element.name == 'div' && element.hasClass( 'ukisptagblock' );
			}

		} );
	}
});
