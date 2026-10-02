export type Language = 'ru' | 'en';

export interface Translations {
  header: {
    name: string;
    nav: {
      about: string;
      solutions: string;
      process: string;
      projects: string;
      pricing: string;
      whyCheaper: string;
    };
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    subDescription1: string;
    subDescription2: string;
    priceTag: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metrics: {
      days: string;
      daysLabel: string;
      price: string;
      priceLabel: string;
      direct: string;
      directLabel: string;
    };
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    canIncludeTitle: string;
    canIncludeList: string[];
    directComm: string;
    whoIsItForTitle: string;
    whoIsItForList: string[];
    whoIsNotForTitle: string;
    whoIsNotForList: string[];
  };
  solutions: {
    title: string;
    intro1: string;
    intro2: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  advantages: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  tools: {
    title: string;
    intro: string;
    items: {
      name: string;
      description: string;
    }[];
    signature: string;
  };
  process: {
    title: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  reviews: {
    preTitle: string;
    title: string;
    placeholder: string;
    note: string;
  };
  projects: {
    preTitle: string;
    title: string;
    description: string;
    btnViewProject: string;
    btnViewScreens: string;
    btnViewConcept: string;
    modalClose: string;
    items: {
      id: string;
      title: string;
      tag: string;
      description: string;
      p2: string;
      p3?: string;
      whatDoneTitle: string;
      whatDoneList: string[];
      btnText: string;
      image: string;
    }[];
  };
  pricing: {
    preTitle: string;
    title: string;
    intro: string;
    strikethroughNote: string;
    durationPrefix: string;
    includedTitle: string;
    plans: {
      id: string;
      name: string;
      subtitle: string;
      audience: string;
      oldPrice: string;
      currentPrice: string;
      currentPriceSub: string;
      duration: string;
      popular?: boolean;
      popularBadge?: string;
      features: string[];
      disclaimer?: string;
      btnText: string;
    }[];
    extraService: {
      preTitle: string;
      title: string;
      description: string;
      whatCanImproveTitle: string;
      whatCanImproveList: string[];
      price: string;
      priceNote: string;
      btnText: string;
    };
    addOns: {
      title: string;
      items: {
        title: string;
        description: string;
      }[];
    };
  };
  whyCheaper: {
    preTitle: string;
    title: string;
    intro1: string;
    intro2: string;
    reasons: {
      title: string;
      description: string;
    }[];
    finalText: string;
  };
  contact: {
    title: string;
    description1: string;
    description2: string;
    btnTelegram: string;
    btnSubmitProject: string;
    disclaimer: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      contactLabel: string;
      contactPlaceholder: string;
      tariffLabel: string;
      tariffPlaceholder: string;
      projectUrlLabel: string;
      projectUrlPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      successTitle: string;
      successMessage: string;
      errorMessage: string;
      sendAnother: string;
    };
  };
  footer: {
    name: string;
    tagline: string;
    telegram: string;
    email: string;
    privacy: string;
    copyright: string;
    cmsButton: string;
  };
  privacyModal: {
    title: string;
    close: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  };
  cms: {
    title: string;
    leadsCount: string;
    noLeads: string;
    status: {
      new: string;
      in_progress: string;
      completed: string;
      archived: string;
    };
    telegramSettingsTitle: string;
    telegramTokenLabel: string;
    telegramChatIdLabel: string;
    saveSettings: string;
    savedToast: string;
    testSend: string;
    exportCsv: string;
    clearLeads: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    header: {
      name: 'Илья Арьков',
      nav: {
        about: 'Обо мне',
        solutions: 'Что решает сайт',
        process: 'Как я работаю',
        projects: 'Проекты',
        pricing: 'Тарифы',
        whyCheaper: 'Почему дешевле',
      },
      cta: 'Обсудить проект',
    },
    hero: {
      badge: 'Стартовая стоимость для ближайших 3 проектов',
      title: 'Сайт, который объясняет ваши услуги за вас',
      description: 'Соберу в одном месте ваши услуги, цены, примеры работ, ответы на частые вопросы и удобный способ записаться или оставить заявку.',
      subDescription1: 'Вместо того чтобы каждый раз отправлять клиенту прайс и повторять одну и ту же информацию, вы сможете просто дать ему одну ссылку.',
      subDescription2: 'Современная разработка, удобная мобильная версия и прямое общение с разработчиком – без агентской наценки.',
      priceTag: 'От 39 000 ₽ · Срок от 5 рабочих дней',
      ctaPrimary: 'Обсудить мой сайт',
      ctaSecondary: 'Посмотреть проекты',
      metrics: {
        days: 'от 5 дней',
        daysLabel: 'Срок разработки',
        price: 'от 39 000 ₽',
        priceLabel: 'Фиксированная цена',
        direct: '1 на 1',
        directLabel: 'Без менеджеров',
      },
    },
    about: {
      title: 'Разрабатываю современные сайты для экспертов и небольшого бизнеса',
      p1: 'Меня зовут Илья Арьков. Я веб-разработчик с профильным высшим образованием. Создаю сайты для специалистов, небольших компаний, некоммерческих организаций и проектов, которым важно понятно представить себя в интернете.',
      p2: 'Моя задача – аккуратно собрать предоставленную вами информацию и превратить её в современный, быстрый и удобный сайт.',
      canIncludeTitle: 'Я могу разместить на нём:',
      canIncludeList: [
        'услуги и цены;',
        'портфолио или каталог;',
        'информацию о вас или компании;',
        'ответы на частые вопросы;',
        'условия работы;',
        'форму заявки или кнопку записи;',
        'дополнительные функции для работы с данными.',
      ],
      directComm: 'Вы общаетесь непосредственно со мной – без менеджеров, долгих согласований и передачи задачи между разными исполнителями.',
      whoIsItForTitle: 'Кому подойдёт сотрудничество',
      whoIsItForList: [
        'репетиторам, преподавателям и консультантам;',
        'фотографам, дизайнерам и другим специалистам;',
        'тату-, бьюти- и частным мастерам;',
        'небольшим студиям и мастерским;',
        'малому бизнесу и некоммерческим организациям;',
        'владельцам устаревших или неудобных сайтов.',
      ],
      whoIsNotForTitle: 'Кому, скорее всего, не подойдёт',
      whoIsNotForList: [
        'крупным компаниям со сложными тендерами и многоэтапными согласованиями;',
        'проектам, которым требуется полноценное маркетинговое исследование;',
        'тем, кто ищет шаблонный сайт на конструкторе за один вечер;',
        'сложным интернет-магазинам и корпоративным системам с десятками интеграций.',
      ],
    },
    solutions: {
      title: 'Одна ссылка вместо повторяющихся объяснений',
      intro1: 'Социальные сети хорошо подходят для общения и публикации контента. Но клиенту не всегда удобно искать среди постов стоимость, условия, примеры работ и способ записаться.',
      intro2: 'Отдельный сайт помогает собрать главное в одном месте и сделать знакомство с вашей услугой более понятным.',
      items: [
        {
          title: 'Не нужно каждый раз отправлять прайс',
          description: 'Клиент сможет самостоятельно посмотреть услуги, форматы и актуальные цены.',
        },
        {
          title: 'Меньше одинаковых вопросов',
          description: 'На сайте можно заранее ответить, как проходит работа, что входит в стоимость, что нужно подготовить и какие действуют условия.',
        },
        {
          title: 'Работы собраны в одном месте',
          description: 'Портфолио не потеряется среди личных публикаций, историй и старых постов.',
        },
        {
          title: 'Понятный следующий шаг',
          description: 'После знакомства с услугами клиент сможет написать вам, заполнить форму или перейти к записи.',
        },
        {
          title: 'Более оформленная подача бизнеса',
          description: 'Отдельный сайт с собственным адресом помогает показать, что ваша работа – это организованная услуга, а не случайные заказы через личные сообщения.',
        },
        {
          title: 'Вы не зависите только от социальной сети',
          description: 'Сайт становится самостоятельной страницей бизнеса, ссылку на которую можно использовать в профиле, рекламе, сообщениях, визитках и других материалах.',
        },
      ],
    },
    advantages: {
      title: 'Всё необходимое для удобного запуска',
      items: [
        {
          title: 'Удобно клиенту',
          description: 'Услуги, цены, работы, условия и контакты находятся в одном месте.',
        },
        {
          title: 'Хорошо выглядит на смартфоне',
          description: 'Сайт адаптируется под телефон, планшет и компьютер.',
        },
        {
          title: 'Напрямую с разработчиком',
          description: 'Вы обсуждаете задачу с человеком, который непосредственно создаёт сайт.',
        },
        {
          title: 'Быстрый запуск',
          description: 'Большинство небольших сайтов можно подготовить за 5–12 рабочих дней после получения материалов.',
        },
        {
          title: 'Фиксированная стоимость',
          description: 'Состав работ и цена согласовываются до начала разработки.',
        },
        {
          title: 'Поддержка после запуска',
          description: 'После публикации сайта я остаюсь на связи и помогаю с обнаруженными техническими вопросами.',
        },
      ],
    },
    tools: {
      title: 'Современные инструменты без лишней технической сложности',
      intro: 'Я использую технологии, которые позволяют создавать быстрые, адаптивные и удобные сайты. Вам необязательно разбираться в программировании – я объясню всё простыми словами.',
      items: [
        {
          name: 'React',
          description: 'Отвечает за быстрый и интерактивный интерфейс сайта.',
        },
        {
          name: 'TypeScript',
          description: 'Помогает поддерживать код аккуратным и уменьшает вероятность технических ошибок.',
        },
        {
          name: 'Tailwind CSS',
          description: 'Позволяет создавать индивидуальный дизайн и точно адаптировать его под разные экраны.',
        },
        {
          name: 'Node.js',
          description: 'Используется, когда сайту нужны формы, серверная логика или дополнительные функции.',
        },
        {
          name: 'PostgreSQL',
          description: 'Подходит для хранения заявок, товаров, пользователей и другой информации.',
        },
        {
          name: 'Cloudflare и Vercel',
          description: 'Используются для защищённой публикации сайта, подключения домена и быстрой загрузки.',
        },
      ],
      signature: 'Вы получите исходный код, доступы и работающий сайт на своём домене.',
    },
    process: {
      title: 'От первой переписки до готового сайта',
      steps: [
        {
          number: '01',
          title: 'Знакомство',
          description: 'Вы рассказываете о своей работе, будущем сайте и функциях, которые вам нужны.',
        },
        {
          number: '02',
          title: 'Материалы',
          description: 'Вы присылаете тексты, фотографии, цены, примеры работ и другую имеющуюся информацию.',
        },
        {
          number: '03',
          title: 'Структура и стоимость',
          description: 'Я предлагаю состав страниц и блоков, после чего мы фиксируем объём работы, срок и цену.',
        },
        {
          number: '04',
          title: 'Разработка',
          description: 'Я собираю дизайн, мобильную версию и необходимые функции сайта.',
        },
        {
          number: '05',
          title: 'Демонстрация',
          description: 'Вы получаете тестовую ссылку и можете посмотреть сайт до его публикации.',
        },
        {
          number: '06',
          title: 'Правки',
          description: 'Я вношу изменения в рамках выбранного тарифа и согласованного состава работ.',
        },
        {
          number: '07',
          title: 'Запуск',
          description: 'Подключаю домен, проверяю сайт и передаю вам исходный код и доступы.',
        },
      ],
    },
    reviews: {
      preTitle: 'Опыт сотрудничества',
      title: 'Что говорят клиенты после запуска',
      placeholder: 'Здесь будут опубликованы отзывы людей и организаций, для которых я уже разрабатывал сайты.',
      note: 'Примечание: раздел публикуется после добавления настоящих отзывов. До этого его лучше полностью скрыть.',
    },
    projects: {
      preTitle: 'Примеры работы',
      title: 'Сайты, которые я уже разработал',
      description: 'В портфолио есть коммерческие проекты, переработка существующего сайта и демонстрационные концепции. Для каждого проекта честно указано, в каком формате он создавался.',
      btnViewProject: 'Посмотреть проект',
      btnViewScreens: 'Посмотреть экраны проекта',
      btnViewConcept: 'Посмотреть концепцию',
      modalClose: 'Закрыть',
      items: [
        {
          id: 'specialist-portfolio',
          title: 'Сайт-портфолио для специалиста',
          tag: 'Реальный коммерческий проект',
          description: 'Персональный сайт, который собрал в одном месте информацию о специалисте, опыт, услуги, проекты и способы связи.',
          p2: 'До появления сайта основная информация находилась на разных площадках. Теперь потенциальному клиенту можно отправить одну ссылку с понятной презентацией работ и компетенций.',
          p3: 'Сайт уже помог получить новые клиентские обращения и стал полноценным инструментом личной презентации.',
          whatDoneTitle: 'Что сделано:',
          whatDoneList: [
            'индивидуальный дизайн;',
            'портфолио проектов;',
            'информация об услугах;',
            'адаптация под смартфоны;',
            'форма или кнопка связи;',
            'публикация на собственном домене.',
          ],
          btnText: 'Посмотреть проект',
          image: '/src/assets/images/project_specialist_portfolio_1790937045952.jpg',
        },
        {
          id: 'nonprofit-redesign',
          title: 'Новый сайт для некоммерческой организации',
          tag: 'Редизайн существующего сайта',
          description: 'У организации уже был сайт, но его внешний вид и структура устарели, а посетителям было сложно находить нужную информацию.',
          p2: 'На основе существующих материалов я разработал более современную и удобную версию: переработал подачу информации, навигацию и внешний вид, сохранив важное содержание организации.',
          whatDoneTitle: 'Что сделано:',
          whatDoneList: [
            'переработана структура страниц;',
            'обновлён внешний вид;',
            'улучшена навигация;',
            'добавлена мобильная версия;',
            'информация представлена в более понятном формате;',
            'сайт подготовлен к дальнейшему развитию.',
          ],
          btnText: 'Посмотреть проект',
          image: '/src/assets/images/project_nonprofit_redesign_1790937057546.jpg',
        },
        {
          id: 'wine-coop',
          title: 'Сайт винного кооператива',
          tag: 'Функциональный проект · в настоящее время не размещён публично',
          description: 'Сайт с каталогом и внутренней системой управления информацией. Проект показывает мои возможности не только во внешнем оформлении, но и в разработке более сложной логики.',
          p2: 'Публичная версия проекта сейчас недоступна, поэтому в портфолио представлены основные экраны и описание реализованных функций.',
          whatDoneTitle: 'Что реализовано:',
          whatDoneList: [
            'каталог продукции;',
            'база данных;',
            'административная панель;',
            'добавление и редактирование информации;',
            'отдельные страницы продукции;',
            'адаптивный интерфейс;',
            'серверная часть сайта.',
          ],
          btnText: 'Посмотреть экраны проекта',
          image: '/src/assets/images/project_wine_cooperative_1790937069022.jpg',
        },
        {
          id: 'driving-center',
          title: 'Сайт центра контраварийного вождения',
          tag: 'Демонстрационная концепция',
          description: 'Учебный проект, созданный для демонстрации дизайна и структуры сайта организации, которая проводит курсы безопасного и контраварийного вождения.',
          p2: 'Это не сайт действующей организации и не коммерческий кейс. Проект показывает, как может выглядеть сайт образовательного или сервисного бизнеса.',
          whatDoneTitle: 'Что показано в проекте:',
          whatDoneList: [
            'программы обучения;',
            'описание курсов;',
            'преимущества центра;',
            'стоимость;',
            'форма записи;',
            'адаптация под мобильные устройства.',
          ],
          btnText: 'Посмотреть концепцию',
          image: '/src/assets/images/project_driving_center_1790937080215.jpg',
        },
      ],
    },
    pricing: {
      preTitle: 'Стартовые цены',
      title: 'Выберите подходящий формат сайта',
      intro: 'Сейчас я расширяю портфолио, поэтому предлагаю разработку по специальной стоимости для ближайших трёх проектов.',
      strikethroughNote: 'Зачёркнутая цена – моя планируемая базовая стоимость после завершения этапа формирования портфолио.',
      durationPrefix: 'Срок:',
      includedTitle: 'Входит:',
      plans: [
        {
          id: 'start',
          name: 'СТАРТ',
          subtitle: 'Сайт-визитка',
          audience: 'Для специалиста, которому нужна аккуратная страница с основной информацией.',
          oldPrice: '55 000 ₽',
          currentPrice: '39 000 ₽',
          currentPriceSub: 'Стартовая стоимость для портфолио',
          duration: '5–7 рабочих дней',
          features: [
            'одна страница;',
            'до 5–6 смысловых блоков;',
            'информация о специалисте или компании;',
            'услуги и контакты;',
            'фотографии или небольшое портфолио;',
            'кнопка связи;',
            'мобильная версия;',
            'подключение домена и SSL;',
            'одна итерация правок;',
            '14 дней технической поддержки.',
          ],
          disclaimer: 'Тексты, фотографии и структура предоставляются клиентом.',
          btnText: 'Выбрать «Старт»',
        },
        {
          id: 'optimal',
          name: 'ОПТИМАЛЬНЫЙ',
          popular: true,
          popularBadge: 'Лучшее соотношение цены и возможностей',
          subtitle: 'Сайт для эксперта или малого бизнеса',
          audience: 'Для тех, кому нужно подробно представить услуги, цены, работы и условия, а также сделать обращение клиента более удобным.',
          oldPrice: '95 000 ₽',
          currentPrice: '69 000 ₽',
          currentPriceSub: 'Стартовая стоимость для портфолио',
          duration: '8–12 рабочих дней',
          features: [
            'индивидуальная визуальная концепция;',
            'одна большая страница или до 3 небольших страниц;',
            'до 10–12 смысловых блоков;',
            'услуги и цены;',
            'портфолио или примеры работ;',
            'этапы сотрудничества;',
            'блок частых вопросов;',
            'форма заявки или запись через Telegram/соц-сети;',
            'помощь в организации предоставленных материалов;',
            'базовая техническая SEO-настройка;',
            'подключение аналитики;',
            'мобильная версия;',
            'две итерации правок;',
            '30 дней технической поддержки.',
          ],
          disclaimer: 'Подходит большинству экспертов и небольших компаний.',
          btnText: 'Выбрать «Оптимальный»',
        },
        {
          id: 'business',
          name: 'БИЗНЕС',
          subtitle: 'Сайт с базой данных и админ-панелью',
          audience: 'Для проектов, которым недостаточно информационной страницы и нужны дополнительные функции для работы с контентом или заявками.',
          oldPrice: '150 000 ₽',
          currentPrice: '99 000 ₽',
          currentPriceSub: 'Стартовая стоимость для портфолио',
          duration: 'от 15 рабочих дней',
          features: [
            'до 5 основных страниц;',
            'индивидуальный дизайн;',
            'каталог услуг, товаров или других объектов;',
            'база данных;',
            'базовая административная панель;',
            'добавление и редактирование информации;',
            'сохранение заявок;',
            'уведомления о новых обращениях;',
            'формы и интерактивные элементы;',
            'базовая техническая SEO-настройка;',
            'подключение аналитики;',
            'мобильная версия;',
            'три итерации правок;',
            '60 дней технической поддержки.',
          ],
          disclaimer: 'Точный состав базы данных и административной панели определяется до начала разработки. Сложные роли пользователей, личные кабинеты, оплаты и нестандартные интеграции рассчитываются отдельно.',
          btnText: 'Обсудить бизнес-сайт',
        },
      ],
      extraService: {
        preTitle: 'ДОПОЛНИТЕЛЬНАЯ УСЛУГА',
        title: 'Переделка существующего сайта',
        description: 'Если сайт выглядит устаревшим, неудобен на смартфоне или больше не соответствует вашему бизнесу, я могу разработать на основе существующих материалов новую версию.',
        whatCanImproveTitle: 'Что можно улучшить:',
        whatCanImproveList: [
          'внешний вид;',
          'структуру страниц;',
          'мобильную версию;',
          'навигацию;',
          'скорость загрузки;',
          'представление услуг и цен;',
          'формы и способы связи;',
          'техническую основу сайта.',
        ],
        price: 'от 49 000 ₽',
        priceNote: 'Цена зависит от количества страниц, состояния существующего сайта и необходимости переноса материалов.',
        btnText: 'Показать существующий сайт',
      },
      addOns: {
        title: 'Функции, которые можно добавить к проекту',
        items: [
          {
            title: 'Административная панель',
            description: 'Самостоятельно меняйте тексты, фотографии, цены или позиции каталога.',
          },
          {
            title: 'База данных',
            description: 'Храните заявки, товары и другую необходимую информацию.',
          },
          {
            title: 'Уведомления в Telegram / соц.сеть / на почту',
            description: 'Получайте сообщение, когда посетитель заполняет форму на сайте.',
          },
          {
            title: 'Онлайн-оплата',
            description: 'Подключение платёжной системы рассчитывается отдельно.',
          },
          {
            title: 'Дополнительные страницы',
            description: 'Блог, подробные страницы услуг, каталог, команда, документы и другие разделы.',
          },
          {
            title: 'Дополнительная поддержка',
            description: 'Помощь с сайтом после завершения включённого периода поддержки.',
          },
        ],
      },
    },
    whyCheaper: {
      preTitle: 'Честно о стоимости',
      title: 'Почему сейчас дешевле обычной цены',
      intro1: 'Я нахожусь на этапе расширения коммерческого портфолио. У меня уже есть технические навыки и готовые проекты, но пока меньше публичных кейсов и отзывов, чем у разработчиков с многолетним опытом.',
      intro2: 'Поэтому ближайшие проекты я беру по сниженной стоимости.',
      reasons: [
        {
          title: 'Мне нужны сильные проекты для портфолио',
          description: 'Каждый новый сайт помогает показать будущим клиентам, что я умею решать реальные задачи.',
        },
        {
          title: 'Мне важны честные отзывы',
          description: 'После запуска я попрошу поделиться впечатлением о сотрудничестве и результате. Публикация отзыва происходит только с вашего согласия.',
        },
        {
          title: 'Вы работаете напрямую со мной',
          description: 'В стоимости нет работы менеджера, продавца, секретаря и других сотрудников агентства.',
        },
        {
          title: 'Я использую собственные наработки',
          description: 'Готовые технические модули помогают быстрее собирать формы, каталоги, административные панели и другие типовые функции.',
        },
      ],
      finalText: 'Вы получаете полноценный работающий сайт по стартовой стоимости. Я получаю новый опыт, сильный проект в портфолио и возможность подтвердить качество своей работы.',
    },
    contact: {
      title: 'Расскажите, какой сайт вам нужен',
      description1: 'Для предварительной оценки пришлите ссылку на ваши социальные сети или существующий сайт и коротко опишите задачу.',
      description2: 'Я посмотрю материалы, задам несколько вопросов и предложу подходящий формат работы.',
      btnTelegram: 'Написать Илье',
      btnSubmitProject: 'Отправить описание проекта',
      disclaimer: 'Предварительное обсуждение бесплатно и ни к чему вас не обязывает.',
      form: {
        nameLabel: 'Ваше имя',
        namePlaceholder: 'Иван Иванов',
        contactLabel: 'Telegram, телефон или Email',
        contactPlaceholder: '@username или +7 (999) 000-00-00',
        tariffLabel: 'Интересующий тариф / задача',
        tariffPlaceholder: 'Выберите тариф или формат',
        projectUrlLabel: 'Ссылка на текущий сайт или соцсети (необязательно)',
        projectUrlPlaceholder: 'https://instagram.com/... или https://mysite.ru',
        messageLabel: 'Коротко опишите задачу',
        messagePlaceholder: 'Чем занимается ваш бизнес, какие задачи должен решать сайт...',
        submitBtn: 'Отправить заявку',
        submittingBtn: 'Отправка...',
        successTitle: 'Заявка успешно отправлена!',
        successMessage: 'Спасибо за обращение. Я свяжусь с вами в ближайшее время для обсуждения деталей.',
        errorMessage: 'Произошла ошибка при отправке. Пожалуйста, напишите мне напрямую в Telegram.',
        sendAnother: 'Отправить ещё одну заявку',
      },
    },
    footer: {
      name: 'Илья Арьков',
      tagline: 'Современные сайты для экспертов, небольшого бизнеса и организаций. Напрямую с разработчиком.',
      telegram: 'Telegram',
      email: 'arkovilia7@gmail.com',
      privacy: 'Политика конфиденциальности',
      copyright: '© 2026 Илья Арьков',
      cmsButton: 'Управление заявками (CMS)',
    },
    privacyModal: {
      title: 'Политика конфиденциальности',
      close: 'Закрыть',
      p1: 'Настоящая политика конфиденциальности действует в отношении всей информации, которую сайт Ильи Арькова может получить о пользователе во время использования сайта.',
      p2: '1. Предоставляемые вами контактные данные (имя, контакты, ссылки и описание проекта) используются исключительно для связи с вами и обсуждения условий разработки сайта.',
      p3: '2. Ваши персональные данные никогда не передаются третьим лицам и хранятся в защищенной среде.',
      p4: '3. Вы можете в любой момент запросить удаление ваших контактных данных, написав на arkovilia7@gmail.com или в Telegram.',
    },
    cms: {
      title: 'Панель управления заявками и CMS',
      leadsCount: 'Всего заявок',
      noLeads: 'Заявок пока нет. Новые заявки с формы сразу появятся здесь.',
      status: {
        new: 'Новая',
        in_progress: 'В работе',
        completed: 'Завершена',
        archived: 'Архив',
      },
      telegramSettingsTitle: 'Настройки Telegram бота (резервные)',
      telegramTokenLabel: 'Telegram Bot Token',
      telegramChatIdLabel: 'Telegram Chat ID',
      saveSettings: 'Сохранить настройки',
      savedToast: 'Настройки сохранены',
      testSend: 'Отправить тестовое уведомление',
      exportCsv: 'Экспорт в CSV',
      clearLeads: 'Очистить историю',
      close: 'Закрыть панель',
    },
  },
  en: {
    header: {
      name: 'Ilia Arkov',
      nav: {
        about: 'About',
        solutions: 'Why a Website',
        process: 'How I Work',
        projects: 'Projects',
        pricing: 'Pricing',
        whyCheaper: 'Why Lower Cost',
      },
      cta: 'Discuss Project',
    },
    hero: {
      badge: 'Starter price for the next 3 projects',
      title: 'A website that explains your services for you',
      description: 'I will bring together your services, prices, work examples, FAQ answers, and a convenient booking or inquiry form in one place.',
      subDescription1: 'Instead of sending your price list each time and repeating the same information, you can simply share one link with your client.',
      subDescription2: 'Modern web development, responsive mobile design, and direct communication with the developer – without agency markups.',
      priceTag: 'From $420 (39,000 ₽) · Delivery from 5 business days',
      ctaPrimary: 'Discuss My Website',
      ctaSecondary: 'View Projects',
      metrics: {
        days: 'from 5 days',
        daysLabel: 'Delivery time',
        price: 'from $420',
        priceLabel: 'Fixed pricing',
        direct: '1-on-1',
        directLabel: 'No intermediaries',
      },
    },
    about: {
      title: 'Crafting modern websites for experts and small businesses',
      p1: 'My name is Ilia Arkov. I am a web developer with a specialized university degree in computer science. I build websites for professionals, small companies, non-profit organizations, and projects that need a clear, impactful online presence.',
      p2: 'My job is to carefully structure the information you provide and turn it into a modern, fast, and user-friendly website.',
      canIncludeTitle: 'What I can feature on your site:',
      canIncludeList: [
        'services and pricing tables;',
        'portfolio or catalog;',
        'about you or company story;',
        'frequently asked questions (FAQ);',
        'terms and working process;',
        'lead inquiry form or booking button;',
        'custom database features and data tools.',
      ],
      directComm: 'You communicate directly with me – without account managers, long approvals, or tasks getting lost between different subcontractors.',
      whoIsItForTitle: 'Who this collaboration is for',
      whoIsItForList: [
        'tutors, teachers, and business consultants;',
        'photographers, designers, and creative specialists;',
        'tattoo, beauty, and independent masters;',
        'boutique studios and craft workshops;',
        'small businesses and non-profit organizations;',
        'owners of outdated or clunky websites.',
      ],
      whoIsNotForTitle: 'Who this is probably not suitable for',
      whoIsNotForList: [
        'large corporations with bureaucratic multi-stage tenders;',
        'projects requiring full-scale nationwide market research;',
        'those looking for a generic template website built in one evening;',
        'massive enterprise e-commerce platforms with dozens of ERP integrations.',
      ],
    },
    solutions: {
      title: 'One link instead of repetitive explanations',
      intro1: 'Social networks are great for social updates and posting content. But it is not always convenient for a prospective client to dig through posts to find pricing, terms, portfolio samples, and booking methods.',
      intro2: 'A standalone website brings all the essentials into one unified place, making your service offer crystal clear.',
      items: [
        {
          title: 'No need to send price sheets repeatedly',
          description: 'Clients can explore your service packages, scope, and current prices at their own pace.',
        },
        {
          title: 'Fewer repetitive inquiries',
          description: 'Address in advance how the collaboration works, what is included, what the client needs to prepare, and key terms.',
        },
        {
          title: 'Portfolio gathered in one curated place',
          description: 'Your case studies won’t get lost among personal posts, temporary stories, or old feeds.',
        },
        {
          title: 'Clear next step for the client',
          description: 'After reviewing your services, the client can immediately message you, fill out an inquiry form, or book a consultation.',
        },
        {
          title: 'Professional business presentation',
          description: 'A dedicated site with a custom domain signals that your work is an organized professional service, not random side-gigs in DMs.',
        },
        {
          title: 'Independence from social media platforms',
          description: 'Your website is an owned asset. Use your link across bio profiles, ad campaigns, email signatures, messages, and business cards.',
        },
      ],
    },
    advantages: {
      title: 'Everything you need for a smooth launch',
      items: [
        {
          title: 'Convenient for clients',
          description: 'Services, rates, showcase, terms, and contacts are all in one coherent destination.',
        },
        {
          title: 'Looks exceptional on mobile',
          description: 'Your website adapts seamlessly across smartphones, tablets, and wide desktop displays.',
        },
        {
          title: 'Directly with the developer',
          description: 'You speak with the engineer who is personally architecting and designing your website.',
        },
        {
          title: 'Fast turnaround',
          description: 'Most small websites are ready in 5–12 business days once materials are supplied.',
        },
        {
          title: 'Fixed pricing',
          description: 'The scope of work and total price are locked in before development begins.',
        },
        {
          title: 'Post-launch support',
          description: 'After release, I remain available to answer questions and assist with any technical aspects.',
        },
      ],
    },
    tools: {
      title: 'Modern tech stack without unnecessary complexity',
      intro: 'I utilize proven technologies that yield ultra-fast, responsive, and reliable websites. You do not need to understand code – I explain everything in simple, clear terms.',
      items: [
        {
          name: 'React',
          description: 'Powers the snappy, interactive, and seamless user interface.',
        },
        {
          name: 'TypeScript',
          description: 'Ensures bulletproof code quality and eliminates runtime errors.',
        },
        {
          name: 'Tailwind CSS',
          description: 'Enables tailored bespoke styling optimized for any viewport.',
        },
        {
          name: 'Node.js',
          description: 'Handles server endpoints, secure lead routing, and custom logic.',
        },
        {
          name: 'PostgreSQL',
          description: 'Secure database storage for customer leads, catalogs, and records.',
        },
        {
          name: 'Cloudflare & Vercel',
          description: 'Ensures lightning-fast global CDN delivery, automated SSL, and 99.9% uptime.',
        },
      ],
      signature: 'You receive full source code ownership, credentials, and a working site on your own domain.',
    },
    process: {
      title: 'From initial message to a launched website',
      steps: [
        {
          number: '01',
          title: 'Introduction',
          description: 'You share details about your business, desired website goals, and needed features.',
        },
        {
          number: '02',
          title: 'Content & Materials',
          description: 'You send texts, photos, pricing, work samples, and any initial branding assets.',
        },
        {
          number: '03',
          title: 'Structure & Cost',
          description: 'I outline page architecture and sections, and we lock in the scope, delivery timeline, and price.',
        },
        {
          number: '04',
          title: 'Development',
          description: 'I build the visual design, responsive mobile version, and all interactive features.',
        },
        {
          number: '05',
          title: 'Preview & Demo',
          description: 'You receive a private staging link to inspect and test the site before going live.',
        },
        {
          number: '06',
          title: 'Revisions',
          description: 'I polish and apply revisions within the agreed scope and selected package.',
        },
        {
          number: '07',
          title: 'Launch',
          description: 'I connect your domain, run final security checks, and hand over source code & access keys.',
        },
      ],
    },
    reviews: {
      preTitle: 'Client Experience',
      title: 'What clients say after launch',
      placeholder: 'Testimonials from individuals and organizations I have collaborated with will be published here.',
      note: 'Note: this section is revealed once authentic client feedback is published.',
    },
    projects: {
      preTitle: 'Work Examples',
      title: 'Websites I have developed',
      description: 'The portfolio includes commercial client projects, an existing website redesign, and interactive concept prototypes. The exact development context is transparently noted for each case.',
      btnViewProject: 'View Project',
      btnViewScreens: 'View Project Screens',
      btnViewConcept: 'View Concept',
      modalClose: 'Close',
      items: [
        {
          id: 'specialist-portfolio',
          title: 'Specialist Portfolio Website',
          tag: 'Real Commercial Project',
          description: 'A personal brand website that brought together specialist information, experience, services, case studies, and contact options in one place.',
          p2: 'Before this website, details were fragmented across different social accounts. Now prospective clients can be sent a single link with a refined overview of skills and work.',
          p3: 'The site has already generated new inbound inquiries and serves as an indispensable self-presentation asset.',
          whatDoneTitle: 'Delivered:',
          whatDoneList: [
            'bespoke visual design;',
            'interactive project portfolio;',
            'service details & scope breakdown;',
            'fluid mobile responsiveness;',
            'direct contact form & messaging links;',
            'deployment on custom domain.',
          ],
          btnText: 'View Project',
          image: '/src/assets/images/project_specialist_portfolio_1790937045952.jpg',
        },
        {
          id: 'nonprofit-redesign',
          title: 'Redesign for Non-Profit Organization',
          tag: 'Website Redesign Case',
          description: 'The organization already had a website, but its layout and visual hierarchy were outdated, making it hard for visitors to discover relevant programs and help.',
          p2: 'Using existing materials, I engineered a fresh, accessible version: revised content structure, streamlined navigation, and elevated aesthetics while protecting crucial institutional copy.',
          whatDoneTitle: 'Delivered:',
          whatDoneList: [
            'restructured page flow & sitemap;',
            'refreshed visual styling;',
            'simplified intuitive navigation;',
            'added robust mobile version;',
            'formatted information for instant clarity;',
            'prepared system for future growth.',
          ],
          btnText: 'View Project',
          image: '/src/assets/images/project_nonprofit_redesign_1790937057546.jpg',
        },
        {
          id: 'wine-coop',
          title: 'Wine Cooperative Web Platform',
          tag: 'Functional Project · Currently Private',
          description: 'A full-stack catalog website with an internal management dashboard. This project showcases capability in both refined aesthetics and complex data logic.',
          p2: 'The live public release is currently kept in private preview, so the portfolio features core interface mockups and technical scope breakdown.',
          whatDoneTitle: 'Implemented:',
          whatDoneList: [
            'product catalog filtering;',
            'database integration;',
            'administrative control panel;',
            'item creation and editing;',
            'dedicated product showcase pages;',
            'adaptive mobile layout;',
            'backend server architecture.',
          ],
          btnText: 'View Project Screens',
          image: '/src/assets/images/project_wine_cooperative_1790937069022.jpg',
        },
        {
          id: 'driving-center',
          title: 'Defensive Driving Center Platform',
          tag: 'Demonstration Concept',
          description: 'A pilot concept project created to demonstrate structure, typography, and styling for a modern driver safety and emergency handling academy.',
          p2: 'This represents a demonstration prototype rather than an active operating company. It illustrates how an educational or high-performance service business can be presented online.',
          whatDoneTitle: 'Featured in concept:',
          whatDoneList: [
            'training syllabus & track courses;',
            'course curriculum details;',
            'academy advantages & safety ratings;',
            'transparent pricing tier table;',
            'interactive booking registration;',
            'mobile optimization.',
          ],
          btnText: 'View Concept',
          image: '/src/assets/images/project_driving_center_1790937080215.jpg',
        },
      ],
    },
    pricing: {
      preTitle: 'Starter Rates',
      title: 'Choose the Right Website Format',
      intro: 'I am currently expanding my commercial portfolio, offering special starter rates for the next 3 projects.',
      strikethroughNote: 'The strikethrough price indicates my planned baseline rate once the portfolio expansion phase concludes.',
      durationPrefix: 'Timeline:',
      includedTitle: 'Included:',
      plans: [
        {
          id: 'start',
          name: 'START',
          subtitle: 'Landing / Card Website',
          audience: 'For specialists who need an elegant, clean single-page site with essential details.',
          oldPrice: '55 000 ₽ ($590)',
          currentPrice: '39 000 ₽ ($420)',
          currentPriceSub: 'Starter portfolio rate',
          duration: '5–7 business days',
          features: [
            'one focused page;',
            'up to 5–6 content sections;',
            'about you or company info;',
            'services and contact info;',
            'photos or compact portfolio;',
            'direct contact button;',
            'responsive mobile version;',
            'domain & SSL configuration;',
            'one round of revisions;',
            '14 days of technical support.',
          ],
          disclaimer: 'Texts, images, and content are provided by the client.',
          btnText: 'Select "Start"',
        },
        {
          id: 'optimal',
          name: 'OPTIMAL',
          popular: true,
          popularBadge: 'Best Value & Features',
          subtitle: 'Website for Expert or Small Business',
          audience: 'For businesses needing a detailed showcase of services, pricing, proof, and a streamlined inquiry flow.',
          oldPrice: '95 000 ₽ ($1,020)',
          currentPrice: '69 000 ₽ ($740)',
          currentPriceSub: 'Starter portfolio rate',
          duration: '8–12 business days',
          features: [
            'bespoke visual aesthetic concept;',
            'one comprehensive page or up to 3 sub-pages;',
            'up to 10–12 structured sections;',
            'services & pricing tiers;',
            'portfolio showcase with case studies;',
            'collaboration process steps;',
            'interactive FAQ accordion;',
            'lead form or Telegram / Email / SM inquiry buttons;',
            'assistance structuring provided content;',
            'foundational technical SEO setup;',
            'analytics integration (Google/Yandex);',
            'responsive mobile design;',
            'two rounds of revisions;',
            '30 days of technical support.',
          ],
          disclaimer: 'Recommended for most independent consultants and boutique companies.',
          btnText: 'Select "Optimal"',
        },
        {
          id: 'business',
          name: 'BUSINESS',
          subtitle: 'Website with Database & CMS Admin',
          audience: 'For ambitious projects requiring dynamic content management, databases, or high-volume lead pipelines.',
          oldPrice: '150 000 ₽ ($1,600)',
          currentPrice: '99 000 ₽ ($1,060)',
          currentPriceSub: 'Starter portfolio rate',
          duration: 'from 15 business days',
          features: [
            'up to 5 core pages;',
            'custom bespoke design;',
            'service or product catalog;',
            'database integration;',
            'administrative content panel (CMS);',
            'add & edit content easily;',
            'lead storage & dispatch;',
            'instant Telegram / Email / SM lead notifications;',
            'interactive forms & custom UI logic;',
            'advanced technical SEO setup;',
            'analytics & goal tracking setup;',
            'fully responsive mobile interface;',
            'three rounds of revisions;',
            '60 days of extended technical support.',
          ],
          disclaimer: 'Exact database schema and admin capabilities are determined prior to development. Custom user auth, payment gateways, and third-party API syncs quoted individually.',
          btnText: 'Discuss Business Site',
        },
      ],
      extraService: {
        preTitle: 'ADDITIONAL SERVICE',
        title: 'Redesign of Existing Website',
        description: 'If your current site feels dated, performs poorly on phones, or no longer reflects your positioning, I can craft an upgraded version using your current assets.',
        whatCanImproveTitle: 'What we can upgrade:',
        whatCanImproveList: [
          'visual aesthetics & typography;',
          'page structure & information hierarchy;',
          'mobile viewport experience;',
          'navigation UX;',
          'loading speed & performance;',
          'presentation of services and pricing;',
          'lead forms and contact options;',
          'underlying modern code base.',
        ],
        price: 'from 49 000 ₽ ($525)',
        priceNote: 'Pricing depends on page count, current site condition, and content migration scope.',
        btnText: 'Show Existing Website',
      },
      addOns: {
        title: 'Capabilities you can add to your project',
        items: [
          {
            title: 'Admin Management Panel',
            description: 'Update text, imagery, rates, or catalog items yourself without touching code.',
          },
          {
            title: 'Database Storage',
            description: 'Securely store inbound leads, products, or member records in PostgreSQL.',
          },
          {
            title: 'Telegram Bot Alerts',
            description: 'Receive an instant notification the second a prospect submits an inquiry.',
          },
          {
            title: 'Online Payments',
            description: 'Payment gateway integration (Stripe, CloudPayments, Tinkoff, etc.) calculated on request.',
          },
          {
            title: 'Additional Pages',
            description: 'Blog, deep service breakdowns, catalog pages, team profiles, and legal documents.',
          },
          {
            title: 'Extended Maintenance',
            description: 'Ongoing technical care and updates beyond the included warranty period.',
          },
        ],
      },
    },
    whyCheaper: {
      preTitle: 'Honest About Pricing',
      title: 'Why rates are currently lower than average',
      intro1: 'I am actively expanding my commercial portfolio. While I possess solid computer science foundations and completed projects, I have fewer public client reviews than developers with 10+ years in the industry.',
      intro2: 'That is why I am offering these first upcoming client projects at an accessible entry rate.',
      reasons: [
        {
          title: 'I need standout showcase cases',
          description: 'Every newly launched website proves to future clients that I solve real business objectives.',
        },
        {
          title: 'Genuine client testimonials matter to me',
          description: 'After launch, I will invite you to share your experience and feedback. Testimonials are published only with your consent.',
        },
        {
          title: 'You work directly with me',
          description: 'No overhead costs for account executives, sales reps, coordinators, or agency office leases.',
        },
        {
          title: 'I leverage proprietary starter modules',
          description: 'Proven code foundations allow me to assemble forms, catalogs, and admin utilities rapidly without bugs.',
        },
      ],
      finalText: 'You receive a fully engineered, high-performance website at a starter price. I gain valuable collaboration experience, a strong portfolio case, and the opportunity to prove my quality.',
    },
    contact: {
      title: 'Tell me what website you need',
      description1: 'For an initial assessment, send a link to your current social media or existing site and briefly describe your vision.',
      description2: 'I will review your materials, ask a few clarifying questions, and recommend the best collaboration approach.',
      btnTelegram: 'Message Ilia',
      btnSubmitProject: 'Submit Project Details',
      disclaimer: 'The preliminary consultation is free and carries no obligation.',
      form: {
        nameLabel: 'Your name',
        namePlaceholder: 'Alex Smith',
        contactLabel: 'Telegram handle, phone, or email',
        contactPlaceholder: '@username or alex@example.com',
        tariffLabel: 'Preferred package / task',
        tariffPlaceholder: 'Select a plan or describe goal',
        projectUrlLabel: 'Link to current site or social media (optional)',
        projectUrlPlaceholder: 'https://instagram.com/... or https://mysite.com',
        messageLabel: 'Briefly describe your project',
        messagePlaceholder: 'Tell me about your business, who your clients are, and what the website should achieve...',
        submitBtn: 'Send Inquiry',
        submittingBtn: 'Sending...',
        successTitle: 'Inquiry Sent Successfully!',
        successMessage: 'Thank you for reaching out. I will review your project and get back to you shortly.',
        errorMessage: 'An error occurred during sending. Please message me directly on Telegram.',
        sendAnother: 'Send another message',
      },
    },
    footer: {
      name: 'Ilia Arkov',
      tagline: 'Modern websites for experts, small businesses, and organizations. Direct collaboration with the developer.',
      telegram: 'Telegram',
      email: 'arkovilia7@gmail.com',
      privacy: 'Privacy Policy',
      copyright: '© 2026 Ilia Arkov',
      cmsButton: 'Lead Manager (CMS)',
    },
    privacyModal: {
      title: 'Privacy Policy',
      close: 'Close',
      p1: 'This privacy policy applies to all information that Ilia Arkov may obtain regarding users while visiting this website.',
      p2: '1. The contact details you provide (name, messenger handles, phone, email, project details) are strictly used to communicate with you regarding your website development inquiry.',
      p3: '2. Your personal information is never sold or transferred to third parties and is stored securely.',
      p4: '3. You can request deletion of your information at any time by contacting arkovilia7@gmail.com or via Telegram.',
    },
    cms: {
      title: 'Lead Management & CMS Dashboard',
      leadsCount: 'Total Leads',
      noLeads: 'No inquiries recorded yet. Submissions from the contact form will appear here in real-time.',
      status: {
        new: 'New',
        in_progress: 'In Progress',
        completed: 'Completed',
        archived: 'Archived',
      },
      telegramSettingsTitle: 'Telegram Bot Configuration (Client Override)',
      telegramTokenLabel: 'Telegram Bot Token',
      telegramChatIdLabel: 'Telegram Chat ID',
      saveSettings: 'Save Settings',
      savedToast: 'Settings saved to LocalStorage',
      testSend: 'Send Test Notification',
      exportCsv: 'Export to CSV',
      clearLeads: 'Clear Lead History',
      close: 'Close Dashboard',
    },
  },
};