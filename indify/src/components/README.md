[Вернуться к содержанию](/README.md#содержание)

# AppAdmin
Компонент используется в default файле в папке layout. Оборачивает все приложение в обертку, в верхней части которой находится компонент MainToolbar, а в левой - MainMenu. В 4.0.0 было добавлено несколько способов взаимодействовтаь с этим компонентом, поэтому описываю его здесь.

### Свойства:
* **main-menu** (Array) - массив объектов с информацией об основном меню. По-умолчанию равно [].
* **user-menu** (Array) - объект вида: 
```
 userMenu: {
        settings: {
          src: '/icons7.svg',
          label: 'Настройки пользователя',
          link: '/users/1'
        },
        exit: {   
          icon: 'exit_to_app',
          label: 'Выйти',
          func: () => this.$router.push({ path: '/auth/logout' }),
          bottom: true, // элементы с эти флагом отображаются под разделительной полосой внизу
        },
```  
  На основе него строится выпадающее меню при клике на пользователя в верхней панели. По-умолчанию равно null.
* **logo** (String) - ссылка на лого проекта. По-умолчанию будет пытаться найти logo.svg файл в папке static.
* **show-user-settings** (Boolean) - свойство показывает кнопку Настройки в выпадающем списке пользователей. При клике на кнопку открывается попап. По-умолчанию равно false.
* **keep-menu-open** (Boolean) (доступно с 4.0.1) - свойство запрещающее основному меню закрывать себя, когда с его помощью переходят в другой раздел. По-умолчанию равно false. 

### Слоты: 
* **toolbar** - слот, содержимое которого заменяет содержимое верхней панели, включая панель пользователя.
* **user-settings** - содержимое попапа, открываемого при клике на кнопку "Настройки" в выпадающем списке панели пользователя. Экспортирует:
> 1) *get-user* (Function) - функция получения информации о пользователе. Делает запрос на 'user-settings' через core-xhr, поэтому его необходимо создать.
> 2) *save-user* (Function) - функция, первым аргументом получающая объект данных о пользователе. Сохраняет пользователя, отправляя запрос на 'user-settings'.
* **popup-buttons** - слот прокидывающий компоненты в слот *popup-buttons* попапа, который вызывается по клику по кнопке "Настройки" в выпадающем списке юзера.

> Config service для user-settings запрос.
```
<?php

namespace App\Service\Config;

use App\Entity\Role;
use App\Entity\User;
use Core\CoreAPIBundle\Service\API\Filter\EqualFilterService;
use Core\CoreAPIBundle\Service\Config\ConfigInterface;
use Core\CoreAPIBundle\Service\Config\Fields\FieldService;
use Core\CoreAPIBundle\Service\Config\Fields\SynonymsClasses\ManyToMany;
use Core\CoreAPIBundle\Service\Config\PageConfigService;
use Core\CoreAPIBundle\Service\Config\QueryConfigService;

/**
 * Class UserSettingsPage
 *
 * @package App\Service\Config
 * @author Seredenko Mihail <seredenko@indins.ru>
 */
class UserSettingPage
{
    public static function getSettings(string $name): PageConfigService
    {
        return (new PageConfigService($name))
            ->setAccess(ConfigInterface::ACCESS_PRIVATE)
            ->addQuery(self::getUserSettings());
    }

    public static function getUserSettings(): QueryConfigService
    {
        return (new QueryConfigService('user-settings'))
            ->setMethods([
                ConfigInterface::METHOD_GET,
                ConfigInterface::METHOD_PUT,
            ])
            ->setEntity(User::class)
            ->addField(new FieldService('username'))
            ->addField(new FieldService('plainPassword'))
            ->addField(new FieldService('name'))
            ->addField(new FieldService('surname'))
            ->addField(new FieldService('patronymic'))
            ->addField(new FieldService('position'))
            ->addField(new FieldService('phone'))
            ->addField(new FieldService('email'))
            ->addField(new FieldService('telegramId'))
            ->addField(new FieldService('isBlocked'))
            ->addField(new FieldService('telegramId'))
            ->addField(
                (new ManyToMany('roles', Role::class))
                    ->addField(new FieldService('name'))
                    ->addField(new FieldService('keyWord'))
            )
            ->addFilter(EqualFilterService::class, 'id');
    }
}
```

> А в файле подключения конфигов страниц нужно подключить страницу user-settings.
> ->addPage(UserSettingPage::getSettings('user-settings'))
> Редактируйте конфиг как вас нужно для того, чтобы применить нужные настройки.