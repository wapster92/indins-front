# Документация фронтовой части ядра.
Вы смотрите документацию для версии 4.0+. Если вас интересует документация прошлых версий, ссылки на них:
[v3.0+](https://dev.indins.ru/core/indify/-/tree/v3.1.0#%D1%81%D0%BE%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%B8%D0%B5);
[v2.0+](https://dev.indins.ru/core/indify/-/tree/v2.9.71-alpha.12#%D1%83%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0).

## Содержание
* [Установка](#установка)
* [Подключение](#подключение)
* Компоненты
   1. [Листинг и связанные с ним компоненты](/src/components/listing#листинг-и-связанные-с-ним-компоненты)
      * [DynamicListing](/src/components/listing#dynamiclisting)
        1) [Компонент фильтров](/src/components/listing#dynamicfilters)
        2) [Фильтры](/src/components/filters#фильтры)
            * [Текстовый фильтр (TextFilter)](/src/components/filters#textfilter)
            * [Числовой фильтр (NumberFilter)](/src/components/filters#numberfilter)
            * [Фильтр по дате (DateFilter)](/src/components/filters#datefilter)
            * [Булевый фильтр (BooleanFilter)](/src/components/filters#booleanfilter)
            * [Фильтр связей (RelationFilter)](/src/components/filters#relationfilter)
        3) [Действия над листом](/src/components/listing#действия-над-листом)
            * [Кнопка добавления (AddItem)](/src/components/listing#additem)  
            * [Переключатель колонок (ColumnToggler)](/src/components/listing#columntoggler)
            * [Цель перетягивания (DragoverButton)](/src/components/listing#dragoverbutton)
      * [Таблица (TableListing)](/src/components/listing#tablelisting)
        1) [Ячейки листинга](/src/components/listing#ячейки-таблицы)
            * [Текстовая ячейка (TextColumn)](/src/components/listing/table#textcolumn)
            * [Ячейка действий (ActionColumn)](/src/components/listing/table#actioncolumn)
            * [Булевая ячейка (BoolColumn)](/src/components/listing/table#boolcolumn)
            * [Ячейка статуса (ChipColumn)](/src/components/listing/table#chipcolumn)
            * [Ячейка с датой (DateColumn)](/src/components/listing/table#datecolumn)
            * [Ячейка файлов (FileColumn)](/src/components/listing/table#filecolumn)
            * [Функциональная ячейка (FuncColumn)](/src/components/listing/table#funccolumn)
            * [Ячейка с иконкой (IconColumn)](/src/components/listing/table#iconcolumn)
            * [Ячейка списка (ListColumn)](/src/components/listing/table#listcolumn)
            * [Ячейка с телефоном (PhoneColumn)](/src/components/listing/table#phonecolumn)
            * [Ячейка связи (RelationColumn)](/src/components/listing/table#relationcolumn)
            * [Гибкая ячейка (SlotColumn)](/src/components/listing/table#slotcolumn)
            * [Ячейка ввода текста (InputTextColumn)](/src/components/listing/table#inputtextcolumn)
            * [Ячейка ввода с выпадающим списком (SearchSelectColumn)](/src/components/listing/table#searchselectcolumn)
        2) [Действия над одним элементом](/src/components/listing/table#действия-над-одним-элементом)
            * [Кнопка редактирования (EditItem)](/src/components/listing/table#edititem)
            * [Кнопка удаления (DeleteItem)](/src/components/listing/table#deleteitem)
            * [Скрытые кнопки в ряду (ActionItemList)](/src/components/listing/table#actionitemlist)
            * [Кнопка действия (ClickAction)](/src/components/listing/table#clickaction)
            * [Кнопка перенаправления (RedirectAction)](/src/components/listing/table#redirectaction)
        3) [Действия над несколькими выбранными элементами](/src/components/listing/table#действия-над-несколькими-выбранными-элементами)
            * [Кнопка множественного действия (MassiveActionButton)](/src/components/listing/table#massiveactionbutton)
            * [Множественное удаление (DeleteMultiple)](/src/components/listing/table#deletemultiple)
            * [Множественное восстановление (RestoreMultiple)](/src/components/listing/table#restoremultiple)
      * [Канбан (CanbanListing)](/src/components/listing#canbanlisting)
      * [Календарь (CalendarListing)](/src/components/listing#calendarlisting)
      * [Обычный справочник (DefaultDictionary)](/src/components/listing#defaultdictionary)
   2. [Всплывающие окна](/src/components/popups#всплывающие-окна)
      * [Всплывающее окно (PopupComponent)](/src/components/popups#popupcomponent)
      * [Предупреждение при удалении (DeletePopup)](/src/components/popups#deletepopup)
   3. [Блоки страниц](/src/components/blocks#блоки-страниц)
      * [Базовый блок страницы (PageBlock)](/src/components/blocks#pageblock)
      * [Блок табов (TabsBlock)](/src/components/blocks#tabsblock)
      * [Блок комментариев (DynamicComments)](/src/components/blocks#dynamiccomments)
      * [Блок автосохранения (AutoSaveBlock)](/src/components/blocks#autosaveblock)
      * [Аккордеон (AccordeonBlock)](/src/components/blocks#accordeonblock)
   4. [Поля и компоненты для форм](/src/components/form#поля-и-компоненты-для-форм)
      * [Текстовое поле (TextInput)](/src/components/form#textinput)
      * [Расширяемое текстовое поле (TextareaInput)](/src/components/form#textareainput)
      * [Числовое поле (NumberInput)](/src/components/form#numberinput)
      * [Изменяемый заголовок (CorrectableTitle)](/src/components/form#correctabletitle)
      * [Чекбокс (SimpleCheck)](/src/components/form#simplecheck)
      * [Переключатель (SimpleSwitch)](/src/components/form#simpleswitch)
      * [Поле выбора цвета (ColorPicker)](/src/components/form#colorpicker)
      * [Markdown поле (SimpleMarkdown)](/src/components/form#simplemarkdown)
      * [Ползунок (SimpleSlider)](/src/components/form#simpleslider)
      * [Двойной ползунок (SimpleSliderRange)](/src/components/form#simplesliderrange)
      * [Выпадающий список (SearchSelect)](/src/components/form#searchselect)
      * [Загрузщик файла (FileUploader)](/src/components/form#fileuploader)
      * [Поле даты и времени (DateTimeField)](/src/components/form#datetimefield)
      * [Сабформа (Subform)](/src/components/form#subform)
      * [Валидатор форм (FormValidator)](/src/components/form#formvalidator)
   5. [UI-kit](/src/components/ui-kit#ui-kit)
      * [Кнопка (SimpleButton)](/src/components/ui-kit#simplebutton)
      * [Полоса прогресса (ProgressBar)](/src/components/ui-kit#progressbar)
      * [Адаптивная кнопка (AdaptiveButton)](/src/components/ui-kit#adaptivebutton)
      * [Кнопка добавления (AddButton)](/src/components/ui-kit#addbutton)
      * [Аватар (IAvatar)](/src/components/ui-kit#iavatar)
      * [Аватар (IBadge)](/src/components/ui-kit#ibadge)
      * [Checkbox (IMultipleCheckbox)](/src/components/ui-kit#imultiplecheckbox)
      * [Кнопка-иконка (IconButton)](/src/components/ui-kit#iconbutton)
      * [Проигрыватель аудио (AudioPlayer)](/src/components/ui-kit#audioplayer)
      * [Мини-Таблица (GridTable)](/src/components/ui-kit#gridtable)
      * [Кастомный скроллбар (ScrollComponent)](/src/components/ui-kit#scrollcomponent)
   6. [Основной компонент (AppAdmin)](/src/components#appadmin)
* [Вспомогательные функции](/src/helpers#вспомогательные-функции-и-свойства)
   1. [Импортируемые функции](/src/helpers#импортируемые-функции)
      * [Получение типа данных (getType)](/src/helpers#gettype)
      * [Получение поля объекта или вложенного объекта (getObjectField)](/src/helpers#getobjectfield)
      * [Назначение поля объекта или вложенного объекта (setObjectField)](/src/helpers#setobjectfield)
      * [Поиск массива (findArray)](/src/helpers#findarray)
      * [Контраст цвета (contrastTextColor)](/src/helpers#contrasttextcolor)
      * [Дебаунсинг (debounce)](/src/helpers#debounce)
      * [Троттлинг (throttle)](/src/helpers#throttle)
      * [Глубокое клонирование объектов и массивов (deepClone)](/src/helpers#deepclone)
      * [Глубокое слияние объектов (deepMerge)](/src/helpers#deepmerge)
      * [Обрезание текста (textCutter)](/src/helpers#textcutter)
   2. [Глобальные методы и свойства компонентов](/src/helpers#глобальные-методы-и-свойства-компонентов)
      * [Автобус событий ($eventBus)](/src/helpers#eventbus)
      * [Декоратор отображение ошибки ($showError)](/src/helpers#showerror)
      * [Декоратор отображение ошибки ($downloadByUrl)](/src/helpers#downloadbyurl)
      * [Дефолтный конфиг ($defaultConfig)](/src/helpers#$defaultConfig)
   3. [Действия в сторе](/src/store#действия-в-сторе)
      * [Панель автосохранения](/src/store#панель-автосохранения)
      * [Прелоадер](/src/store#прелоадер)
* [Хлебные крошки](#breadcrumbs)
* [Фильтры vue](#filters)

## Установка
`npm install -S git+https://dependencies-indify:Y1S62EASbqSyKc2Kxjw2@dev.indins.ru/core/indify.git#v4.0.0`

или

`yarn add git+https://dependencies-indify:Y1S62EASbqSyKc2Kxjw2@dev.indins.ru/core/indify.git#v4.0.0`

## Подключение
После установки пакета необходимо запустить команду "node node_modules/indify", чтобы скопировать необходимые папки и файлы из пакета в корневую папку админки проекта.
После этого все компоненты ядра сразу же становятся глобально доступны во всех создаваемых вами .vue файлах (они подключаются через install функцию в плагине indens-front).

## Breadcrumbs

Документацию можно посмотреть в проекте [Core Nuxt Breadcrumbs](https://dev.indins.ru/core/core-nuxt-breadcrumbs/-/blob/master)

## Filters
*Перед прочтением данного раздела советуем посмотреть документацию [фильтров Vue](https://ru.vuejs.org/v2/guide/filters.html)* 


Для вывода данных в определённом формате добавлены vue filters:

### phone
Форматирование телефона в `+7 (###) ###-##-##` либо `###-##-##`. Телефон должен содержать только 7 или 11 цифр. 
В противном случае будет выведено значение `invalid` из аргуметов     
    
    <a :href="`tel:${user.phone}`">{{ user.phone | phone('-') }}</a> 
    
### number
Приведение числа к принятому в РФ формату

    {{ car.price | number }}₽ // 1 234 567,89₽
### date, time, dateTime, fromNow
Форматирование даты, принимает аргументы формат и значение по умолчанию     
    
    {{ user.birthDateTime | date }} // DD.MM.YY
    {{ user.birthDateTime | time }} // HH:mm
    {{ user.birthDateTime | dateTime }} // HH:mm DD.MM.YY
    {{ user.birthDateTime | fromNow }} // время с данного момента, например «30 лет назад»
    {{ user.birthDateTime | date('DD.MM HH:mm','Дата некорректна') }} // DD.MM HH:mm либо «Дата некорректна» 
    
### ucfirst
Аналог php функции `ucfirst()`
    
    {{ 'иван' | ucfirst }} // Иван 
    
### bool
Вывод положительного, отрицательного значения, либо невалидного. 

Аргументы:

trueText: Положительное значение 

falseText: Отрицательное значение 

invalidText: Невалидное значение 


    {{ true | bool }} // «Да»
    {{ false | bool('Хорошо', 'Плохо', 'Никак') }} // «Плохо»

### cut
Обрезка текста по пробелу, добавление многоточия. 
Принимает максимальную длину в символах

    {{ 'Lorem ipsum sit amet' | cut(14) }} // «Lorem ipsum...»
### dynamicFilter
Применение любого фильтра, переданного в аргументе. 
Как пример использование - передача фильтра через props компонента

    {{ someValue | dynamicFilter('number') }}

*Обязательно добавляйте свои фильтры если появляется необходимость одинакового форматирования данных! Пример - dist/plugins/indify.js*


