export default {
  translation: {
    mainHeader: {
      hexletChat: 'Hexlet Chat',
      signOut: 'Выйти',
    },
    loginPage: {
      header: 'Войти',
      username: 'Ваш логин',
      password: 'Пароль',
      invalidPassword: 'Неверные имя пользователя или пароль',
      submit: 'Войти',
      noSignUpWithLink: 'Нет аккаунта? <1>Регистрация</1>',
    },
    signup: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      feedbacks: {
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        uniqueUser: 'Такой пользователь уже существует',
        required: 'Обязательное поле',
        error: 'Ошибка при регистрации',
      },
    },
    notFoundPage: {
      title: 'Страница не найдена',
      toMainPage: 'Но вы можете перейти <homeLink>на главную страницу</homeLink>',
    },
    chat: {
      channels: 'Каналы',
      addChannelBtn: '+',
      noFoundChannel: 'Канал не найден',
      zeroMessages: 'Нет сообщений в этом канале',
      messagesCount_0: '{{count}} сообщение',
      messagesCount_1: '{{count}} сообщения',
      messagesCount_2: '{{count}} сообщений',
      channelMenu: {
        dropdownEl: 'Управление каналом',
        removeBtn: 'Удалить',
        renameBtn: 'Переименовать',
      },
      messageForm: {
        submit: 'Отправить',
        placeholder: 'Введите сообщение...',
      },
    },
    modal: {
      error: {
        required: 'Обязательное поле',
        length: 'От 3 до 20 символов',
        notOneOf: 'Канал с таким именем уже существует',
      },
      addChannel: {
        title: 'Добавить канал',
        label: 'Имя канала',
        createBtn: 'Создать',
        placeholder: 'Введите название канала',
      },
      removeChannel: {
        title: 'Удалить канал',
        body: 'Вы уверены?',
        deleteBtn: 'Удалить',
      },
      renameChannel: {
        title: 'Переименовать канал',
        label: 'Имя канала',
      },
      confirmBtn: 'Отправить',
      cancelBtn: 'Отменить',
    },
    toast: {
      createdChannel: 'Канал создан',
      removedChannel: 'Канал удален',
      renamedChannel: 'Канал переименован',
      fetchError: 'Ошибка соединения',
    },
  },
};
